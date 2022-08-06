import { Request, Response, NextFunction } from "express";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import logger from "jet-logger";

  // 스토리지 초기화
const storage = new Storage();
  // 버킷 초기화
const bucketName = process.env.GCLOUD_STORAGE_BUCKET || "gada-storage";
const bucket = storage.bucket(bucketName);

function upload(req: Request, res: Response, next: NextFunction) {
  logger.info(
    "google authentication installed at" +
    process.env["GOOGLE_APPLICATION_CREDENTIALS"] || false
  );

  if(!req.file) {
    next();
    return;
  }
  
  const type = req.file.mimetype.split("/");
  const blob = bucket.file(
    `images/${req.user?._id as string}${Date.now()}.${type[1]}`
  );
  
  // 이미지 업로드 스트림 생성
  const blobStream = blob.createWriteStream();

  // 에러 핸들링
  blobStream.on("error", (err) => {
    res.status(500).json({
        message: "업로드 중 오류가 발생했습니다",
        error: JSON.parse(JSON.stringify(err)),
    });
  });

  // 종료 처리
  blobStream.on("finish", () => {
    const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    // 최종적으로 업로드 프로세스가 완료되는 시점
    req.body.imgUrl = publicUrl;
    logger.info(publicUrl);
    next();
  });

  // 업로드 스트림 실행
  blobStream.end(req.file?.buffer);
}

export { upload };
