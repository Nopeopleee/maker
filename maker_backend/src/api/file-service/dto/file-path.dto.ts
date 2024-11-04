import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilePathDto {
  @ApiProperty({ example: 'images' })
  @IsString()
  @IsOptional()
  filePath?: string;

  @ApiProperty({ example: 'images' })
  @IsString()
  @IsOptional()
  oldPath?: string;

  @ApiProperty({ example: 'cut' })
  @IsString()
  @IsOptional()
  action?: string;
}
