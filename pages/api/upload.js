import nextConnect from "next-connect";
import multer from "multer";
import { join } from "path";

const upload = multer({ dest: "./public/uploads/" });
const apiRoute = nextConnect();
apiRoute.use(upload.single("file"));
apiRoute.post((req,res) => {
  if (!req.file) return res.status(400).json({ error: "Fichier manquant" });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});
export default apiRoute;
export const config = { api: { bodyParser: false } };

