<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import Player from './player.svelte';
	import { PerspectiveCamera, Vector3 } from 'three';
	import bgImage from '$lib/assets/background.png';
	import ladderImage from '$lib/assets/ladder.png';
	import Bucket from './bucket.svelte';
	import { createEventDispatcher, type SvelteComponent } from 'svelte';

	export let cameraPosition: Vector3;
	export let onCameraPositionChange: () => void;

	const dispatch = createEventDispatcher<{ playerChange: { position: Vector3 } }>();

	const DELTA_MULTIPLIER = 10;

	const bgTexture = useTexture(bgImage);
	const ladderTexture = useTexture(ladderImage);

	let camera: PerspectiveCamera;

	let currentCameraPosition = cameraPosition;

	$: {
		if (currentCameraPosition.distanceTo(cameraPosition) == 0) {
			onCameraPositionChange();
		}
	}

	let player: SvelteComponent;
	export const playerGoToLadder = async () => {
		await player.goToLadder();
	};
	export const playerFireMeteor = () => {
		player.fireMeteor();
	};

	useTask((delta) => {
		if (currentCameraPosition.distanceTo(cameraPosition) != 0) {
			if (currentCameraPosition.distanceTo(cameraPosition) < delta * DELTA_MULTIPLIER) {
				currentCameraPosition = cameraPosition;
			} else {
				let unitVector = new Vector3();
				unitVector = unitVector
					.subVectors(cameraPosition, currentCameraPosition)
					.normalize()
					.multiplyScalar(delta * DELTA_MULTIPLIER);
				currentCameraPosition.add(unitVector);
			}
			camera.position.set(
				currentCameraPosition.x,
				currentCameraPosition.y,
				currentCameraPosition.z
			);
		}
	});
</script>

<T.PointLight position={[0, 0, 0]} color="white" distance={10} />

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
/>

<Player
	bind:this={player}
	on:change={(event) => {
		dispatch('playerChange', event.detail);
	}}
/>

<Bucket />

<T.Sprite scale={1.1} position.x={-2.5} position.z={0} position.y={-0.5}>
	{#if $ladderTexture}
		<T.MeshBasicMaterial map={$ladderTexture} transparent={true} />
	{/if}
	<T.PlaneGeometry args={[0.73, 8.07]} />
</T.Sprite>

<T.Sprite scale={3} position.x={0} position.z={-0.01} position.y={1.4}>
	<T.PlaneGeometry args={[12, 5.5]} />
	{#if $bgTexture}
		<T.MeshBasicMaterial map={$bgTexture} />
	{/if}
</T.Sprite>

<T.Mesh position={[0, -7, 0]}>
	<T.PlaneGeometry args={[50, 5]} />
	<T.MeshBasicMaterial color="black" />
</T.Mesh>
