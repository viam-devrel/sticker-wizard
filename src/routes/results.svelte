<script lang="ts">
	import { type } from '$lib/typing';

	export let result;

	let textElement: HTMLElement;
	$: {
		if (textElement) {
			type(textElement, 'bubbling...', 200).then(() => {
				type(textElement, result, 100);
			});
		}
	}
</script>

<div class="absolute w-full h-full grid place-content-center">
	<div bind:this={textElement} class="text-white text-center size-48"></div>
</div>
