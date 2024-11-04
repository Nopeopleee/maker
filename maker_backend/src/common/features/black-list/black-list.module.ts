import { Module, Global } from '@nestjs/common';
import { BlackListService } from './black-list.service';

@Global()
@Module({
  providers: [BlackListService],
  exports: [BlackListService],
})
export class BlackListModule {}
