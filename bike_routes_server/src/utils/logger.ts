
export const Logger = {
    logError: (message: string): void => {
      console.error(`[Error]: ${message}`);
    },
    logInfo: (message: string): void => {
      console.info(`[Info]: ${message}`);
    },
    logWarn: (message: string): void => {
      console.warn(`[Warn]: ${message}`);
    }
  };
  