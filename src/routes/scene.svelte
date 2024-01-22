<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid, Sky } from '@threlte/extras'
	import Player from './player.svelte';
	import { PerspectiveCamera, Vector3 } from 'three';

  export let cameraPosition: Vector3;
  export let cameraLookAt: Vector3;
  export let onCameraPositionChange: () => void

  const DELTA_MULTIPLIER = 15

  let camera: PerspectiveCamera

  let currentCameraPosition = cameraPosition
  let currentCameraLookAt = cameraLookAt

  $: {
    if (currentCameraPosition.distanceTo(cameraPosition) == 0) {
      onCameraPositionChange()
    }
  }
  
  useTask((delta) => {
    if (currentCameraPosition.distanceTo(cameraPosition) != 0) {
      if (currentCameraPosition.distanceTo(cameraPosition) < delta * DELTA_MULTIPLIER) {
        currentCameraPosition = cameraPosition
      } else {
        let unitVector = new Vector3();
        unitVector = unitVector.subVectors(cameraPosition, currentCameraPosition).normalize().multiplyScalar(delta * DELTA_MULTIPLIER)
        currentCameraPosition.add(unitVector)
      }
      camera.position.set(currentCameraPosition.x, currentCameraPosition.y, currentCameraPosition.z)
    }

    // this is janky fix it -- use quaternions instead of 2 vectors?
    if (currentCameraLookAt.distanceTo(cameraLookAt) != 0) {
      if (currentCameraLookAt.distanceTo(cameraLookAt) < delta * DELTA_MULTIPLIER) {
        currentCameraLookAt = cameraLookAt
      } else {
        let unitVector = new Vector3();
        unitVector = unitVector.subVectors(cameraLookAt, currentCameraLookAt).normalize().multiplyScalar(delta * DELTA_MULTIPLIER)
        currentCameraLookAt.add(unitVector)
      }
      camera.lookAt(currentCameraLookAt)
    }
  })
</script>

<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  on:create={({ ref }) => {
    ref.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z)
  }}/>

<Sky />

<Grid position.y={0.001} type='polar' fadeDistance={10} infiniteGrid />

<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<Player/>