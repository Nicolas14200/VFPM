export interface Usecase<I, O> {
  execute(payload?: I): Promise<O> | O;
}
