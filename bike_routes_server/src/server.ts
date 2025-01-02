import app from "./app";
import { Logger } from "./utils/logger";

// Load environment variables
const PORT = process.env.PORT;
if (!PORT) {
  console.error("No PORT specified in .env file");
  process.exit(1);
}

app.listen(PORT, () => {
  Logger.logInfo(`Server is running on http://localhost:${PORT}`);
  Logger.logInfo(`Swagger is running on http://localhost:${PORT}/api-docs`);
});
