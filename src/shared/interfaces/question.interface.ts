export interface Question {
  category: string;
  question: string;
  answer?: number;
}

export interface RawQuestion {
  category: string;
  questions: Array<string>;
}
