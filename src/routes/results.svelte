<script lang="ts">
	import { type } from '$lib/typing';

	const text = 'you are BARBIE bot!';
	let textElement: HTMLElement;
	$: {
		if (textElement) {
			type(textElement, 'bubbling...', 200).then(() => {
				type(textElement, text, 100);
			});
		}
	}
</script>

<div class="absolute w-full h-full grid place-content-center">
	<div bind:this={textElement} class="text-white text-center size-48"></div>
</div>
