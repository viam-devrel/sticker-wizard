<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from './scene.svelte';
	import { onMount, type SvelteComponent } from 'svelte';

	import '../app.css';
	import { Vector3 } from 'three';
	import Quiz from '$lib/components/quiz.svelte';
	import title from '$lib/assets/title.png';
	import Results from './results.svelte';

	type State = 'rotate-phone' | 'title' | 'pre-quiz' | 'quiz' | 'results';

	const TITLE_CAMERA_POS: Vector3 = new Vector3(0, 0, 12);
	const QUIZ_CAMERA_POS: Vector3 = new Vector3(-3, -4, 10);

	let gameState: State = 'title';
	let prevGameState: State | undefined = undefined;
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

	const handleOnStart = async () => {
		gameState = 'pre-quiz';
		await scene.playerGoToLadder();
		gameState = 'quiz';
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

	onMount(() => {
		if (screen.orientation.type.includes('portrait')) {
			prevGameState = gameState;
			gameState = 'rotate-phone';
		}

		window.addEventListener('orientationchange', () => {
			if (screen.orientation.type.includes('portrait')) {
				prevGameState = gameState;
				gameState = 'rotate-phone';
			} else if (screen.orientation.type.includes('landscape') && gameState === 'rotate-phone') {
				gameState = prevGameState ?? 'title';
			}
		});
	});
</script>

<div class="relative w-dvh h-dvh lg:w-[568px] lg:h-[320px] bg-gray-800">
	{#if gameState == 'title'}
		<div class="absolute w-full h-full flex flex-col">
			<img class="w-full pt-[128px] px-1" src={title} alt="sticker wizard" />
			<div class="w-full flex justify-center px-4">
				<button class="border-2 border-white p-1 w-fit text-white text-xs" on:click={handleOnStart}
					>start</button
				>
			</div>
		</div>
	{:else if gameState == 'quiz'}
		<Quiz
			on:select={() => {
				scene.playerFireMeteor();
			}}
			on:complete={() => {
				gameState = 'results';
			}}
		/>
	{:else if gameState == 'results'}
		<Results />
	{:else if gameState == 'rotate-phone'}
		<div
			class="relative w-full h-full grid place-content-center text-white text-center text-xl px-4"
		>
			<h1 class="text-red-500">⚠️ WARNING! ⚠️</h1>
			sticker wizard will cry if you don't rotate your device. please don't make him cry :(
		</div>
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
