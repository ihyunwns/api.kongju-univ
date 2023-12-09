// client에서 파일 업로드 후 업로드 버튼 클릭 시 axios 요청이 옴
// 그러면 해당 이미지 파일을 S3에 업로드 하고
// S3 이미지의 URI를 포함한 이름, 카테고리 정보를 DB에 저장 

// aws-sdk, multer, multers3 필요

const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

router.get('/', (req, res) => {

  // aws.config.loadFromPath(__dirname + '/../config/aws.json');
  
  // const s3 = new aws.S3();
  // const upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: 'kongju-univ-img-storage',
  //     acl: 'public-read',
  //     contentType: multerS3.AUTO_CONTENT_TYPE,
  //     // 업로드하는 파일이 어떤 이름으로 버킷에 저장되는 지 설정
  //     key: function (req, file, cb) {
  //       cb(null, `${Date.now()}_${file.originalname}`); // 이름 중복 방지를 위한 Date().now 추가
  //     },
  //   }),
  // });

  res.send('hi working');
  
});

module.exports = router;


