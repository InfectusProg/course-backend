import TestModel from "../models/Test.js";

export const getAllTests = async (req, res) => {
    try {
        const tests = await TestModel.find();

        res.json(tests);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find tests'
        })
    }
}

export const getOneTest = async (req, res) => {
    try {
        const testId = req.params.id;

        TestModel.findById(testId).then((doc, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Can`t find test'
                }) 
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Test is not found'
                })
            }

            res.json(doc)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t find the test'
        })
    }
}

export const removeTest = async (req, res) => {
    try {
        const testId = req.params.id;

        TestModel.findByIdAndDelete(
            {
                _id: testId,
            }
        ).then((doc, err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Can`t delete test'
                }) 
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Test is not found'
                })
            }

            res.json({
                success: true
            }) 
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t delete the test'
        })
    }
}

export const createTest = async (req, res) => {
    try {
        const doc = new TestModel({
            title: req.body.title,
            questionsText: req.body.questionsText,
            answersValues: req.body.answersValues,
            completionTime: req.body.completionTime,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })

        const test = await doc.save();

        res.json(test);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t create a test'
        })
    }
}

export const updateTest = async (req, res) => {
    try {
        const testId = req.params.id;

        await TestModel.updateOne(
            {
                _id: testId,
            },
            {
                title: req.body.title,
                questionsText:req.body.questionsText,
                answersValues:req.body.answersValues,
                completionTime: req.body.completionTime,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            },
        )
        res.json({
            success: true
        }) 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Can`t update the test'
        })
    }
}