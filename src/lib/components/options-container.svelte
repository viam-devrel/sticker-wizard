<script lang="ts">
	import Option from '$lib/components/option.svelte';

	export let options: string[];
	export let selectedOption: number;
	export let selectOption: (idx: number) => void;
</script>

<div class="bg-black text-white absolute top-4 right-4 py-2 max-w-[300px] flex flex-col gap-1">
	{#each options as option, idx}
		<Option
			text={option}
			isSelected={selectedOption == idx}
			selectOption={() => selectOption(idx)}
		/>
	{/each}
</div>
