// src/utils/logger.js
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

const logMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = logMiddleware;
