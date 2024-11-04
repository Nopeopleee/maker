// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { PreviewsDto } from './dto/previews.dto';
import { PreviewsCreateDto } from './dto/previews-create.dto';

@Injectable()
export class PreviewsRepository extends Repository<
  PreviewsDto,
  PreviewsCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('previews');
  }
}
