export interface User {
  uid: string;
  status: number;
  name: string;
  fullname: string;
  email: string;
  image: string;
  age?: number;
  institute?: string;
  stratum?: number;
  results?: Array<any>;
}
