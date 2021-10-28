import { Schema,model } from "mongoose";

const gameSchema = new Schema ({
    name:String,
    description:String,
    category:String,
    year:Number,
    imgUrl:String,
},{
    timestamps:true,
    versionKey:false
})

export default model('Game', gameSchema);
