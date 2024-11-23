// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { HomeDetailsDto } from 'src/api/backend/homepages/dto/home-details.dto';
import { HomeDetailsCreateDto } from 'src/api/backend/homepages/dto/home-details-create.dto';

@Injectable()
export class HomeDetailsRepository extends Repository<
  HomeDetailsDto,
  HomeDetailsCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('home_details');
  }
}
