export namespace Exception {
  export class AppError {
    public readonly messages: string[];
    public readonly statusCode: number;

    constructor(statusCode: number, messages: string[]) {
      this.messages = messages;
      this.statusCode = statusCode;
    }
  }
}
