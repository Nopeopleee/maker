// Nestjs
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Swagger
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAdminGuard } from 'src/common/guards/jwt-admin/jwt-admin.guard';

// Service
import { FileServiceService } from './file-service.service';
import { LoggerService } from 'src/common/features/logger/logger.service';

// Dto
import { FilePathDto } from './dto/file-path.dto';

// Express
import { Request, Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuditLogService } from 'src/common/features/audit-log/audit-log.service';

@ApiTags('File Service')
@Controller('file-service')
export class FileServiceController {
  constructor(
    private fileService: FileServiceService,
    private logger: LoggerService,
  ) {}

  private readonly auditLogService = new AuditLogService();

  @Get()
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get file list' })
  async getFileList(@Query() filePath: FilePathDto): Promise<any> {
    try {
      return await this.fileService.getFileList(filePath.filePath);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':filePath')
  @ApiOperation({ summary: 'Get a file' })
  async getFile(
    @Param('filePath') filePath: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const file = await this.fileService.getFile(filePath);

      res.setHeader('Content-Type', file.mimeType);
      res.setHeader('Content-Disposition', 'inline');

      res.send(file.file);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':filePath')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a file' })
  async deleteFile(
    @Param('filePath') filePath: string,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'delete',
        message: `刪除檔案: ${filePath}`,
        ip: req.ip,
      });

      return await this.fileService.deleteFile(filePath);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create-folder')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a folder' })
  async createFolder(
    @Body() data: FilePathDto,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'create',
        message: `建立資料夾: ${data.filePath}`,
        ip: req.ip,
      });

      return await this.fileService.createFolder(data);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upload')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload files' })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: FilePathDto,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'create',
        message: `上傳檔案: ${data.filePath}`,
        ip: req.ip,
      });

      return await this.fileService.uploadFiles(files, data.filePath);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('member/upload')
  // @UseGuards(JwtMemberGuard)
  @ApiExcludeEndpoint() // swagger ignore this endpoint
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upload a file for member',
    description: `用 formData 並且將檔案名稱編碼後再上傳 <br>
    <h3>範例:</h3>
    <pre><code>const formData = new FormData();
    formData.append('filePath', filePath);
    const encodedFileName = encodeURIComponent(file.name);
    const blob = new Blob([file], { type: file.type });
    const newFile = new File([blob], encodedFileName, { type: file.type });
    formData.append('file', newFile);</code></pre>`,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileForMember(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: FilePathDto,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      return await this.fileService.uploadAFile(
        file,
        data.filePath,
        req.member.sub,
      );
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('download/:filePath')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Download a file' })
  async downloadFile(
    @Param('filePath') filePath: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const file = await this.fileService.getFile(filePath);

      res.setHeader('Content-Type', file.mimeType);
      res.setHeader('Content-Disposition', 'attachment');

      res.send(file.file);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('move')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Move a file' })
  async moveFile(
    @Body() data: FilePathDto,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'update',
        message: `移動檔案: ${data.oldPath} -> ${data.filePath}`,
        ip: req.ip,
      });

      return await this.fileService.moveFile(data);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('rename')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rename a file' })
  async renameFile(
    @Body() data: FilePathDto,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'update',
        message: `重新命名檔案: ${data.oldPath} -> ${data.filePath}`,
        ip: req.ip,
      });

      return await this.fileService.renameFile(data);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('copy')
  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Copy files' })
  async copyFiles(
    @Body() data: any,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    try {
      this.auditLogService.createAdminAuditLog({
        admin_id: req.admin.sub,
        action: 'update',
        message: `複製或剪下檔案: ${data.files.map((item: FilePathDto) => item.filePath).join(', ')}`,
        ip: req.ip,
      });

      return await this.fileService.copyFiles(data);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
