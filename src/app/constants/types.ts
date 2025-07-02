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

export interface userProfileResponse extends apiResponse {
  data: {
    user: userObject;
    mockInterviewData: Array<mockInterviewData>;
    codeInterviewData: Array<codeInterviewData>;
  };
}

export interface userObject {
  userId: string;
  userFullName: string;
  userEmail: string;
  resumeData: string[];
}
export interface mockInterviewData {
  Timestamp: string;
  interviewType: string;
  level: string;
  mockIntId: string;
}

export interface codeInterviewData {
  codeIntId: string;
  level: string;
  language: string;
  Timestamp: string;
}
