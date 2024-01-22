<script lang="ts">
import { Canvas, T } from '@threlte/core'
import Scene from './scene.svelte'

import "../app.css";
import { Vector3 } from 'three';
import Quiz from '$lib/components/quiz.svelte';
import title from '$lib/assets/title.png'

type State = 'title' | 'quiz' | 'results'

const TITLE_CAMERA_POS: Vector3 = new Vector3(0, 0, 8)
const TITLE_CAMERA_LOOKAT: Vector3 = new Vector3(0, 1, 0)
const QUIZ_CAMERA_POS: Vector3 = new Vector3(0, 0, 3)
const QUIZ_CAMERA_LOOKAT: Vector3 = new Vector3(0, 0, 0)

let gameState: State = 'title'
let cameraPosition: Vector3 = TITLE_CAMERA_POS;
let cameraLookAt: Vector3 = TITLE_CAMERA_LOOKAT;

$: {
  switch (gameState) {
    case 'title': {
      cameraPosition = TITLE_CAMERA_POS
      cameraLookAt = TITLE_CAMERA_LOOKAT
      break
    }
    case 'quiz': {
      cameraPosition = QUIZ_CAMERA_POS
      cameraLookAt = QUIZ_CAMERA_LOOKAT
      break
    }
  }
}

</script>

<div class="relative w-[568px] h-[320px] m-20">
  { #if gameState == 'title'}
  <div class="absolute w-full h-full flex flex-col justify-end items-center">
    <img class="mb-16 w-full" src={title} alt="sticker wizard">
    <button class="border-2 border-white p-2 mb-2 w-fit" on:click={() => {
      cameraPosition = QUIZ_CAMERA_POS
    }}>start</button>
  </div>
  {:else if gameState == 'quiz'}
    <Quiz />
  { /if }

  <Canvas>
    <Scene
      {cameraPosition}
      {cameraLookAt}
      onCameraPositionChange={() => {
        if (cameraPosition.distanceTo(QUIZ_CAMERA_POS) == 0)  {
          setTimeout(() => {
            gameState = 'quiz'
          }, 100)
        }
      }}
    />
    <T.DirectionalLight
      intensity={2}
      castShadow
      position={[1, 1, 1]}
    />
  </Canvas>
</div>
