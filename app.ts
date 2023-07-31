import express, { Application } from "express";
import logger from "morgan";
import NotFoundError from "./src/errors/notFoundError";
import routes from "./src/services/index.routes";
import errorHandler from "./src/middlewares/errorHandler";
import cors from "cors";
require("dotenv").config();

export const app: Application = express();

//CORS
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));

for (const route of routes.getData) {
	app.use(express.json({ limit: "50mb" })).use("/v1", route);
}

app.use(cors(corsOptions));

//Utility
for (const route of routes.utilityRoutes) {
	app.use(express.json({ limit: "50mb" })).use("/", route);
}

app.all("*", (req: express.Request) => {
	throw new NotFoundError(req.path);
});

//Error Handlers
app.use(errorHandler);

export default app;
