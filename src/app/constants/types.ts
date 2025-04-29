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

export interface mockInterviewObj {
  mockInterviewId: string;
  interviewType: string;
  level: string;
  skill: string;
}

export interface codeInterviewObj {
  codeInterviewId: string;
  interviewId: string;
  language: string;
  interviewType: string;
  experience: string;
}

export interface questionObj {
  question1?: string;
  question2?: string;
  question3?: string;
  question4?: string;
  question5?: string;
}

export interface QuesAnswerObj {
  question: string;
  answer: string;
}