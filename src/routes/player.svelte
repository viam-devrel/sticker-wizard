<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'
  import { Mesh } from 'three'
  import wizardImg from '$lib/assets/wizard.png'
  import wizardJSON from '$lib/assets/wizard.json?url'

  export const playerPosition: [number, number, number] = [0, 1, 0]
  const mesh = new Mesh()
  mesh.position.set(...playerPosition)
  mesh.castShadow = true

  let animation = 'idle'

  const keyboard = { x: 0 }
  const pressed = new Set<string>()

  const handleKey = (key: string, value: 0 | 1) => {
    switch (key.toLowerCase()) {
      case 'a':
      case 'arrowleft':
        return (keyboard.x = +value)
      case 'd':
      case 'arrowright':
        return (keyboard.x = -value)
    }
    return
  }

  const handleKeydown = (e: KeyboardEvent) => {
    pressed.add(e.key)
    pressed.forEach((key) => handleKey(key, 1))
  }

  const handleKeyup = (e: KeyboardEvent) => {
    pressed.delete(e.key)
    handleKey(e.key, 0)
    pressed.forEach((key) => handleKey(key, 1))
  }


  useTask((delta) => {
    if (keyboard.x != 0) {
      animation = 'walk'
    } else {
      animation = 'idle'
    }
    playerPosition[0] += -keyboard.x * (delta * 2)
    mesh.position.set(...playerPosition)
  })
</script>

<svelte:window
  on:keydown={handleKeydown}
  on:keyup={handleKeyup}
/>

<!-- animations aren't working!! -->
<T is={mesh}>
  <AnimatedSpriteMaterial
    animation={animation}
    textureUrl={wizardImg}
    dataUrl={wizardJSON}
  />
  <T.PlaneGeometry />
</T>
