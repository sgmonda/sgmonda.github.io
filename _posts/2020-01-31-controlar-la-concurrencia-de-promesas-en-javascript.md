---
date: 2020-03-23
title: Controlar la concurrencia de promesas en Javascript
description: ¿Conoces las limitaciones de Promise.all() y los problemas que puede traerte? Muchas veces intentamos paralelizar promesas de la forma incorrecta y podemos acabar con los recursos del sistema rápidamente.
image: https://images.unsplash.com/photo-1516996087931-5ae405802f9f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ
---

Trabajar con promesas en Javascript se ha ido popularizando desde que [EcmaScript](https://es.wikipedia.org/wiki/ECMAScript) incorporó [async](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona)-[await](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/await) para trabajar con ellas de forma mucho más sencilla a como se venía haciendo. Poco a poco se ha dejado de lado aquella necesidad de utilizar [callbacks](https://es.wikipedia.org/wiki/Callback_(inform%C3%A1tica)), lo que ha permitido mejorar mucho la limpieza y mantenibilidad de nuestro código Javascript.

Pero un cambio de paradigma siempre implica nuevos retos, y cuando se trata de paralelizar promesas existe cierta confusión respecto a cómo hacerlo de forma correcta. Es importante entender cómo funcionan las promesas y cómo las ejecuta Javascript para poder exprimirlas y aprovechar todo su potencial gracias a la concurrencia.

**Nota**: en este artículo me tomaré la licencia de habar de *paralelizar* promesas cuando realmente me refiero a *concurrencia*. [En este otro artículo](/paralelismo-vs-concurrencia) explico la diferencia entre ambos conceptos.

## Promesas

Una *promesa* (o *valor futuro*), es un reemplazo para un resultado que todavía no está disponible.

En Javascript/Typescript existen dos formas básicas de crear promesas:

- Utilizando la clase `Promise`. Ejemplo: `new Promise(...)`.
- Utilizando funciones declaradas como `async`. Estas funciones devuelven una promesa al ser invocadas.

En este artículo trabajaremos con una sencilla función que recibe un número y nos devuelve una promesa. El valor futuro de la promesa se resolverá transcurrido un tiempo aleatorio de hasta 1 segundo, y será el mismo número recibido.

```javascript
const getNumber = (num) => new Promise((resolve) => {
  const delay = Math.random() * 1000;
  const fun = () => resolve(num);
  setTimeout(() => {
    process.stdout.write(`${num}, `);
    fun();
  }, delay);
});
```

En un caso real esta función asíncrona podría realizar operaciones de entrada/salida, a un archivo o a una base de datos, por ejemplo.

## Promise.all()

Supongamos que queremos ejecutar la función anterior para los primeros 50 números naturales (empezando en 0, como nos gusta a los informáticos). Podemos preparar la lista de números así:

```javascript
const NUMBERS = Array(50).fill(1).map((_, index) => index);
```

Queremos realizar todas las invocaciones a `getNumber()` y esperar el resultado (se resuelvan las promesas), para entonces imprimir un mensaje `"Finished"`. Tenemos dos posibilidades:

- Realizar las llamadas una a una e imprimir el mensaje al terminar:

  ```javascript
  for (const num of NUMBERS) await getNumber(num);
  console.log("Finished");
  ```

- Realizar todas las llamadas a la vez y esperar a que terminen todas:

  ```javascript
  const promises = NUMBERS.map(getNumber);
  await Promise.all(promises);
  console.log("Finished");
  ```
    
  **Nota**: Es importante entender que una llamada a `Promise.all()` no invoca la ejecución de código relacionado con las promesas que recibe como parámetro, sino que simplemente crea una nueva promesa que es resuelta cuando lo hayan sido estas.

Las dos aproximaciones anteriores son una mala idea. En el primer caso el tiempo de ejecución podría llegar a ser de hasta 50 segundos, ya que hasta que no termina una tarea no llamamos a la siguiente:

![serie](https://user-images.githubusercontent.com/675812/96976034-9bf8b480-151b-11eb-967a-a5e0696af4bf.gif)

En el segundo caso, si nuestra función realizara cálculos complejos o bloqueara algún recurso, estaríamos sobrecargando el sistema, ya que lanzamos todas las tareas a la vez. Imagina lo que ocurriría on un número mucho mayor de tareas más complejas.

![parallel](https://user-images.githubusercontent.com/675812/96976043-a024d200-151b-11eb-8453-cf25cad8e9ed.gif)

Si nos fijamos en el orden de los números, cuando la ejecución es en serie lógicamente las promesas van terminando en orden, mientras que cuando utilizamos `Promise.all()` el orden de los números es impredecible. No es relevante pero sí útil para ver cómo está funcionando la ejecución.

## Paralelización limitada

¿Cuál es la manera correcta de hacerlo? Pues sencillamente una combinación de ambos enfoques: paralelizar las llamadas pero de forma limitada. De esa manera podremos aprovechar los recursos de nuestro sistema sin saturarlo.

Aquí va una propuesta, ideal para incluirla en nuestro código como un módulo reutilizable:

```javascript
async function promiseRunner (funs, concurrency) {
  let result = [];
  while (funs.length > 0) {
    const group = funs.splice(0, concurrency);
    const promises = group.map(f => f());
    const partial = await Promise.all(promises);
    result = result.concat(partial);
  }
  return result;
}
```

Y con esa función tenemos resuelto el problema. Ahora podemos elegir la concurrencia máxima que deseamos con cada llamada (por ejemplo 5), y pasarle funciones que al ejecutarse hagan la llamada asíncrona devolviendo una promesa.

```javascript
const promiseCreators = NUMBERS.map(num => () => getNumber(num));
await promiseRunner(promiseCreators, 5);
console.log("Finished");
```

Es importante destacar que a `promiseRunner()` debemos pasarle un array con llamadas a la función `getNumber()` no ejecutadas todavía, de ahí la forma `() => getNumber(num)`, para que `promiseRunner()` haga la llamada asíncrona cuando considere y así no se ejecuten las funciones asíncronas antes de tiempo.

El resultado de `promiseRunner()` es una promesa cuyo valor (una vez se resuelve) es el mismo que obtendríamos de una llamada a `Promise.all()`: un array con los resultados de cada promesa en el mismo orden de llamada.

![parallelLimit](https://user-images.githubusercontent.com/675812/96976041-9ef3a500-151b-11eb-9c7e-561674ef740f.gif)

Si nos fijamos bien, el orden es aleatorio pero por grupos de 5, nuestro nivel de concurrencia. Dentro de cada grupo de 5 el orden no es previsible, pero nunca terminará la promesa 4 (dentro del primer grupo) más tarde que la promesa 5 (dentro del segundo grupo), por ejemplo.

## Código de ejemplo

He creado [este gist](https://gist.github.com/sgmonda/ae40efcdea944b67ce36e66bd1cca526) con un script completo de ejemplo donde puedes jugar con las distintas formas de paralelizar promesas y modificar lo que necesites. Es el que he utilizado para ilustrar la salida de los distintos modos de ejecución y puede utilizarse así:

```
$ node promiseRunner.js serie
$ node promiseRunner.js parallel
$ node promiseRunner.js parallelLimit
```

