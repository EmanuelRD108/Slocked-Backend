import mqtt from "mqtt";

export class MQTTService {
  constructor(host, messageCallback) {
    this.mqttClient = null;
    this.host = host;
    this.messageCallback = messageCallback;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host);

    // MQTT Callback for 'error' event
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // MQTT Callback for 'connect' event
    this.mqttClient.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    this.mqttClient.on("message", this.messageCallback);

    this.mqttClient.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  publish(topic, message, options) {
    if (!this.mqttClient || !this.mqttClient.connected) {
      console.error("MQTT client is not connected. Cannot publish message.");
      return;
    }
    this.mqttClient.publish(topic, message, options);
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }
}
