import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    test:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    score:{
        type: Number,
        required: true,
    }
},{
    timestamps: true,
});

export default mongoose.model('Score', ScoreSchema)