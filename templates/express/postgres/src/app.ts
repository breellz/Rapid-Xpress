import "dotenv/config";
import express, { Request, Response } from "express";
import datasource from "./db/db";
import { errorHandler } from "./middleware/error/errorHandler"
import "./db/db"
import path from "path";
import { generalRateLimiter } from "./utils/rateLimiters";


export let socketApp: express.Application;


export const main = async (): Promise<express.Application> => {
  try {
    const server: express.Application = express()

    await datasource.initialize();

    server.use(express.json());
    server.use(generalRateLimiter);

    // server.use("/api/v1", apiRouter);
    const publicDirectory = path.join(__dirname, "../public");
    server.use(express.static(publicDirectory));

    server.get("/", (req: Request, res: Response) => {
      res.sendFile("index.html");
    });
    server.use(errorHandler);

    return server;
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to connect to database");
  }
};



