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
  language: string;
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

export interface mockFeedbackPayload {
  feedBackArray: Array<QuesAnswerObj>;
  intId: string;
}

export interface codingQuestionObj {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '';
  topic: string;
  experience_level: 'Beginner' | 'Junior' | 'Mid' | 'Senior' | '';
  problem_statement: string;
  example_input: string;
  example_output: string;
  hints: string[];
  follow_up_questions: string[];
  expected_skills: string[];
}

export interface feedBackArr {
  question: string;
  answer: string;
  feedback: string;
}
export interface feedbackObj {
  feedback: Array<feedBackArr>;
  selection_probablity: number;
}

export interface feedbackAPIResponse {
  success: boolean;
  status: number;
  message: string;
  data: feedbackObj;
}

export interface skillsAPIResponse extends apiResponse {
  data: {
    skills: Array<string>;
  };
}
