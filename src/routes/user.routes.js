import { Router } from "express";
const router = Router();
import * as userCtrl from "../controllers/user.controller";
import { authjwt,verifySingup } from "../middlewares";

router.post('/',[authjwt.verifyToken,authjwt.isAdmin,verifySingup.checkRolesExisted],userCtrl.createUser)

export default router;