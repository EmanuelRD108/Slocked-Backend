#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

#define D32 32

// WiFi configs
const char* ssid = "EMANUEL";
const char* password = "1248163264";

// mosquitto -v -c mosquitto.conf para rodar a placa
// mosquitto_pub -h 192.168.18.81 -t locksPing -m "ARAM?"
// mosquitto_sub -h 192.168.18.81 -t locksPing
// ATENÇÃO SEMPRE CONFERIR SE O IP DA MAQUINA MUDOU ATENÇÃO

char id[] = "D16"; // (OBS.:) D18 para o ESP que n esta com a MPU soldada
boolean isOpen = false;
boolean changed = false;

// MQTT Config
const char *mqtt_broker = "192.168.18.81";
const char *serverTopic = "locksPing";
const char *pongTopic = "locksPong";
const char *mqtt_username = id;
const char *mqtt_password = "";
const int mqtt_port = 1883;

// Identifying as a client
WiFiClient espClient;
PubSubClient client(espClient);

void reconnectWiFi();
void setupWifi();
void reconnectMQTT();
void callback(char *, uint8_t *, unsigned int);
void setupMQTT();
char converter(uint8_t);
void sendPong(boolean);

void setup() {
  Serial.begin(9600);
  setupWifi();
  setupMQTT();
  pinMode(D32, OUTPUT); // (OBS.:) LED_BUILTIN em vez de D8 para o ESP que n esta com a MPU soldada
}

void loop() {
  if(WiFi.status() != WL_CONNECTED){
    reconnectWiFi();
  }
  if(!client.connected()){
    reconnectMQTT();
  }
  client.subscribe(serverTopic);

  if(changed && isOpen){
    digitalWrite(D32, HIGH); // (OBS.:) LED_BUILTIN em vez de D8 para o ESP que n esta com a MPU soldada
    changed = false;
    Serial.println("1");
  } else if(changed && !isOpen){
    digitalWrite(D32, LOW); // (OBS.:) LED_BUILTIN em vez de D8 para o ESP que n esta com a MPU soldada
    changed = false;
    Serial.println("2");
  }

  client.loop();
}

void reconnectWiFi(){
  // Starting the conection
  WiFi.begin(ssid, password);
  // Waiting conection been established
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void setupWifi(){
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  // Seting the ESP8266 as a client not an AP 
  WiFi.mode(WIFI_STA);
  reconnectWiFi();
  // Visual confirmation
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
  
}

void reconnectMQTT(){
  while(!client.connected()){
    if(client.connect("ESP8266-Receptor", mqtt_username, mqtt_password)){
      Serial.println("Conected on Broker!!");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void callback(char *topic, uint8_t *payload, unsigned int length) {
  // Callback for listen what is been published
  char *message = new char[length + 1];
  for (unsigned int i = 0; i < length; i++){
    message[i] = converter(payload[i]);
  }
  message[length] = '\0';
  Serial.println(message);
  Serial.println(id);
  Serial.println(strcmp(message, id));
  if(strcmp(message, id) == 0){
    isOpen = !isOpen;
    changed = true;
    sendPong(isOpen);
  }
  delete[] message;
}

void setupMQTT(){
  // Seting things here
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  Serial.println("Conecting to Broker...");
  
  // Enlace until conects to the broker
  reconnectMQTT();
}

char converter(uint8_t character) {
  switch (character)
  {
  case 47:
    return '/';
    break;
  case 48:
    return '0';
    break;  
  case 49:
    return '1';
    break;
  case 50:
    return '2';
    break;  
  case 51:
    return '3';
    break;
  case 52:
    return '4';
    break;  
  case 53:
    return '5';
    break;
  case 54:
    return '6';
    break;  
  case 55:
    return '7';
    break;  
  case 56:
    return '8';
    break;
  case 57:
    return '9';
    break;  
  case 65:
    return 'A';
    break;
  case 66:
    return 'B';
    break;
  case 67:
    return 'C';
    break;
  case 68:
    return 'D';
    break;
  case 69:
    return 'E';
    break;
  case 70:
    return 'F';
    break;
  case 71:
    return 'G';
    break;
  case 72:
    return 'H';
    break;
  case 73:
    return 'I';
    break;
  case 74:
    return 'J';
    break;
  case 75:
    return 'K';
    break;
  case 76:
    return 'L';
    break;
  case 77:
    return 'M';
    break;
  case 78:
    return 'N';
    break;
  case 79:
    return 'O';
    break;
  case 80:
    return 'P';
    break;
  case 81:
    return 'Q';
    break;
  case 82:
    return 'R';
    break;
  case 83:
    return 'S';
    break;
  case 84:
    return 'T';
    break;
  case 85:
    return 'U';
    break;
  case 86:
    return 'V';
    break;
  case 87:
    return 'W';
    break;
  case 88:
    return 'X';
    break;
  case 89:
    return 'Y';
    break;
  case 90:
    return 'Z';
    break;
  default:
    return '!';
    break;
  }
}

void sendPong(boolean open){
  if(open){
    Serial.println("Abrida");
    client.publish(pongTopic, "D16-O");
  } else {
    Serial.println("Fechada");
    client.publish(pongTopic, "D16-C");
  }
}