<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid, Sky, useTexture } from '@threlte/extras'
	import Player from './player.svelte';
	import { PerspectiveCamera, Vector3 } from 'three';
  import bgImage from '$lib/assets/background.png'
  import ladderImage from '$lib/assets/ladder.png'
	import Bucket from './bucket.svelte';

  export let cameraPosition: Vector3;
  export let cameraLookAt: Vector3;
  export let onCameraPositionChange: () => void

  const DELTA_MULTIPLIER = 15

  const bgTexture = useTexture(bgImage)
  const ladderTexture = useTexture(ladderImage)

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
    // if (currentCameraLookAt.distanceTo(cameraLookAt) != 0) {
    //   if (currentCameraLookAt.distanceTo(cameraLookAt) < delta * DELTA_MULTIPLIER) {
    //     currentCameraLookAt = cameraLookAt
    //   } else {
    //     let unitVector = new Vector3();
    //     unitVector = unitVector.subVectors(cameraLookAt, currentCameraLookAt).normalize().multiplyScalar(delta * DELTA_MULTIPLIER)
    //     currentCameraLookAt.add(unitVector)
    //   }
    //   camera.lookAt(currentCameraLookAt)
    // }
  })
</script>

<T.PointLight position={[0, 0, 0]} color="white" distance={10}/>

<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
  on:create={({ ref }) => {
    ref.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z)
  }}/>


<Grid position.y={0.001} type='polar' fadeDistance={10} infiniteGrid />

<Player/>

<Bucket />

<T.Sprite
  scale={1.1}
  position.x={-2.5}
  position.z={0}
  position.y={-0.5}
>
  {#if $ladderTexture}
    <T.MeshBasicMaterial map={$ladderTexture} transparent={true} />
  {/if}
  <T.PlaneGeometry
    args={[0.73, 8.07]}
  />
</T.Sprite>

<T.Sprite
  scale={13}
  position.x={0}
  position.z={-0.01}
  position.y={0.5}
>
  <T.PlaneGeometry
    args={[2, 0.8]}
  />
  {#if $bgTexture}
    <T.MeshBasicMaterial map={$bgTexture}
    />
  {/if}
</T.Sprite>

<T.Mesh
  position={[0, -7, 0]}
>
  <T.PlaneGeometry
    args={[30, 5]}
  />
  <T.MeshBasicMaterial color="black"/>
</T.Mesh>