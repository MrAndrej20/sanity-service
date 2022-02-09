
export interface CodedError {
    message: string;
    code: number;
}

export function codedError(code: number, message: string): CodedError {
    return { code, message };
}
