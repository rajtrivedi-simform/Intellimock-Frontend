export type userObjLogin = {
  userEmail: string;
  userPassword: string;
};

export type userObjRegister = {
  userFullName: string;
  userEmail: string;
  userPassword: string;
  confirmPassword: string;
};

export type loginResponse = {
  success: boolean;
  status: number;
  msg: string;
};

export interface QuestionResponse {
  success: boolean;
  status: number;
  msg: string;
  data: Array<Question>;
}

export interface Question {
  questionId: string;
  question: string;
  type: string;
  skill: string;
  level: string;
}

export interface questionAPIResponse {
  success: boolean;
  status: number;
  msg: string;
  data: Question;
}

export interface apiResponse {
  success: boolean;
  status: number;
  msg: string;
  data?: object | null;
}
