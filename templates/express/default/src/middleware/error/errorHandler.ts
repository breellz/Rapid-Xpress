import { errorCodes } from "./errorCodes";

export const errorHandler = (err, req, res, next) => {
  const code = (err && err.code) || null;
  const error = errorCodes[code] || errorCodes["INTERNAL_ERROR"];
  res.status(error.statusCode).json({ message: error.message });
};

