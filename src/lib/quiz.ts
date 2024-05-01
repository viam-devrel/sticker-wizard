interface Question {
	question: string;
	options: string[];
	associatedBots: number[][];
}

export class Quiz {
	quiz: Question[];
	results = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	questionIdx = 0;
	botNames = [
		"Smart machine", "Philosopher bot", "Artsy bot",
		"Ghost bot", "Spicy bot", "Party bot",
		"Cozy bot", "Short-circuit bot", "Barbie bot",
	]

	constructor(quiz: Question[]) {
		this.quiz = quiz;
	}

	currentQuestion(): Question | undefined {
		if (this.questionIdx >= this.quiz.length) {
			return undefined;
		}
		return this.quiz[this.questionIdx];
	}

	selectOption(optionIdx: number): void {
		var botsForSelectedOption = this.quiz[this.questionIdx].associatedBots[optionIdx];
		for (let i = 0; i < botsForSelectedOption.length; i++) {
			this.results[botsForSelectedOption[i] - 1]++;
		}
	}

	nextQuestion() {
		this.questionIdx += 1;
		return this.currentQuestion();
	}

	get length() {
		return this.quiz.length;
	}

	getResults(): string {
		console.log("results");
		console.log(this.results);
		var maxBotIdx = findIndexOfMaxNumber(this.results);
		return this.botNames[maxBotIdx];
	}
}

function findIndexOfMaxNumber(numbers: number[]): number {
	let maxIndex = 0;
	let maxNumber = numbers[0];

	for (let i = 1; i < numbers.length; i++) {
		if (numbers[i] > maxNumber) {
			maxNumber = numbers[i];
			maxIndex = i;
		}
	}

	return maxIndex;
}

