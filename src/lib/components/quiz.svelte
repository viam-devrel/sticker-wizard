<script lang="ts">
	import Arrow from '$lib/assets/arrow.png';
	import SelectButtonBkgd from '$lib/assets/select-button.png';
	import OptionsContainer from '$lib/components/options-container.svelte';
	import { Quiz, type } from '$lib';
	import { createEventDispatcher } from 'svelte';
	import { type Bot } from '$lib/quiz';

	export let quiz: Quiz;

	const dispatch = createEventDispatcher<{
		select: void;
		complete: Bot;
	}>();

	let selectedOptionIdx = 0;
	let currentQuestion = quiz.currentQuestion();

	$: {
		// Reached the end of the quiz
		if (!currentQuestion) {
			dispatch('complete', quiz.getResults());
		}
	}

	const handleIncSelectedOption = () => {
		if (currentQuestion) {
			selectedOptionIdx = Math.min(currentQuestion.options.length - 1, selectedOptionIdx + 1);
		}
	};

	const handleDecSelectedOption = () => {
		selectedOptionIdx = Math.max(0, selectedOptionIdx - 1);
	};

	const handleChooseSelectedOption = (idx: number) => {
		selectedOptionIdx = idx;
	};

	const handleSelectOption = () => {
		quiz.selectOption(selectedOptionIdx);
		currentQuestion = quiz.nextQuestion();
		dispatch('select');
		selectedOptionIdx = 0;
	};

	let isTypingComplete = false;
	let questionTextElement: HTMLElement;
	$: {
		if (questionTextElement && currentQuestion) {
			isTypingComplete = false;
			type(questionTextElement, currentQuestion.question).then(() => {
				isTypingComplete = true;
			});
		}
	}
</script>

{#if isTypingComplete}
	<OptionsContainer
		options={currentQuestion?.options ?? []}
		selectedOption={selectedOptionIdx}
		selectOption={handleChooseSelectedOption}
	/>
{/if}

<div class="absolute w-[calc(100%-2rem)] m-4 bottom-0">
	<!-- Quiz controls -->
	<div class="flex justify-between">
		<div class="flex flex-col gap-2 mb-2">
			<button on:click={handleDecSelectedOption}>
				<img src={Arrow} alt="up arrow" />
			</button>
			<button on:click={handleIncSelectedOption}>
				<img class="rotate-180" src={Arrow} alt="down arrow" />
			</button>
		</div>
	</div>

	<div class="flex justify-between w-full gap-4">
		<!-- Quiz question -->
		<div
			bind:this={questionTextElement}
			class="bg-white h-[64px] w-full bottom-0 p-3 leading-none border-4 border-gray-500"
		></div>
		
		<button on:click={handleSelectOption}>
			<div class="relative text-center">
				<span class="absolute inset-0 py-1.5">Select</span>
				<img src={SelectButtonBkgd} alt="select button" />
			</div>
		</button>
	</div>
</div>
