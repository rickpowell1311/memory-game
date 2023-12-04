export interface CompleteGameRequest {
    answers: Array<CompleteGameAnswerRequest>;
}

export interface CompleteGameAnswerRequest {
    order: number;
    item: string;
}