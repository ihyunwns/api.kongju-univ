const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(upload.any());

router.post('/',(req, res) => {

  aws.config.loadFromPath(__dirname + '/../config/aws.json');

  const s3 = new aws.S3();
  console.log('FIles: ' + req.files);
  // console.log('text data: ' + req.body);

  res.send(JSON.stringify(req.body));


  // const upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: 'kongju-univ-img-storage',
  //     acl: 'public-read',
  //     contentType: multerS3.AUTO_CONTENT_TYPE,
      
  //     // 업로드하는 파일이 어떤 이름으로 버킷에 저장되는 지 설정
  //     key: function (req, file, callback) {
  //       const uploadDirectory = req.query.directory ?? ''
  //       callback(null, `${Date.now()}_${file.originalname}`); // 이름 중복 방지를 위한 Date().now 추가
  //     },
  //   }),
  // });


});

module.exports = router;


