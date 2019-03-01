const mailpassword = require('nodemailer');

const htmlBuilder = tokenPw => `
  <p>안녕하세요 누리다입니다. 비밀번호 변경은 다음과 같습니다.</p>
  <p>${tokenPw}</p>
`;

module.exports = {
    transporter: mailpassword.createTransport({
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
        subject: '안녕하세요 누리다입니다. 비밀번호를 확인해주세요',
        html: htmlBuilder(token),
    }),
};
