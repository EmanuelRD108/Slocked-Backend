import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import SalaUserRoute from "./routes/SalaUserRoute.js";
import SalaRoute from "./routes/SalaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import subscriberRouter from "./routes/Subscriber.js";
import publisherRouter from "./routes/Publisher.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

//  sincronizar banco
(async () => {
  await db.sync();
})();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESS_SECRET,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(SalaUserRoute);
app.use(SalaRoute);
app.use(AuthRoute);

app.use("/subscriber", subscriberRouter);
app.use(publisherRouter);

////iniciar uma seção sempre que for usar
store.sync();

/* mqtt */
//require('./mqtt');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running... ${PORT}`);
});
