export class GraphQLException extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'GraphQLException';
  }
}
