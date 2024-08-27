---
date: 2021-04-09
title: Comandos útiles de UNIX
description: Hay ciertas necesidades que me surgen de vez en cuando y se resuelven con un comando de UNIX. Éste es mi pequeño recordatorio para no olvidar dichos comandos.
image: /assets/img/linux.jpg
---

## Listar archivos pesados

Con este sencillo comando listamos los archivos y directorios del sistema, ordenados por el espacio en disco que ocupan, y mostrando simplemente el top 10. De este modo obtenemos los 10 archivos/directorios de mayor tamaño. Se trata de un comando muy útil cuando necesitamos liberar espacio en disco.

```
$ du -a * | sort -r -n | head -10
```

Si queremos ir un paso más allá, podemos mostrar el tamaño en formato para humanos, utilizando `gsort` (es parte del paquete `coreutils`), en vez de `sort`:

```
$ du -hs * | gsort -rh
```

