import 'dotenv/config'
import multer from 'multer';
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { loginValidation, registerValidation, testCreateValidation } from './validations.js'
import { UserController, TestController, ScoreController } from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'


mongoose
    .connect('mongodb+srv://mything228:PVuBTPRHv4zQ9DZu@cluster0.6kuummj.mongodb.net/TestCompanyDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

// authentication

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
})

// CRUD tests

app.get('/tests', TestController.getAllTests)
app.get('/tests/:id', TestController.getOneTest)
app.post(
    '/tests',
    checkAuth,
    testCreateValidation,
    handleValidationErrors,
    TestController.createTest
)
app.delete('/tests/:id', checkAuth, TestController.removeTest)
app.patch(
    '/tests/:id',
    checkAuth,
    testCreateValidation,
    handleValidationErrors,
    TestController.updateTest
);

// Scores

app.get(
    '/scores',
    ScoreController.getAllScores
)
app.get(
    '/scores/tests/:testId',
    ScoreController.getScoreByTestId
)
app.get(
    '/scores/users/:userId',
    ScoreController.getScoreByUserId
)
app.get(
    '/scores/user',
    checkAuth,
    ScoreController.getMyScores
)
app.post(
    '/scores/:testId',
    checkAuth,
    ScoreController.createScore
)



app.listen(process.env.PORT, (err)=>{
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})