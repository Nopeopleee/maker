// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { HomeBlocksDto } from 'src/api/backend/homepages/dto/home-blocks.dto';
import { HomeBlocksCreateDto } from 'src/api/backend/homepages/dto/home-blocks-create.dto';

@Injectable()
export class HomeBlocksRepository extends Repository<
  HomeBlocksDto,
  HomeBlocksCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('home_blocks');
  }
}
