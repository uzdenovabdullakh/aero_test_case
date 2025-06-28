import { File } from '../models/file.model';
import fs from 'fs/promises';
import path from 'path';

class FileService {
  async uploadFile(userId: string, file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '../../uploads');

    try {
      await fs.access(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);
    await fs.writeFile(filePath, file.buffer);

    const fileRecord = await File.create({
      name: path.parse(file.originalname).name,
      extension: path.parse(file.originalname).ext.substring(1),
      mimeType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
      path: filePath,
      userId,
    });

    return fileRecord;
  }

  async getFileList(userId: string, page: number = 1, listSize: number = 10) {
    const offset = (page - 1) * listSize;
    return await File.findAndCountAll({
      where: { userId },
      limit: listSize,
      offset,
    });
  }

  async getFileInfo(userId: string, fileId: number) {
    return await File.findOne({ where: { id: fileId, userId } });
  }

  async downloadFile(userId: string, fileId: number) {
    const file = await File.findOne({ where: { id: fileId, userId } });
    if (!file) {
      throw new Error('File not found');
    }
    try {
      await fs.access(file.path);
      return file;
    } catch (error) {
      throw new Error('File not found on server');
    }
  }

  async updateFile(userId: string, fileId: number, newFile: Express.Multer.File) {
    const oldFile = await File.findOne({ where: { id: fileId, userId } });
    if (!oldFile) {
      throw new Error('File not found');
    }

    try {
      await fs.unlink(oldFile.path);
    } catch (error) {
      console.warn(`Failed to delete old file: ${oldFile.path}`, error);
    }

    const filePath = path.join(path.dirname(oldFile.path), newFile.originalname);
    await fs.writeFile(filePath, newFile.buffer);

    await oldFile.update({
      name: path.parse(newFile.originalname).name,
      extension: path.parse(newFile.originalname).ext.substring(1),
      mimeType: newFile.mimetype,
      size: newFile.size,
      path: filePath,
    });

    return oldFile;
  }

  async deleteFile(userId: string, fileId: number) {
    const file = await File.findOne({ where: { id: fileId, userId } });
    if (!file) {
      throw new Error('File not found');
    }

    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.warn(`Failed to delete file: ${file.path}`, error);
    }

    await file.destroy();
  }
}

export default new FileService();