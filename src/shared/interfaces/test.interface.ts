import { Question, RawQuestion } from './question.interface';
export interface Test {
  questions: Array<Question>;
}

export interface RawTest {
  questions: Array<RawQuestion>;
}

export interface TestPresentation {
  uid: string;
  results?: Array<any>;
  date: Date;
}
