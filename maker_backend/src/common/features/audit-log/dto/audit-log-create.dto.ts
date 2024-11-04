import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString } from 'class-validator';

export class AuditLogCreateDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  admin_id: number;

  @IsString()
  @ApiProperty({ example: 'Create' })
  action: string;

  @IsString()
  @ApiProperty({ example: 'Success' })
  message: string;

  @IsString()
  @ApiProperty({ example: '0.0.0.0' })
  ip: string;
}
