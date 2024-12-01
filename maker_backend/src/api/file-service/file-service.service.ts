import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as moment from 'moment-timezone';
import * as mime from 'mime-types';
import * as archiver from 'archiver';
import { FileDto } from './dto/file.dto';
import { FilePathDto } from './dto/file-path.dto';

@Injectable()
export class FileServiceService {
  constructor() {}

  private readonly apiVersion = '1';

  /**
   * Get file list
   * @returns
   */
  async getFileList(filePath: string): Promise<FileDto[]> {
    try {
      const originalPath = filePath;
      const readdir = util.promisify(fs.readdir);
      const stat = util.promisify(fs.stat);
      let directoryPath = '';
      directoryPath = `./storage/files/${filePath}`;
      const files = await readdir(directoryPath);

      const fileList = await Promise.all(
        files.map(async (file) => {
          const filePath = `${directoryPath}/${file}`;
          const fileInfo = await stat(filePath);
          const modDate = moment(fileInfo.mtime).tz('Asia/Taipei').format();
          const mimeType = mime.lookup(filePath) || 'application/octet-stream';
          if (mimeType.includes('image')) {
            const encodedOriginalPath = encodeURIComponent(originalPath);
            const encodedFile = encodeURIComponent(file);
            return {
              id: fileInfo.ino,
              name: file,
              isDir: fileInfo.isDirectory(),
              size: fileInfo.size,
              modDate: modDate,
              thumbnail: `${process.env.APP_URL}/api/v${this.apiVersion}/file-service/${encodedOriginalPath}%2F${encodedFile}`,
            };
          }

          return {
            id: fileInfo.ino,
            name: file,
            isDir: fileInfo.isDirectory(),
            size: fileInfo.size,
            modDate: modDate,
          };
        }),
      );

      return fileList;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a file
   * @returns
   */
  async getFile(filePath: string): Promise<{ file: Buffer; mimeType: string }> {
    try {
      const readFile = util.promisify(fs.readFile);
      const file = await readFile(`./storage/files/${filePath}`);
      const mimeType =
        mime.lookup(`./storage/files/${filePath}`) ||
        'application/octet-stream';
      return { file, mimeType };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Delete a file
   * @returns
   */
  async deleteFile(filePath: string): Promise<{ message: string }> {
    try {
      const rm = util.promisify(fs.rm);
      await rm(`./storage/files/${filePath}`, { recursive: true });
      return { message: '檔案已刪除' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Create a folder
   * @returns
   */
  async createFolder(data: FilePathDto): Promise<any> {
    try {
      const mkdir = util.promisify(fs.mkdir);
      const exists = util.promisify(fs.exists);
      const isExists = await exists(`./storage/files/${data.filePath}`);
      if (isExists) {
        throw new BadRequestException('資料夾已存在');
      }
      await mkdir(`./storage/files/${data.filePath}`);
      return { message: 'Folder created' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Upload files
   * @returns
   */
  async uploadFiles(
    files: Array<Express.Multer.File>,
    filePath: string,
  ): Promise<any> {
    try {
      console.log(files, filePath);
      files.forEach(async (file) => {
        const encodedFileName = decodeURIComponent(file.originalname);
        const path = `./storage/files/${filePath}/${encodedFileName}`;

        fs.writeFileSync(path, file.buffer);
      });
      return { message: 'File uploaded' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Upload a file
   * @returns
   */
  async uploadAFile(
    file: Express.Multer.File,
    filePath: string,
    memberId: number,
  ): Promise<any> {
    try {
      const maxSize = 1024 * 1024 * 10;
      if (file.size > maxSize) {
        throw new BadRequestException('檔案大小超過 10MB');
      }

      const encodedFileName = decodeURIComponent(file.originalname);
      const path = `./storage/files/members/${memberId}/${filePath}/${encodedFileName}`;

      fs.mkdirSync(`./storage/files/members/${memberId}/${filePath}`, {
        recursive: true,
      });
      fs.writeFileSync(path, file.buffer);

      const filepath = encodeURIComponent(path.replace('./storage/files/', ''));

      return {
        message: 'File uploaded',
        path: `${process.env.APP_URL}/api/v${this.apiVersion}/file-service/${filepath}`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Download files
   * @returns
   */
  async downloadFiles(
    filePath: string[],
  ): Promise<{ file: Buffer; mimeType: string }[]> {
    try {
      const files = [];
      if (filePath.length === 1) {
        const file = await this.getFile(filePath[0]);
        files.push(file);
      } else {
        filePath.forEach(async (path) => {
          const file = await this.getFile(path);
          files.push(file);
        });
      }

      return files;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Move a file
   * @returns
   */
  async moveFile(data: FilePathDto): Promise<any> {
    try {
      const rename = util.promisify(fs.rename);
      await rename(
        `./storage/files/${data.oldPath}`,
        `./storage/files/${data.filePath}`,
      );
      return { message: 'File moved' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Rename a file
   * @returns
   */
  async renameFile(data: FilePathDto): Promise<any> {
    try {
      const rename = util.promisify(fs.rename);
      const exists = util.promisify(fs.exists);
      const isExists = await exists(`./storage/files/${data.filePath}`);
      if (isExists) {
        throw new BadRequestException('檔名已存在');
      }
      await rename(
        `./storage/files/${data.oldPath}`,
        `./storage/files/${data.filePath}`,
      );
      return { message: 'File renamed' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * copy files
   * @returns
   */
  async copyFiles(data: any): Promise<any> {
    try {
      const copyFile = util.promisify(fs.copyFile);
      const exists = util.promisify(fs.exists);
      data.files.forEach(async (file: FilePathDto) => {
        let isExists = await exists(`./storage/files/${file.filePath}`);
        while (isExists) {
          const split = file.filePath.split('.');
          file.filePath = `${split[0]} copy.${split[1]}`;
          isExists = await exists(`./storage/files/${file.filePath}`);
        }
        await copyFile(
          `./storage/files/${file.oldPath}`,
          `./storage/files/${file.filePath}`,
        );

        if (file.action === 'cut') {
          const rm = util.promisify(fs.rm);
          await rm(`./storage/files/${file.oldPath}`, {
            recursive: true,
          });
        }
      });
      return { message: 'Files pasted' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
