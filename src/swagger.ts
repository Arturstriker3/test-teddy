import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import "dotenv/config";

const swaggerApp = express();

const environment = process.env.NODE_ENV || "development";
const serverUrl =
  environment === "production"
    ? `${process.env.SERVER_URL}:${process.env.PORT}`
    : `http://localhost:${process.env.PORT || "3000"}`;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test Teddy Open Finance API",
      version: "1.0.0",
      description: "API Test Teddy Open Finance documentation",
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwtAuth: [],
      },
    ],
  },
  apis: ["./src/swagger/*.ts", "./controllers/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerApp;
