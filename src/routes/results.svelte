<script lang="ts">
	import { createMachine, type Machine } from '$lib/machine';
	import { type Bot } from '$lib/quiz';
	import { type } from '$lib/typing';
	import cx from 'classnames';
	import { onMount } from 'svelte';

	export let bot: Bot | undefined;
	export let botIndex: number;
	export let onRestart: () => void;

	let showBackground = false;

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
						showBackground = true;
						showDispenseStickerButton = true;
					});
				});
			}
		}
	}

	let machine: Machine | undefined;

	let showDispenseStickerButton = false;
	const handleDispenseSticker = async () => {
		showDispenseStickerButton = false;
		machine?.dispenseSticker(botIndex);
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
				'bg-black bg-opacity-50': showBackground
			})}
		>
			<p bind:this={botDescriptionElement}></p>
			<p bind:this={superpowerElement}></p>
			<p bind:this={fatalFlawElement}></p>
		</div>
	</div>
</div>
{#if showDispenseStickerButton}
	<div class="absolute bottom-4 w-full flex flex-row justify-center">
		<button
			class="border-2 border-orange-500 p-1 w-fit text-white text-xs"
			on:click={handleDispenseSticker}
		>
			give me my sticker!
		</button>
	</div>
{/if}
<button
	class="absolute border-2 border-white p-1 w-fit text-white text-xs right-4 bottom-4"
	on:click={onRestart}>restart</button
>
