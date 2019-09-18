export interface Question {
  category: string;
  question: string;
  image: string;
  answer?: number;
  index?: number
}

export interface RawQuestion {
  category: string;
  questions: Array<RawQuestionReduced>;
}

export interface RawQuestionReduced {
  question: string;
  image: string;
}