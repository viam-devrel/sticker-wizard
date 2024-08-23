interface QuizData {
	questions: Question[];
	bots: Bot[];
}

interface Question {
	question: string;
	options: string[];
	associatedBots: number[][];
}

export interface Bot {
	name: string;
	emojis: string;
	description: string;
	superpower: string;
	fatalFlaw: string;
}

export class Quiz {
	questions: Question[];
	bots: Bot[];

	results = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	questionIdx = 0;

	constructor(quiz: QuizData) {
		this.questions = quiz.questions;
		this.bots = quiz.bots;
	}

	currentQuestion(): Question | undefined {
		if (this.questionIdx >= this.questions.length) {
			return undefined;
		}
		return this.questions[this.questionIdx];
	}

	selectOption(optionIdx: number): void {
		const botsForSelectedOption = this.questions[this.questionIdx].associatedBots[optionIdx];
		for (let i = 0; i < botsForSelectedOption.length; i++) {
			this.results[botsForSelectedOption[i] - 1]++;
		}
	}

	nextQuestion() {
		this.questionIdx += 1;
		return this.currentQuestion();
	}

	get length() {
		return this.questions.length;
	}

	getResults(): Bot {
		console.log('results');
		console.log(this.results);
		const maxBotIdx = findIndexOfMaxNumber(this.results);
		return this.bots[maxBotIdx];
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
