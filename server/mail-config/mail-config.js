const nodemailer = require('nodemailer');

const htmlBuilder = token => `
  <p>안녕하세요 누리다입니다. 회원가입 인증 코드는 다음과 같습니다.</p>
  <p>${token}</p>
`;

module.exports = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heecheol.bot@gmail.com',
      pass: 'gmlcjf12',
    },
  }),
  mailOptionBuilder: (to, token) => ({
    from: {
      name: '누리다',
      address: 'heecheol.bot@gmail.com',
    },
    to: {
      address: to,
    },
    subject: '안녕하세요 누리다입니다. 이메일 인증을 해주세요',
    html: htmlBuilder(token),
  }),
};
