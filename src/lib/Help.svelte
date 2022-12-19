<script>
  import Bibdle from './Bibdle.svelte'
  import Tile from './Tile.svelte'
</script>

<main class="grow self-center flex flex-col items-center gap-7 max-w-full w-[32rem] px-4">
  <Bibdle />
  <div class="space-y-3">
    <h2>Cómo jugar</h2>
    <p>Las reglas son simples: adivina la palabra oculta en 6 intentos. Cada intento debe ser una palabra válida y si la palabra no existe el juego te avisará.</p>
    <p>Después de cada intento el color de las casillas cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
    <div class="space-y-2 sm:mx-4">
      <div class="flex items-center gap-3">
        <Tile key="V" matched />
        <p>VERDE significa que la letra está en la palabra y en la posición CORRECTA.</p>
      </div>
      <div class="flex items-center gap-3">
        <Tile key="P" belong />
        <p>PURPURA significa que la letra está presente en la palabra pero en la posición INCORRECTA.</p>
      </div>
      <div class="flex items-center gap-3">
        <Tile key="G" />
        <p>GRIS significa que la letra NO está presente en la palabra.</p>
      </div>
    </div>
    <p>Cada intento debe ser una palabra válida. En cada ronda el juego pinta cada letra de un color indicando si esa letra se encuentra o no en la palabra y si se encuentra en la posición correcta.</p>
  </div>
  <div class="space-y-3 max-w-full">
    <h2>Ejemplo</h2>
    <p>Imagina que la palabra oculta sea CAÑÓN.</p>
    <p>Siempre hay que tener en cuenta que el tablero no acepta tíldes para facilitar la adivinanza de la palabra.</p>
    <p>Empezamos con una palabra válida como AMIGO.</p>
    <div class="flex justify-center gap-2">
      <Tile key="A" belong />
      <Tile key="M" />
      <Tile key="I" />
      <Tile key="G" />
      <Tile key="O" belong />
    </div>
    <p>El purpura indica que tanto la letra A como la O están en la palabra pero en la posicion incorrecta.</p>
    <p>Puedo ahora intentar con una palabra que tenga la A y la O pero en otras posiciones como SALÓN. Nótese que SALÓN lleva tilde, por lo tanto escribimos SALON.</p>
    <div class="flex justify-center gap-2">
      <Tile key="S" />
      <Tile key="A" matched />
      <Tile key="L" />
      <Tile key="O" matched />
      <Tile key="N" matched />
    </div>
    <p>El color verde indica que tanto la letra A como la O y la N están en la posición correcta.</p>
    <p>Finalmente probamos con la palabra CAÑÓN, pero lo escribimos como CAÑON.</p>
    <p>Al final todas las letras deberían ser verdes.</p>
    <div class="flex justify-center gap-2">
      {#each 'CAÑON' as key}
        <Tile {key} matched />
      {/each}
    </div>
  </div>
  <div class="space-y-3 max-w-full">
    <h2>Letras repetidas</h2>
    <p>La palabra oculta puede tener letras repetidas. En ese caso, las pistas son independientes para cada letra y tienen prioridad (verde es mayor a purpura).</p>
    <p>Por ejemplo si la palabra oculta es ROSAS y utilizamos SACOS entonces se marca la primera S en purpura y la segunda S en verde.</p>
    <div class="flex justify-center gap-2">
      <Tile key="S" belong />
      <Tile key="A" />
      <Tile key="C" />
      <Tile key="O" />
      <Tile key="S" matched />
    </div>
    <p>Si utilizo una palabra con tres S como SESOS entonces se marca en verde las S que están en la posición correcta y no se avisa si hay una letra repetida porque ya se encontraron todas las S.</p>
    <div class="flex justify-center gap-2">
      <Tile key="S" />
      <Tile key="E" />
      <Tile key="S" matched />
      <Tile key="O" />
      <Tile key="S" matched />
    </div>
  </div>
</main>
<footer class="w-full px-6 py-4 sm:px-12 sm:py-6">
  Hecho con 💖 por <a class="underline" href="https://jhormanrus.vercel.app">Jhorman Rus</a>
</footer>