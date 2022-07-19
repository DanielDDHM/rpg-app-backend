export class PresenterFactory<T> {
  public readonly data: T;

  public readonly messages: string[];

  public readonly isValid: boolean;

  constructor(data: T, messages: string[], isValid: boolean) {
    this.data = data;
    this.messages = messages;
    this.isValid = isValid;
  }
}