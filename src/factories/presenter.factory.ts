export class PresenterFactory<T> {
  public readonly data: T;

  public readonly messages?: string[];

  constructor(data: T, messages?: string[]) {
    this.data = data;
    this.messages = messages;
  }
}