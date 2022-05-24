import morgan, { StreamOptions } from "morgan";
import Logger from "../logger/logger";

const stream: StreamOptions = {
  // Use the http severity
  write: (message: any) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "test";
  return env !== "test";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms ",
  { stream, skip }
  // { stream }
);

export default morganMiddleware;