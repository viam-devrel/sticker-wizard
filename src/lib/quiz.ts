interface Question {
	question: string;
	options: string[];
	associatedBots: number[];
}

export class Quiz {
	quiz: Question[];
	results: number[];
	questionIdx = 0;

	constructor(quiz: Question[]) {
		this.quiz = quiz;
		this.results = new Array(9).map(() => 0);
	}

	currentQuestion(): Question | undefined {
		if (this.questionIdx >= this.quiz.length) {
			return undefined;
		}
		return this.quiz[this.questionIdx];
	}

	selectOption(optionIdx: number): void {
		// this.results[this.questionIdx] = this.quiz[this.questionIdx].options[optionIdx];
	}

	nextQuestion() {
		this.questionIdx += 1;
		return this.currentQuestion();
	}

	get length() {
		return this.quiz.length;
	}

	getResults() {
		// TODO: what do results look like?
		return this.results;
	}
}
