---
date: 2020-01-29
title: Paralelismo vs. Concurrencia
description: Ya sea por desconocimiento o porque decidamos tomarnos una licencia del lenguaje, en muchas ocasiones se tiende a confundir el paralelismo y la concurrencia. ¿Conoces la diferencia entre ellos?
image: https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ
---

Antes de nada conviene recordar lo que son los *procesos* e *hilos*:

En computación, se conoce como *proceso* (o *tarea*) a un programa en ejecución. Dependiendo de cómo esté escrito el programa, el proceso puede estar compuesto de uno o más *hilos* (o *subprocesos*).

Para comprender estos dos conceptos, el primer paso es definirlos correctamente:

- **Concurrencia**: Es la capacidad de un programa de ser ejecutado en varias partes, sin que el orden de ejecución de las mismas afecte al resultado final. Estas partes pueden ejecutarse en un mismo procesador o en procesadores diferentes. Un programa concurrente estará compuesto por varios hilos, que podrán ser ejecutados de forma secuencial o paralela. ([leer más](https://es.wikipedia.org/wiki/Concurrencia_(inform%C3%A1tica)))
- **Paralelismo**: Es un tipo de computación en la que varios procesos pueden estar ejecutándose al mismo tiempo. Está directamente relacionado, por tanto, con el hardware en el que se ejecuta un programa, pero también con el soporte a la concurrencia que ofrezca el lenguaje de programación utilizado, el compilador, etc. Un hardware que soporte paralelismo tendrá varios procesadores y/o varios núcleos por procesador. ([leer más](https://es.wikipedia.org/wiki/Paralelismo_(inform%C3%A1tica)))

Por lo tanto podríamos decir que la concurrencia se refiere a una capacidad o técnica del lenguaje de programación y del entorno de ejecución, más que del hardware subyacente, mientras que el paralelismo está directamente relacionado con la capacidad del hardware de poder ejecutar código concurrente en varios procesadores o núcleos de forma simultánea.

> Puede existir la concurrencia sin paralelismo, pero no el paralelismo sin concurrencia. La concurrencia es necesaria para que un programa pueda paralelizarse.

Dicho esto, en programación es muy común hablar de *paralelizar* cuando hablamos realmente de *concurrencia*, pero se trata de una licencia que tomamos para adaptar el lenguaje a nuestra forma de percibir la ejecución del código. En muchos casos no es una confusión relevante, pero interesa comprender ambos conceptos y ser conscientes de sobre qué se habla en cada caso.

Cuando estamos programando podemos preocuparnos, por tanto, de que nuestro código soporte la concurrencia. Sin embargo no podemos conocer el nivel de paralelismo con el que se ejecutará, puesto que ello dependerá del hardware y variará dependiendo de la carga del sistema, etc.



