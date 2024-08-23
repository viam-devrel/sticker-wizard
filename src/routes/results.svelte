<script lang="ts">
	import { type Bot } from '$lib/quiz';
	import { type } from '$lib/typing';
	import cx from 'classnames';

	export let result: Bot | undefined;
	export let onRestart: () => void;

	let showBackground = false;

	let botNameElement: HTMLElement;
	let emojiElement: HTMLElement;
	let botDescriptionElement: HTMLElement;
	let superpowerElement: HTMLElement;
	let fatalFlawElement: HTMLElement;
	$: {
		if (result !== undefined) {
			if (botNameElement) {
				type(botNameElement, 'bubbling...', 200).then(() => {
					type(botNameElement, result.name, 100).then(() => {
						emojiElement.textContent = result.emojis;
						botDescriptionElement.textContent = result.description;
						superpowerElement.textContent = `Superpower: ${result.superpower}`;
						fatalFlawElement.textContent = `Fatal flow: ${result.fatalFlaw}`;
						showBackground = true;
					});
				});
			}
		}
	}
</script>

<div class="absolute w-full h-full grid place-content-center">
	<div class="text-white text-center h-[70dvh] w-[80dvw] flex flex-col gap-2 justify-center">
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
<button
	class="absolute border-2 border-white p-1 w-fit text-white text-xs right-4 bottom-4"
	on:click={onRestart}>restart</button
>
