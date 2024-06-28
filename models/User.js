import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    roles: {
        User:{
            type: Number,
            default: 2001
        },
        Teacher: Number,
        Admin: Number
    }
},{
    timestamps: true,
});

export default mongoose.model('User', UserSchema)