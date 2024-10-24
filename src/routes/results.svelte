<script lang="ts">
	import { createMachine, type Machine } from '$lib/machine';
	import { type Bot } from '$lib/quiz';
	import { type } from '$lib/typing';
	import cx from 'classnames';
	import { onMount } from 'svelte';

	export let bot: Bot | undefined;
	export let botIndex: number;
	export let onRestart: () => void;

	let showResult = false;

	let botNameElement: HTMLElement;
	let emojiElement: HTMLElement;
	let botDescriptionElement: HTMLElement;
	let superpowerElement: HTMLElement;
	let fatalFlawElement: HTMLElement;
	$: {
		if (bot !== undefined) {
			if (botNameElement) {
				type(botNameElement, 'bubbling...', 200).then(() => {
					type(botNameElement, bot.name, 100).then(() => {
						emojiElement.textContent = bot.emojis;
						botDescriptionElement.textContent = bot.description;
						superpowerElement.textContent = `Superpower: ${bot.superpower}`;
						fatalFlawElement.textContent = `Fatal flow: ${bot.fatalFlaw}`;
						showResult = true;
					});
				});
			}
		}
	}

	let machine: Machine | undefined;

	let hasDispensedSticker = false;
	const handleDispenseSticker = async () => {
		if (hasDispensedSticker) {
			machine?.helpDispenseSticker(botIndex);
		} else {
			hasDispensedSticker = true;
			machine?.dispenseSticker(botIndex);
		}
	};

	onMount(async () => {
		machine = await createMachine();
	});
</script>

<div class="absolute w-full h-full grid place-content-center">
	<div
		class="text-white text-center h-[70dvh] w-[80dvw] flex flex-col gap-2 justify-center items-center"
	>
		<div class="flex flex-col">
			<!-- svelte-ignore a11y-missing-content -->
			<h1 bind:this={botNameElement}></h1>
			<p bind:this={emojiElement} class="text-lg"></p>
		</div>
		<div
			class={cx('text-sm flex flex-col gap-2 p-2', {
				'bg-black bg-opacity-50': showResult
			})}
		>
			<p bind:this={botDescriptionElement}></p>
			<p bind:this={superpowerElement}></p>
			<p bind:this={fatalFlawElement}></p>
		</div>

		{#if showResult}
			<div class="mt-6 w-full flex flex-row justify-center">
				<button
					class="border-2 border-orange-500 p-1 w-fit text-white text-xs"
					on:click={handleDispenseSticker}
				>
					{!hasDispensedSticker ? 'give me my sticker!' : 'unstuck my sticker'}
				</button>
			</div>
		{/if}
	</div>
</div>
<button
	class="absolute border-2 border-white p-1 w-fit text-white text-xs right-4 bottom-4"
	on:click={onRestart}>restart</button
>
