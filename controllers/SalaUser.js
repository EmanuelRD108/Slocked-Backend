import Sala from "../models/SalaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import SalaUser from "../models/SalaUserModel.js";


export const createSalaUser = async(req, res) =>{
    const {salaId, userId} = req.body;
    try {
        await SalaUser.create({
            salaId: salaId,
            userId: userId
        });
        res.status(201).json({msg: "Sala Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGroupSalaUser = async(req, res) =>{
    const {grupo, userId} = req.body;
    try {
        const response = await Sala.findAll({
            attributes:['id'],
            where: {
                grupo: grupo
            }
        });
        for(let i = 0; i < response.length; i++){
            await SalaUser.create({
                salaId: response[i].id,
                userId: userId
            });
        }
        res.status(201).json({msg: "Sala Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSalaUser = async(req, res) =>{
    try {
        const sala = await Sala.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!sala) return res.status(404).json({msg: "Data not found"});
        if(req.role === "admin"){
            await SalaUser.destroy({
                where:{
                    [Op.and]: [{salaId: sala.id}, {userId: req.body.userId}]
                }
            });
        } else{
            if(req.userId !== sala.userId) {
                return res.status(403).json({msg: "Forbidden access"})
            };
        };

        res.status(200).json({msg: "Access denied successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteUserSala = async(req, res) =>{
    try {
        const user = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "Data not found"});

        if(req.role === "admin"){
            await SalaUser.destroy({
                where:{
                    [Op.and]: [{salaId: req.body.salaId}, {userId: user.id}] 
                }
            });
        }else{
            if(req.userId !== user.userId) return res.status(403).json({msg: "Forbidden access"});
        }
        res.status(200).json({msg: "Access denied successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}