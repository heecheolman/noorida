import axios from 'axios';

/**
 * apiService
 *
 * axios 모듈을 래핑하여 함수호출을 이용해 해당 api를 사용가능하게 함
 */

export default {
  /**
   * 이메일과 토큰을 이용해 해당 이메일에 대한 토큰값이 맞는지 확인
   * @param email
   * @param token
   * @returns {AxiosPromise<any>}
   */
  confirmToken(email, token) {
    return axios.get(`/api/cert/user/valid/${email}/${token}`, {
      params: { email, token },
    });
  },

  /**
   * 인증을 위한 이메일 전송
   * @param email
   * @returns {AxiosPromise<any>}
   */
  sendCertMail(email) {
    return axios.post('/api/cert/mail', { email });
  },

  /**
   * 회원가입
   * @param realName
   * @param nickName
   * @param password
   * @param email
   * @returns {AxiosPromise<any>}
   */
  join(realName, nickName, password, email) {
    return axios.post('/api/join', { realName, nickName, password, email });
  },

  /**
   * 닉네임이 중복되는지 여부
   * @param nickName
   * @returns {AxiosPromise<any>}
   */
  validateNickName(nickName) {
    return axios.get(`/api/cert/user/nick-names/${nickName}`, {
      params: { nickName },
    });
  },

  /**
   * 이메일이 중복되는지 여부
   * @param email
   * @returns {AxiosPromise<any>}
   */
  validateEmail(email) {
    return axios.get(`api/cert/user/emails/${email}`, {
      params: { email },
    });
  },

  /**
   * 로그인
   * @param nickName
   * @param password
   * @returns {AxiosPromise<any>}
   */
  login(nickName, password) {
    return axios.post('/api/login', {
      nickName,
      password,
    });
  },
};
