import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import FileController from '../controllers/file.controller';
import multer from 'multer';

const upload = multer();
const fileRouter = Router();

fileRouter.use(authMiddleware);

fileRouter.post('/upload', upload.single('file'), FileController.uploadFile);
fileRouter.get('/list', FileController.getFileList);
fileRouter.get('/:id', FileController.getFileInfo);
fileRouter.get('/download/:id', FileController.downloadFile);
fileRouter.put('/update/:id', upload.single('file'), FileController.updateFile);
fileRouter.delete('/delete/:id', FileController.deleteFile);

export default fileRouter;