import { Injectable } from '@nestjs/common';
import { HomepagesRepository } from 'src/common/repository/homepages/homepages.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class HomepagesService extends Service {
  constructor(homepagesRepository: HomepagesRepository) {
    super('homepages', homepagesRepository);
  }
}
