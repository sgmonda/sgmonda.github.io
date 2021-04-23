---
date: 2021-04-09
title: Comandos útiles de UNIX
description: Hay ciertas necesidades que me surgen de vez en cuando y se resuelven con un comando de UNIX. Éste es mi pequeño recordatorio para no olvidar dichos comandos.
---

## Listar los archivos y directorios que más espacio ocupan en el disco duro

```
$ du -a * | sort -r -n | head -10
```