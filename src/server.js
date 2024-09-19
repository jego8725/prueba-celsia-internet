import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { listRoutes } from "./routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.use(listRoutes);

export { app };