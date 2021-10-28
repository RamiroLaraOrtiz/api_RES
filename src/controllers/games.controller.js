import Games from '../models/game'
export const getGames = async(req,res) => {
    const games = await Games.find();
    res.json(games);
}

export const getGameById = async(req,res) => {
   const game = await Games.findById(req.params.gameid);
   res.status(200).json(game);
}

export const Creategame = async (req,res) => {
  const {name,description,category,year,imgUrl} = req.body;

  const newGame = new Games({name,description,category,year,imgUrl });

  const productSaved = await newGame.save();

  res.status(201).json(productSaved); 
    
}

export const UpdateGameById = async(req,res) => {
   const updateGame = await Games.findByIdAndUpdate(req.params.gameid,req.body,{new:true});
   res.status(200).json(updateGame)
}

export const DeleteGameById = async(req,res) => {
    const gameDelete = await Games.findByIdAndDelete(req.params.gameid)
    res.status(200).json(gameDelete);
}