const express = require('express');
const multer = require('multer');

const router = express.Router();

/**
 * 이미지가 저장되는 저장소 config
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/static/images');
  },
  filename(req, file, cb) {
    const { nickName } = req.query;
    let filename;
    if (nickName) {
      let ext = file.originalname.split('.').pop();
      if (ext === 'blob') {
        ext = 'jpg';
      }
      filename = `${nickName}.${ext}`;
    } else {
      filename = file.originalname;
    }
    cb(null, filename);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 5000000,
  },
});

/**
 * 글 작성시 image 업로드
 */
router.post('/image', upload.single('image'), (req, res) => {
  const url = req.file.filename;
  res.send(url);
});

module.exports = router;
