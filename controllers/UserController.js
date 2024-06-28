import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from "../models/User.js";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            roles: req.body.roles
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )
        
        const {passwordHash, ...userData} = user._doc;
        
        res.status(200).json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Can`t register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        
        if(!isValidPass){
            return res.status(400).json({
                message: 'Login or pass is incorrect'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({
            ...userData,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Can`t authenticate'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404),json({
                message: 'User not found'
            })
        }

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json(userData);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Can`t access'
        })
    }
}

// export const logout = async (req, res) => {
//     try {
//         req.headers.authorization = '';
        
//         req.cookies = ''

//         // const user = await UserModel.findOne({email: req.body.email});

//         // if(!user){
//         //     return res.status(404).json({
//         //         message: 'User not found'
//         //     })
//         // }

//         // const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        
//         // if(!isValidPass){
//         //     return res.status(400).json({
//         //         message: 'Login or pass is incorrect'
//         //     })
//         // }

//         // const token = jwt.sign(
//         //     {
//         //         _id: user._id,
//         //     },
//         //     process.env.JWT_SECRET_KEY,
//         //     {
//         //         expiresIn: '30d'
//         //     }
//         // )

//         // const {passwordHash, ...userData} = user._doc;

//         res.status(200).json({
//             // ...userData,
//             // token
//             success: true
//         });

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message:'Can`t authenticate'
//         })
//     }
// }