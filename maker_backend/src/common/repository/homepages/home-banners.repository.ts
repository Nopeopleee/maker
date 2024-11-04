// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { HomeBannersCreateDto } from 'src/api/backend/homepages/dto/home-banners-create.dto';
import { HomeBannersDto } from 'src/api/backend/homepages/dto/home-banners.dto';

@Injectable()
export class HomeBannersRepository extends Repository<
  HomeBannersDto,
  HomeBannersCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('home_banners');
  }
}
