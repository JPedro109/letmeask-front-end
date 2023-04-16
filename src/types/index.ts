export type QuestionTypes = {
    id: string;
    userId: string;
    question: string;
    response: ResponseTypes;
    name: string;
}

type ResponseTypes = {
    id: string;
    questionId: string;
    response: string;
}