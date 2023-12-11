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

// form-data를 메모리에 일시적으로 저장하기 위함
const storage = multer.memoryStorage();
const upload_data = multer({ storage: storage });

router.post('/', upload_data.single('file'), (req, res) => {

  const uploadedFile = req.file;
  const s3ObjectKey = dateTranster(req.body.category, req.body.title);
  
  s3.upload(
    {
      Bucket: config.bucket,
      Key: s3ObjectKey,
      Body: uploadedFile.buffer, // 파일 데이터
      ACL: 'public-read', // 파일을 public으로 설정할 경우
    },
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading to S3');
      }

      console.log('File uploaded to S3:', data.Location); //db에 저장
      res.status(200).send('File uploaded to S3');
    }
  );

});

module.exports = router;


