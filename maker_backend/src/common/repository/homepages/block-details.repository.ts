// Nestjs
import { Injectable } from '@nestjs/common';

// Repository
import { Repository } from 'src/common/repository/repository';

// Services
import { HelperService } from 'src/common/features/helper/helper.service';

// Dto
import { BlockDetailsDto } from 'src/api/backend/homepages/dto/block-details.dto';
import { BlockDetailsCreateDto } from 'src/api/backend/homepages/dto/block-details-create.dto';

@Injectable()
export class BlockDetailsRepository extends Repository<
  BlockDetailsDto,
  BlockDetailsCreateDto
> {
  constructor(private readonly helperService: HelperService) {
    super('block_details');
  }
}
