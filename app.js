import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";
import { connectToServer } from "./middlewares/mongodb.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import path from "path";
import parkingsRoutes from "./routes/parkingsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config({
  override: true,
  path: path.resolve("./.env"),
});

// connect to DB
connectToServer();

// create Express app
const app = express();
app.use(express.json({ limit: "50mb" }));

// SWAGGER DOCUMENTATION
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SCOOTI BACKEND API",
      version: "1.0.0",
      description: "SCOTTI BACKEND Express App Documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Enter your Bearer in Format **Bearer &lt;token>**",
        },
      },
    },
  },

  apis: ["./documentation/*.js"],
};
const specs = swaggerJsDoc(options);

// SERVE THE DOCUMENTATION on /api-docs
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, {
    customSiteTitle: "SCOOTI API",
    customCss: `.swagger-ui .topbar {
      display: none;} body {
      padding:50px;
      border:100px #1B4965 solid;
      border-left:50px #1B4965 solid;
      border-right:50px #1B4965 solid;
    } 
    } `,
  })
);

// hello world
app.get("/hello", (req, res) => res.json({ message: "hello world" }));

// Parkings routes
app.use("/parkings", parkingsRoutes);

// Users routes
app.use("/users", usersRoutes);

// CONTACT
app.use("/contact", contactRoutes);

// HANDLE UNDEFINED ROUTES AND ERRORS
app.use(notFound);
app.use(errorHandler);

// SERVER LISTEN
const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
