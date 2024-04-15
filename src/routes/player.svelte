<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { AnimatedSpriteMaterial } from '@threlte/extras';
	import { Mesh, Vector3 } from 'three';
	import wizardImg from '$lib/assets/wizard.png';
	import wizardJSON from '$lib/assets/wizard.json?url';
	import { createEventDispatcher } from 'svelte';

	type State = 'random-walk' | 'walk-to-ladder' | 'idle';
	let state: State = 'random-walk';
	let animation = 'idle-left';

	const dispatch = createEventDispatcher<{ change: { position: Vector3 } }>();

	// idle must be an integer
	const task = { x: Math.random() + 1, y: 0, idle: 0 };
	export const position: [number, number, number] = [0, -4.5, 0.01];
	const mesh = new Mesh();
	mesh.position.set(...position);

	$: {
		dispatch('change', { position: new Vector3(...position) });
	}

	export const goToLadder = (): void => {
		state = 'walk-to-ladder';
		task.x = -3 - mesh.position.x;
		task.y = 9.5;
	};

	const assignRandomTask = () => {
		const destination = Math.random() * 4;

		const shouldStayIdle = Math.random() < 0.5;
		if (shouldStayIdle) {
			task.idle = Math.floor(destination + 2);
		} else {
			if (mesh.position.x > 5) {
				task.x = -destination;
			} else if (mesh.position.x < -5) {
				task.x = destination;
			} else {
				task.x = Math.sign(Math.random() * 2 - 1) * destination;
			}
		}
	};

	useTask((delta) => {
		if (state === 'random-walk') {
			if (task.x === 0 && task.idle === 0) {
				assignRandomTask();
			}
		}

		// handle task
		if (task.idle > 0) {
			task.idle -= 0.2;
			if (Math.abs(task.idle) < 0.2) {
				task.idle = 0;
			}
		}

		// save animation
		if (task.x > 0) {
			animation = 'walk-right';
		} else if (task.x < 0) {
			animation = 'walk-left';
		} else if (task.y > 0) {
			animation = 'walk-left';
		} else if (task.x == 0 && animation === 'walk-left') {
			animation = 'idle-left';
		} else if (task.x == 0 && animation === 'walk-right') {
			animation = 'idle-right';
		}

		// move
		if (Math.abs(task.x) > 0) {
			const distance = Math.sign(task.x) * delta;
			position[0] += distance;
			mesh.position.set(...position);

			task.x += -distance;
			if (Math.abs(task.x) < 0.5) {
				task.x = 0;
			}
		} else if (task.y > 0) {
			const distance = Math.sign(task.y) * delta;
			position[1] += distance;
			mesh.position.set(...position);

			task.y += -distance;
			if (Math.abs(task.y) < 0.5) {
				task.y = 0;
			}
		}
	});
</script>

<T is={mesh}>
	<AnimatedSpriteMaterial {animation} textureUrl={wizardImg} dataUrl={wizardJSON} />
	<T.PlaneGeometry />
</T>
