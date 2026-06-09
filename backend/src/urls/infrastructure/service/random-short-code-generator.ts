import { Injectable } from '@nestjs/common';
import { ShortCodeGenerator } from '../../domain/service/short-code-generator';
import { randomBytes } from 'crypto';

@Injectable()
export class RandomShortCodeGenerator extends ShortCodeGenerator {
  generate(): string {
    return randomBytes(4).toString('hex');
  }
}
