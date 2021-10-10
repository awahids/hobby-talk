const Users = require('../models/Users')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()


module.exports = {
    getProfile: async(req, res) => {
        const id = req.user.id
        try {
            console.log(req.user)
            const findUser = await Users.findById(id).select('name email avatar banner bio following categoryLike')
                .populate({
                    path: "threads",
                    populate: ({
                        path: "comment",
                        model: "Comments",
                        populate: ({
                            path: "reply",
                            model: "Reply",
                            populate: ({
                                path: "subReply",
                                model: "SubReply"
                            })
                        })
                    })
                })
            if (!findUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "you are not own this user"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Success Retrieved Data",
                data: findUser
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    editUser: async(req, res) => {
        const user = req.user
        const body = req.body
        const file = req.file
        try {
            console.log(req.file)
            const userFind = await Users.findById(user.id);
            if (!userFind) {
                return res.status(401).json({ msg: "You Don't Owe This User" });
            }
            userFind.name = body.name ? body.name : userFind.name
            userFind.password = body.password ? body.password : userFind.password
            userFind.avatar = file.path ? file.path : userFind.avatar
            userFind.bio = body.bio ? body.bio : userFind.bio

            await userFind.save()
            return res.status(200).json({
                status: "success",
                message: "success edit profile"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    editBanner: async(req, res) => {
        const user = req.user
        const body = req.body
        const file = req.file
        try {
            console.log(req.file)
            const userFind = await Users.findById(user.id);
            if (!userFind) {
                return res.status(401).json({ msg: "You Don't Owe This User" });
            }
            userFind.banner = file.path ? file.path : userFind.banner
            await userFind.save()
            return res.status(200).json({
                status: "success",
                message: "success edit banner"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },
    getOneUser: async(req, res) => {
        const id = req.params.id
        try {
            const getOne = await Users.findById(id).populate('threads')
            if (!getOne) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find user"
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Success Retrieved Data",
                data: getOne
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    }
}