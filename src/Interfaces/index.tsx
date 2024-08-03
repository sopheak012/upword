// src/interfaces/index.ts
export interface User {
  id: string;
  email: string;
  isLogin: boolean;
}

export interface WordDto {
  id: string;
  value: string;
  definition: string;
  partOfSpeech: string;
  pronunciation: string;
  exampleSentences: string[];
  dateAdded: string;
}

// Define the type for the registration response
export interface RegisterResponse {
  email: string;
  id: string;
  message: string;
}
