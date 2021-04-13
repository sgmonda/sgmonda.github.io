---
date: 2021-04-09
title: Comandos útiles de UNIX
description: Hay ciertas necesidades que me surgen de vez en cuando y se resuelven con un comando de UNIX. Éste es mi pequeño recordatorio para no olvidar dichos comandos.
image: https://images.unsplash.com/photo-1520809227329-2f94844a9635?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ
---

## Listar los archivos y directorios que más espacio ocupan en el disco duro

```
$ du -a * | sort -r -n | head -10
```