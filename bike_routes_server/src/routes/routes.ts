import { Router } from "express";
import multer from "multer";
import { uploadRouteFile, downloadRouteFile } from "../controllers/routesController";

const router = Router();
const upload = multer(); // Multer setup for handling file uploads

router.post("/", upload.single("routeFile"), uploadRouteFile);
router.get("/", downloadRouteFile);

export default router;
