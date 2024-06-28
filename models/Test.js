import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    questionsText: {
        type: Array,
        required: true,
    },
    answersValues: {
        type: Array,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completionTime:{
        type: Number,   
        required: true,
    },
    imageUrl: Array,
},{
    timestamps: true,
});

export default mongoose.model('Test', TestSchema)


// {
//     "title": "Test 3",
//     "questionsText": ["Question 1 info", "Question 2 info"]
//     "content":[
//         {
//             "questionsText": "Question 1 info",
//             "answersValue": [
//                 {
//                     "text": "Answer 1",
//                     "value": 0
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 1
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 0
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 1
//                 }
//             ]
//         },
//         {
//             "questionsText": "Question 2 info",
//             "answersValue": [
//                 {
//                     "text": "Answer 1",
//                     "value": 0
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 1
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 0
//                 },
//                 {
//                     "text": "Answer 1",
//                     "value": 1
//                 }
//             ]
//         }
//     ]
// }