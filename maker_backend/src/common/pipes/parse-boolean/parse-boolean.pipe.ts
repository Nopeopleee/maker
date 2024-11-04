import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (typeof value === 'string') {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key] === 'true') {
          value[key] = true;
        } else if (value[key] === 'false') {
          value[key] = false;
        }
      }
    }
    return value;
  }
}
