export abstract class GetOriginalUrlUseCase {
  abstract execute(shortCode: string): Promise<string>;
}
