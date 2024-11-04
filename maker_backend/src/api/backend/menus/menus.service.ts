import { Injectable } from '@nestjs/common';
import { MenusRepository } from 'src/common/repository/menus/menus.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class MenusService extends Service {
  constructor(menusRepository: MenusRepository) {
    super('menus', menusRepository);
  }
}
