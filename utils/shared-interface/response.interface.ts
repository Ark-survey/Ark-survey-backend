interface NormalResponse<T = unknown> {
    code: number;
    data?: T;
    message: string;
}