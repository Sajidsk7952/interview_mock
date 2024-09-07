export type interviewdata = {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExp: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
};
export type ResultType = {
  speechBlob?: Blob;
  timestamp: number;
  transcript: string;
};