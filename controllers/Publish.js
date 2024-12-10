import { MQTTService } from "../service/mqttService.js";
import Sala from "../models/SalaModel.js";

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://192.168.18.81:1883";

// CODIGO ANTIGO - EU (HARI) REFIZ.
// const updateSala = async function (lockId, lockState) {
//   try {
//     const sala = await Sala.findOne({
//       where: {
//         numero: lockId,
//       },
//     });
//     // if (!sala) return res.status(404).json({ msg: "Data not found" });
//     if (!sala) return { error: "Data not found" };
//     const status = lockState;
//     if (sala.status !== undefined) {
//       await Sala.update(
//         { status },
//         {
//           where: {
//             id: sala.id,
//           },
//         }
//       );
//       // res.status(200).json({ msg: "Sala updated successfully" });
//       console.log("Sala updated");
//       return { success: true };
//     } else {
//       // res.status(400).json({ msg: "Invalid sala status" });
//     }
//   } catch (error) {
//     // res.status(500).json({ msg: error.message });
//     // console.log(error);
//     return { error: error.message };
//   }
// };

const updateSala = async function (lockId, lockState) {
  try {
    console.log(`Searching for sala with numero: ${lockId}`);
    const sala = await Sala.findOne({
      where: { numero: lockId },
    });

    if (!sala) {
      console.error("No sala found");
      return { error: "Data not found" };
    }

    console.log(`Sala found: ${JSON.stringify(sala)}`);
    if (sala.status !== lockState) {
      await Sala.update({ status: lockState }, { where: { id: sala.id } });
      console.log(`Sala updated successfully: ${lockId} -> ${lockState}`);
      return { success: true };
    }

    console.log("Sala status is already up-to-date");
    return { success: false };
  } catch (error) {
    console.error("Error updating sala:", error.message);
    return { error: error.message };
  }
};

// CODIGO ANTIGO - EU (HARI) REFIZ
// const messageCallback = async (topic, message) => {
//   const command = message.toString();
//   let piece = 0;
//   var lockId = "";
//   var lockState = "";
//   for (var i = 0; i < command.length; i++) {
//     if (command[i] != "-" && piece === 0) {
//       lockId += command[i];
//     } else if (command[i] != "-" && piece === 1) {
//       if (command[i] === "O") {
//         lockState = "ativo";
//       } else {
//         lockState = "inativo";
//       }
//     } else {
//       piece = 1;
//     }
//   }
//   await updateSala(lockId, lockState);
// };

const messageCallback = async (topic, message) => {
  try {
    const command = message.toString();
    console.log(
      `Received MQTT Message: Topic = ${topic}, Message = ${command}`
    );

    let lockId = "";
    let lockState = "";

    const parts = command.split("-");
    if (parts.length === 2) {
      lockId = parts[0];
      lockState = parts[1] === "O" ? "ativo" : "inativo";
    } else {
      console.error("Invalid message format");
      return;
    }

    console.log(`Lock ID: ${lockId}, Lock State: ${lockState}`);
    const result = await updateSala(lockId, lockState);
    console.log(`Update Result: ${JSON.stringify(result)}`);

    if (result.error) {
      console.error(`Error updating sala: ${result.error}`);
    } else {
      console.log("Sala updated successfully");
    }
  } catch (err) {
    console.error("Error in messageCallback:", err.message);
  }
};

var mqttClient = new MQTTService(MQTT_HOST_NAME, messageCallback);
mqttClient.connect();
mqttClient.subscribe("locksPong");

export const getPublisherPage = async function (req, res) {
  try {
    res.render("pages/publisher");
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

export const publishMQTTMessage = async function (req, res) {
  try {
    const { topic, message } = req.body;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    const sala = await Sala.findOne({
      attributes: ["status"],
      where: { numero: message },
    });

    if (!sala) {
      return res.status(404).json({ status: 404, message: "Room not found" });
    }

    mqttClient.publish(topic, message);

    console.log(`Sala no banco :: ${sala}`);

    const maxAttempts = 4;
    let attempt = 0;
    let delay = 500;
    let novoStatus = sala;

    while (attempt < maxAttempts) {
      await sleep(delay);
      novoStatus = await Sala.findOne({
        attributes: ["status"],
        where: { numero: message },
      });

      if (novoStatus.status !== sala.status) {
        return res
          .status(200)
          .json({ status: "200", message: "Successfully status changed" });
      }

      attempt++;
      delay *= 2;
    }

    return res
      .status(400)
      .json({ status: 400, message: "Status did not change after attempts" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}