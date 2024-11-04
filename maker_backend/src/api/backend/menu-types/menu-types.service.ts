import { Injectable } from '@nestjs/common';
import { MenuTypesRepository } from 'src/common/repository/menus/menu-types.repository';
import { Service } from 'src/common/service/service';

@Injectable()
export class MenuTypesService extends Service {
  constructor(menuTypesRepository: MenuTypesRepository) {
    super('menu_types', menuTypesRepository);
  }
}
