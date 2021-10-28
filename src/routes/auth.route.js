import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller"
import { verifySingup } from "../middlewares";
router.post('/signin',authCtrl.singIn)
router.post('/signup',[verifySingup.checkRolesExisted,verifySingup.checkduplicateMailOrName],authCtrl.singUp) 

export default router;