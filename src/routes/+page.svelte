<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from './scene.svelte';

	import '../app.css';
	import { Vector3 } from 'three';
	import Quiz from '$lib/components/quiz.svelte';
	import title from '$lib/assets/title.png';
	import type { SvelteComponent } from 'svelte';

	type State = 'title' | 'quiz' | 'results';

	const TITLE_CAMERA_POS: Vector3 = new Vector3(0, 0, 12);
	const QUIZ_CAMERA_POS: Vector3 = new Vector3(-3, -4, 10);

	let gameState: State = 'title';
	let cameraPosition: Vector3 = TITLE_CAMERA_POS;

	let scene: SvelteComponent;

	$: {
		switch (gameState) {
			case 'title': {
				cameraPosition = TITLE_CAMERA_POS;
				break;
			}
		}
	}

	const handleOnStart = () => {
		gameState = 'quiz';
		scene.playerGoToLadder();
	};

	const handlePlayerPositionChange = (event: CustomEvent<{ position: Vector3 }>) => {
		if (gameState !== 'title') {
			// camera position should match the player position
			cameraPosition = new Vector3(
				event.detail.position.x,
				event.detail.position.y,
				QUIZ_CAMERA_POS.z
			);
		}
	};
</script>

<div class="relative w-[568px] h-[320px] m-20">
	{#if gameState == 'title'}
		<div class="absolute w-full h-full flex flex-col justify-end items-center">
			<img class="w-full mb-16" src={title} alt="sticker wizard" />
			<button class="border-2 border-white p-1 w-fit text-white text-xs" on:click={handleOnStart}
				>start</button
			>
		</div>
	{:else if gameState == 'quiz'}
		<Quiz />
	{/if}

	<Canvas>
		<Scene
			bind:this={scene}
			{cameraPosition}
			onCameraPositionChange={() => {
				if (gameState === 'quiz') {
					setTimeout(() => {
						gameState = 'quiz';
					}, 100);
				}
			}}
			on:playerChange={handlePlayerPositionChange}
		/>
	</Canvas>
</div>
