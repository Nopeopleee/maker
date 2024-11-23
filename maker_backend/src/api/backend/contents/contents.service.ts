import { Injectable } from '@nestjs/common';
import { ContentsRepository } from 'src/common/repository/contents/contents.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class ContentsService extends Service {
  constructor(contentsRepository: ContentsRepository) {
    super('contents', contentsRepository);
  }
}
