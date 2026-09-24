Pixel Art Creator
Se trata de una aplicacion web para crear pixel art(pintar pixel a pixel) directamente en el navegador.
Genera una cuadricula del tam pedido por el usuario, que permite dibujar cada pixel con el color elegido por el usuario y el resultado se puede exportar como imagen PNG.

Funcionalidades:
  -Generación de una cuadricula configurable de entre 2×2 y 64×64 celdas.
  -Un selector de color para pintar.
  -Se puede pintar click por click o se puede pintar arrastrando el raton.
  -Modo borrador para limpiar celdas ya pintadas.
  -Botón "Clear all" para vaciar toda la cuadricula sin cambiar el tamaño de la cuadrícula.
  -Descarga del dibujo como imagen PNG.  
  -Modo oscuro, activable con la tecla N.

Tecnologias usadas en el proyecto:
  -HTML5
  -CSS3
  -JavaScript

Estructura del proyecto:
  -index.html
  -styles.css
  -script.js
  -media/ -- > Gemini_Generated_Image.jpeg ( imagen creada por nano banana pro para el diseno del fondo de la web app)


## Uso de IA
 -El fondo de la web lo genere con gemini, mas especificamente con nano banana pro para que el diseno y los colores fueran acordes a el diseno que tenia en mente para la web app.
 -En el html solo se hizo uso de la ia para la integracion de las apis de google para los fonts, ya que describi como queria que fuera el texto y me ayudo a encontrar las mejores fuentes que concordasen para el proyecto.
 -En el css hice uso de la IA para realizar algunas mejoras visiuales un poco mas complejas como pooner transparencia al fondo de un div dejando los botones intactos o algunos de los hovers y animaciones que resultaban algo mas complejos.
   Uno de los prompts utlizados para llevar esto acabo fue el siguiente : " Modifica el archivo css del proyecto tal que el fondo del div con la etiqueta controls sea transparente sin realizar cambios en la apariencia de los botones que
   contiene ese div". Una vez finalizada la apariencia de la app tal y como yo queria simplemente hice un prompt para que revisara todo el codigo y me dijera si faltaba algo, me dio un par de consejos para centrar un poco mejor alguno de
   los textos que aparecian en la app y ya quedo finalizada la parte de css.
 -Para el script de javaScript si que requerido algo mas de uso de IA, ya que no tengo demasiado control sobre el lenguaje todavia. Sobre todo la parte en la que requeria mas ayuda fue para el manejo de la creacion de las celdas y para la
 funcionalidad de pintado arrastrando el raton, ya que pintar clik a click es sencillo pero no veia la forma de poder pintar simplemente arrastrando el raton. Los prompts mas significativos de esta parte del proyecto fueron:
 'Agrega las funcionalidades necesarias faltantes para poder pintar las celdas de la cuadricula de forma que tambien puedan pintarse arrastrando el raton y no solo clik a click'
 'Ayudame con el desarrollo de la funcion generateGrid(gridSize) para que al pasarle un nuevo tam de cuadricula, la app ajuste el tam al requerido por el usuario'

 -Para realizar las debidas comprobaciones del proyecto fui probando cada uno de los botones y las distintas funcionalidades que iba integrando en el mismo cada vez que implementaba algo nuevo para asegurarme de que todo iba correctamente
 y asi no tener que depurar todo el codigo una vez ya finalizado ya que suele ser mas complejo de encontrar distintos errores. Aparte fui revisando linea por linea para asegurarme de que toda la sintaxis y los textos del html que 
 iba a ver el usuario estaban correctos. Opte por realizar toda la parte visual en ingles para obtener una adaptacion a la mayoria de los usuarios y la parte de codigo la he realizado en espanol para la mejor compresion de todos en la
 defensa del proyecto.

Autopsia:
  -Una de las desiones que mas me plantee fue la de la descarga de la imagen, ya que no sabia si exportarla como jpg o si directamente descargar la cuadricula entera y termine decidiendo que se veria mejor y tendria mas usos el poder
  descargarla sin fondo como jpg.
  -Otra de las decisiones mas complicadas fue decidir la funcionalidad de cada boton, me habria gustado incluir algun tipo de herramienta extra aparte de solo el pintado y el borrado de las celdas, pero opte por dejar un proyecto mas
  limpio y sin tantas funcionalidades pero que fuera productivo y que se pudiera usar sin encontrar fallos.
