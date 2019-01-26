const express = require('express');
const bodyParser = require('body-parser');
const index = require('./route/index');
const cert = require('./route/cert');

const app = express();

const path = require('path');

const PORT = 3000;
const DIST_DIR = './../client/dist';

/* 미들웨어 등록 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', index);
app.use('/api/cert', cert);

app.use('/static', express.static(path.resolve(__dirname, `${DIST_DIR}/static`)));

/* 기본 라우팅 */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, `${DIST_DIR}/index.html`));
});

/* 3000번 포트 */
app.listen(PORT, () => {
  console.log('SERVER START!!!');
});

