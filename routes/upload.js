const express = require('express');
const router = express.Router();

const multer = require('multer');
const aws = require('aws-sdk');

const dateTranster = require('../utils/dateTransfer');
const config = require('../config/aws.json');
const s3 = new aws.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});

const db = require('./db');

// form-data를 메모리에 일시적으로 저장하기 위함
const storage = multer.memoryStorage();
const upload_data = multer({ storage: storage });

router.post('/', upload_data.single('file'), (req, res) => {

  const uploadedFile = req.file;
  const s3ObjectKey = dateTranster(req.body.category, req.body.title, req.body.type);

  s3.upload(
    {
      Bucket: config.bucket,
      Key: s3ObjectKey,
      Body: uploadedFile.buffer, // 파일 데이터
      ACL: 'public-read', // 파일을 public으로 설정할 경우
    },
    async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading to S3');
      }
      try{
        await db(req.body.title, req.body.category, data.Location);
        res.status(200).send('File uploaded to S3 and data inserted into DB');
      }
      catch(dbErr){
        console.error(dbErr);
        deleteS3Object(config.bucket, s3ObjectKey);
        res.status(500).send('Error inserting data into DB');
      }
    }
  );

    
});

async function deleteS3Object(bucket, key) {
  try{
    await s3.deleteObject({ Bucket: bucket, Key: key }).promise();
    console.log(`Deleted S3 object: ${key}`);
  }
  catch(err){
    console.error(`Error deleting S3 object: ${key}`, err);
    throw err;
  }
}

module.exports = router;


