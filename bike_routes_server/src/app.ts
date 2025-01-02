import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import sampleRoutes from "./routes/sampleRoutes";
import routes from "./routes/routes";
import * as swaggerDocument from "../swagger/swagger.json"; // Import the Swagger spec


config(); // Load environment variables

const app: Application = express();

// Enable CORS
app.use(
    cors({
        origin: "*", // Allow requests from any origin
    //   origin: "http://localhost:3001", // Allow requests from this domain
    })
  );

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use("/api/v1/sample", sampleRoutes);
app.use("/api/v1/routes", routes);

export default app;