<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AnimatedSpriteMaterial } from '@threlte/extras'
  import { Mesh } from 'three'
  import wizardImg from '$lib/assets/wizard.png'
  import wizardJSON from '$lib/assets/wizard.json?url'

  export const playerPosition: [number, number, number] = [0, -4.5, 0.01]
  const mesh = new Mesh()
  mesh.position.set(...playerPosition)
  mesh.castShadow = true

  let animation = 'idle-left'

  // idle must be an integer
  const playerTask = { x: Math.random() + 1, y: 0, idle: 0 };

  useTask((delta) => {
    if (playerTask.idle > 0) {
      playerTask.idle -= 0.20
      return
    }

    if (playerTask.x > 0) {
      animation = 'walk-right'
    } else if (playerTask.x < 0) {
      animation = 'walk-left'
    } else if (playerTask.x == 0 && animation === 'walk-left') {
      animation = 'idle-left'
    } else if (playerTask.x == 0 && animation === 'walk-right') {
      animation = 'idle-right'
    } else {
      // assign new task
      const destination = Math.random() * 4

      const shouldStayIdle = Math.random() < 0.5
      if (shouldStayIdle) {
        playerTask.idle = Math.floor(destination + 2)
      } else {
        if (mesh.position.x > 5) {
          playerTask.x = -destination
        } else if (mesh.position.x < -5) {
          playerTask.x = destination
        } else {
          playerTask.x = Math.sign((Math.random() * 2) - 1) * destination
        }
      }
    }

    const distance = Math.sign(playerTask.x) * delta
    playerPosition[0] += distance
    mesh.position.set(...playerPosition)

    playerTask.x += -distance
    if (Math.abs(playerTask.x) < 0.5) {
      playerTask.x = 0 
    }
  })
</script>

<T is={mesh}>
  <AnimatedSpriteMaterial
    animation={animation}
    textureUrl={wizardImg}
    dataUrl={wizardJSON}
  />
  <T.PlaneGeometry />
</T>
