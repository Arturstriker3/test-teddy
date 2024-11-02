import { z } from "zod";

export const zodValidationError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const extraFieldsError = error.errors.find((err) =>
      err.message.startsWith("Unrecognized key(s)")
    );
    if (extraFieldsError) {
      return {
        message: "Validation failed",
        error: {
          field: "Extra fields provided",
          message: `Unrecognized key in object: ${extraFieldsError.message.replace(
            "Unrecognized key(s) in object: ",
            ""
          )}`,
        },
      };
    }

    const firstFieldError = error.errors.find(
      (err) => !err.message.startsWith("Unrecognized key(s)")
    );
    if (firstFieldError) {
      return {
        message: "Validation failed",
        error: {
          field: firstFieldError.path.join("."),
          message: firstFieldError.message,
        },
      };
    }
  }
  return null;
};
