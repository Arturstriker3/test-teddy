export const logger = (message: string) => {
  if (process.env.LOG_LEVEL === "1") {
    console.log(message);
  }
};
