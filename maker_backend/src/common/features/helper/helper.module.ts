import { Module, Global } from '@nestjs/common';
import { HelperService } from './helper.service';
import { GenerateSnService } from '../generate-sn/generate-sn.service';

@Global()
@Module({
  providers: [HelperService, GenerateSnService],
  exports: [HelperService, GenerateSnService],
})
export class HelperModule {}
