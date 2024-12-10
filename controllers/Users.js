import User from "../models/UserModel.js";
import argon2 from "argon2";
import SalaUser from "../models/SalaUserModel.js";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes:['id','uuid','name','tags','matricula','disciplinaOUcargo','email','role', 'createdAt']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['id', 'uuid','name','tags','matricula','disciplinaOUcargo','email','role', 'createdAt'],
            where: {
                uuid: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
          } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {name,tags, matricula, disciplinaOUcargo, email, password, confPassword, role} = req.body;
    if(password == "") return res.status(400).json({msg: "Password undefined"});
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            tags:tags,
            matricula:matricula,
            disciplinaOUcargo:disciplinaOUcargo,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Successful Registration"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    const {name,tags, matricula, disciplinaOUcargo, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password don't match"});
    try {
        await User.update({
            name: name,
            tags:tags,
            matricula:matricula,
            disciplinaOUcargo:disciplinaOUcargo,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        await SalaUser.destroy({
            where:{
                userId: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}