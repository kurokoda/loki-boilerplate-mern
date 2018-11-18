import robots from "robots.txt";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import path from "path";
import Loadable from "react-loadable";
import dotenv from "dotenv";
import loader from "./loader";

const app = express();
const PORT = process.env.PORT || 5000;

/* Dotenv
 *
 * Dotenv is a zero-dependency module that loads environment variables from a
 * .env file into process.env. We use it for convenice when running the application
 */

dotenv.config();

/* Middleware
 *
 * Middleware functions are functions that have access to the request object
 * (req), the response object (res), and the next middleware function in the
 * application’s request-response cycle.
 */

app.set("etag", false);

app.use(robots(path.join(__dirname, "/data/robots.txt")));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../build"), { etag: false }));
app.use(express.Router().get("/", loader)); // Set up homepage with loader
app.use(loader); // Loader captures all other page requests

/* Loadable
 *
 * React-loadable is a higher order component for loading components with dynamic
 * imports. We use it for code splitting on both the client and the server.
 *
 * https://github.com/jamiebuilds/react-loadable
 */

Loadable.preloadAll()
  .then(() => {
    app.listen(PORT, console.log(`App listening on port ${PORT}!`)); // eslint-disable-line no-console
  })
  .catch(error => {
    console.error(error);
  });

/* Errors
 *
 * Server errors are handled here
 */

app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`); // eslint-disable-line no-console
      process.exit(1);
      break;
    default:
      throw error;
  }
});
