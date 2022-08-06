import "./pre-start"; // Must be the first import
import app from "./app";

import logger from "jet-logger";

// .env 파일에 예를 들어 PORT="3000" 을 작성하면, process.env.PORT가 3000이 됨
const PORT = process.env.PORT || 3000;
const serverStartMsg = "Express server started on port: ";
process.env.GOOGLE_APPLICATION_CREDENTIALS = 
  `${process.cwd()}/secure/mythical-harbor-350901-98dc308f9c00.json`;

app.server.listen(PORT, () => {
  logger.info(serverStartMsg + PORT);
});
