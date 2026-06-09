export abstract class DeleteUrlUseCase {
  abstract execute(urlId: string, userId: string): Promise<void>;
}
