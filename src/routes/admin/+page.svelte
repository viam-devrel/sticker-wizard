<script lang="ts">
	import { createMachine, type Machine } from '$lib/machine';
	import { Quiz } from '$lib/quiz';
	import { onMount } from 'svelte';
	import quizJSON from '$lib/assets/quiz-external.json';

	const quiz = new Quiz(quizJSON);
	let machine: Machine | undefined;

	const handleTestDispenseSticker = (botIndex: number) => {
		machine?.dispenseSticker(botIndex);
	};

	const handleTestNudgeSticker = (botIndex: number) => {
		machine?.helpDispenseSticker(botIndex);
	};

	onMount(async () => {
		machine = await createMachine();
	});
</script>

<div class="text-white m-20 flex flex-col gap-4">
	<div>
		<h1 class="text-lg">Sticker Wizard HQ</h1>
		<p class="text-lime-500">top secret!!!</p>
	</div>
	<section class="grid grid-cols-3 font-sans gap-4">
		{#each quiz.bots as bot, index}
			<div class="flex flex-col gap-2 border border-1 p-2 border-white border-opacity-30">
				<p class="font-bold">{bot.name.toLowerCase()}</p>
				<button
					class="border border-1 border-white border-opacity-75"
					on:click={() => handleTestDispenseSticker(index)}
				>
					dispense
				</button>

				<button
					class="border border-1 border-white border-opacity-75"
					on:click={() => handleTestNudgeSticker(index)}
				>
					nudge
				</button>
			</div>
		{/each}
	</section>
</div>
