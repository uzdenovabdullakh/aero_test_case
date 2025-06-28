import fileService from '@/services/file.service';
import { AuthRequest } from '@/types/auth-request.type';
import { extractErrorMessage } from '@/utils/helpers';
import { Response } from 'express';

class FileController {
  async uploadFile(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }
      const file = await fileService.uploadFile(req.user?.id, req.file);
      res.json(file);
    } catch (error) {
      res.status(400).json({ message: extractErrorMessage(error) });
    }
  }

  async getFileList(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const listSize = parseInt(req.query.list_size as string) || 10;
      const result = await fileService.getFileList(req.user?.id, page, listSize);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async getFileInfo(req: AuthRequest, res: Response) {
    try {
      const fileId = parseInt(req.params.id);
      const file = await fileService.getFileInfo(req.user?.id, fileId);
      if (!file) {
        res.status(404).json({ message: 'File not found' });
      }
      res.json(file);
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async downloadFile(req: AuthRequest, res: Response) {
    try {
      const fileId = parseInt(req.params.id);
      const file = await fileService.downloadFile(req.user?.id, fileId);
      if (!file) {
        res.status(404).json({ message: 'File not found' });
      }
      res.download(file.path);
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }

  async updateFile(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }
      const fileId = parseInt(req.params.id);
      const updatedFile = await fileService.updateFile(req.user?.id, fileId, req.file);
      res.json(updatedFile);
    } catch (error) {
      res.status(400).json({ message: extractErrorMessage(error) });
    }
  }

  async deleteFile(req: AuthRequest, res: Response) {
    try {
      const fileId = parseInt(req.params.id);
      await fileService.deleteFile(req.user?.id, fileId);
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: extractErrorMessage(error) });
    }
  }
}

export default new FileController();