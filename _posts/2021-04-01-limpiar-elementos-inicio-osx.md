---
date: 2021-04-01
title: Limpieza de OSX. Elementos de inicio y demonios varios
description: Con el tiempo, es muy posible que nuestro sistema vaya teniendo algunas aplicaciones que se ejecutan de fondo o arrancan al inicio del sistema. Si no solemos utilizarlas o nos molestan, es muy sencillo evitar que ocurra.
---

En Mac OSX muchas veces no es fácil saber qué aplicaciones o servicios arrancan en segundo plano al iniciar el sistema,
al menos no es tan sencillo como en otros sistemas. Podemos desactivar un elemento de inicio y aun así seguir sufriendo
su ejecución al encender nuestra máquina. ¿Cuál es la manera correcta de ver y modificar los servicios que arrancan al inicio?

Debemos echar un vistazo a los siguientes directorios, y eliminar lo que no queramos (siempre siendo muy cuidadoso):

- `/Library/LaunchDaemons/`

  Se trata de servicios en segundo plano, lanzados como usuario `root` al arrancar nuestro dispositivo, incluso antes de que ningún usuario inicie sesión.

- `/Library/LaunchAgents/`

  Aquí se encuentran items que son iniciados cuando algún usuario inicia sesión, y se ejecutan como dicho usuario. Si dos usuarios inician sesión en el mismo dispositivo, estos items se lanzarán dos veces, una por cada usuario.

- `~/Library/LaunchAgents/`

  Como el anterior, pero únicamente para un usuario específico. 

- `/Library/Application Support/`

  Categorizados por aplicación o fabricante, en este directorio se encuentran servicios de soporte a algunas de nuestras aplicaciones. Por ejemplo, servicios de actualizaciones o similar.

- `~/Library/Application Support/`

  Como el anterior, pero únicamente para un usuario específico.

Existen otros elementos de inicio que son propios del sistema y no deberíamos tocar sin extremo cuidado. Empiezan con `com.apple...` y se encuentran en:

- `/System/Library/LaunchAgents/`

Mi recomendación es que cuando queramos eliminar un item lo movamos a un directorio de backup en su lugar, y si tras reiniciar y utilizar el dispositivo un tiempo no notamos ningún problema en las aplicaciones relacionadas, entonces borrar dichos items de forma definitiva. Así podremos restaurarlos si *la liamos*.