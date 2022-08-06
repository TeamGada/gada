import mongoose from "mongoose";
import logger from "jet-logger";
import "dotenv/config";

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n";
logger.info(DB_URL);

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  logger.info("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  logger.err("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

export * from "./models/planModel";
export * from "./models/planDetailModel";
export * from "./models/userModel";
export * from "./models/emailAuthModel";
export * from "./models/withdrawalModel";
export * from "./models/likeModel";
