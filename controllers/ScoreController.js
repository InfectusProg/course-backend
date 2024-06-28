import ScoreModel from "../models/Score.js";

export const getAllScores = async (req, res) => {
    try {
        const scores = await ScoreModel.find();

        res.json(scores);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find scores'
        })
    }
}

export const getScoreByTestId = async (req, res) => {
    try {
        const scores = (await ScoreModel.find()).filter(score => {
            return score.test.toString() === req.params.testId
        });

        res.json(scores);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find scores'
        })
    }
}

export const getScoreByUserId = async (req, res) => {
    try {
        const scores = (await ScoreModel.find()).filter(score => 
            {
                return score.user.toString() === req.params.userId
            }
        );

        res.json(scores);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find scores'
        })
    }
}

export const getMyScores = async (req, res) => {
    try {
        const scores = (await ScoreModel.find()).filter(score => 
            {
                return score.user.toString() === req.userId
            }
        );

        res.json(scores);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find scores'
        })
    }
}

export const createScore = async (req, res) => {
    try {
        const doc = new ScoreModel({
            user: req.userId,
            test:req.params.testId,
            score:req.body.score,
            imageUrl: req.body.imageUrl,
        })

        const scoreRecord = await doc.save();

        res.json(scoreRecord);  
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t create a score'
        })
    }
}