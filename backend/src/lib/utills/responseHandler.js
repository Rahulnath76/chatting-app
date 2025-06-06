import { ZodError } from "zod";

export const sendSuccess = (
  res,
  data = undefined,
  message = "Success",
  statusCode = 200
) => {
  const response = {
    success: true,
    message,
  };
  if (data !== undefined) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

export const sendError = (res, statusCode = 500, error) => {
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => err.message);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }
  return res.status(statusCode).json({
    success: false,
    message: error?.message || "Something went wrong",
  });
};
