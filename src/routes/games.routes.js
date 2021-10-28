import { Router } from "express";
import * as gamesCtrl from '../controllers/games.controller';
import { authjwt } from "../middlewares";
const router = Router();

router.get('/',gamesCtrl.getGames);
router.get('/:gameid',gamesCtrl.getGameById);
router.post('/',[authjwt.verifyToken, authjwt.isModerator] ,gamesCtrl.Creategame);
router.put('/:gameid',[authjwt.verifyToken, authjwt.isModerator],gamesCtrl.UpdateGameById);
router.delete('/:gameid',[authjwt.verifyToken, authjwt.isAdmin],gamesCtrl.DeleteGameById);

export default router;