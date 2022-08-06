import express, { Express } from "express";
import { Server, createServer } from "http";
import {
  userRouter,
  planRouter,
  planDetailRouter,
  shareRouter,
  likeRouter,
} from "./routers";
import cors from "cors";
import passport from "passport";
import passportConfig from "./passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileStore from "session-file-store";
import { errorHandler } from "./middlewares";
import "dotenv/config";
import { isAuthenticated } from "./passport/isAuthenticate";

const sessionStore = fileStore(session);

class App {
  public app: Express;

  public server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.init();
  }

  init() {
    this.app.use(
      cors({
        origin: "http://kdt-sw2-seoul-team05.elicecoding.com",
        credentials: true,
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: "#$%FGFersf@!#<<SDfis&&ghkf",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60 * 60 * 1000,
        },
        store: new sessionStore(),
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passportConfig();
    this.app.use("/users", userRouter);
    this.app.use("/plans", isAuthenticated, planRouter);
    this.app.use("/planDetails", isAuthenticated, planDetailRouter);
    this.app.use("/shares", isAuthenticated, shareRouter);
    this.app.use("/likes", isAuthenticated, likeRouter);
    this.app.use(errorHandler);
  }
}

export default new App();
