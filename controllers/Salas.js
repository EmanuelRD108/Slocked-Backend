import Sala from "../models/SalaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import SalaUser from "../models/SalaUserModel.js";

function listaSalas(lista) {
  const resposta = [];
  for (var i = 0; i < lista.length; i++) {
    resposta.push({ id: lista[i].dataValues.salaId });
  }
  return resposta;
}

export const getSalas = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Sala.findAll({
        attributes: ["id", "uuid", "name", "grupo", "numero", "status"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      const lista = await SalaUser.findAll({
        attributes: ["salaId"],
        where: {
          userId: req.userId,
        },
      });
      response = await Sala.findAll({
        attributes: ["id", "uuid", "name", "grupo", "numero", "status"],
        where: {
          [Op.or]: listaSalas(lista),
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSalaByUser = async (req, res) => {
  try {
    let response;
    const user = await User.findOne({
      attributes: [
        "id",
        "uuid",
        "name",
        "tags",
        "matricula",
        "disciplinaOUcargo",
        "email",
        "role",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      },
    });
    if (user.role === "admin") {
      response = await Sala.findAll({
        attributes: ["id", "uuid", "name", "numero", "status", "grupo"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      const lista = await SalaUser.findAll({
        attributes: ["salaId"],
        where: {
          userId: user.id,
        },
      });
      response = await Sala.findAll({
        attributes: ["id", "uuid", "name", "numero", "status", "grupo"],
        where: {
          [Op.or]: listaSalas(lista),
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSalaById = async (req, res) => {
  try {
    const sala = await Sala.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sala) return res.status(404).json({ msg: "Sala not found" });
    let response;
    if (req.role === "admin") {
      response = await Sala.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "numero",
          "status",
          "grupo",
          "createdAt",
        ],
        where: {
          id: sala.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Sala.findOne({
        attributes: ["id", "uuid", "name", "numero", "status", "grupo"],
        where: {
          [Op.and]: [{ id: sala.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSala = async (req, res) => {
  const { name, numero, status, grupo } = req.body;
  try {
    await Sala.create({
      name: name,
      numero: numero,
      status: status,
      grupo: grupo,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Sala Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSala = async (req, res) => {
  try {
    const sala = await Sala.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sala) return res.status(404).json({ msg: "Data not found" });
    const { name, numero, status, grupo } = req.body;
    if (req.role === "admin") {
      await Sala.update(
        { name, numero, status, grupo },
        {
          where: {
            id: sala.id,
          },
        }
      );
    } else {
      if (req.userId !== sala.userId)
        return res.status(403).json({ msg: "Forbidden access" });
      await Sala.update(
        { name, numero, status, grupo },
        {
          where: {
            [Op.and]: [{ id: sala.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Sala updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSala = async (req, res) => {
  try {
    const sala = await Sala.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sala) return res.status(404).json({ msg: "Data not found" });
    if (req.role === "admin") {
      await Sala.destroy({
        where: {
          id: sala.id,
        },
      });
      await SalaUser.destroy({
        where: {
          salaId: sala.id,
        },
      });
    } else {
      if (req.userId !== sala.userId)
        return res.status(403).json({ msg: "Forbidden access" });
      await Sala.destroy({
        where: {
          [Op.and]: [{ id: sala.id }, { userId: req.userId }],
        },
      });
      await SalaUser.destroy({
        where: {
          salaId: sala.id,
        },
      });
    }
    res.status(200).json({ msg: "Sala deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
