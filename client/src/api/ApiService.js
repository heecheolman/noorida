import axios from 'axios';
import env from './apiEnv';

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
    return axios.get('/api/cert/valid', {
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
    return axios.post('/api/auth/join', { realName, nickName, password, email });
  },

  /**
   * 닉네임이 중복되는지 여부
   * @param nickName
   * @returns {AxiosPromise<any>}
   */
  validateNickName(nickName) {
    return axios.get('/api/cert/valid/nick-names', {
      params: { nickName },
    });
  },

  /**
   * 이메일이 중복되는지 여부
   * @param email
   * @returns {AxiosPromise<any>}
   */
  validateEmail(email) {
    return axios.get('api/cert/valid/emails', {
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
    return axios.post('/api/auth/login', {
      nickName,
      password,
    });
  },

  sessionLogin() {
    return axios.get('/api/auth/login');
  },

  /**
   * 이미지 업로드
   * @returns {AxiosPromise<any>}
   */
  uploadImage(formData) {
    return axios.post('/api/upload/image', formData, {
      timeout: 5000,
    });
  },

  /**
   * 사용자 위치정보 얻어오기
   * google geolocation api
   */
  getLocation() {
    return axios.post(`${env.geoLocation.baseUrl}?key=${env.key}`);
  },

  /**
   * 위도 경도값을 지역이름으로 바꿔줌
   * google reverse geocoding api
   */
  getParsedLocalName(lat, lng) {
    return axios.get(`${env.geoCoding.baseUrl}?latlng=${lat},${lng}&key=${env.key}`);
  },


  /**
   * 기사 작성 api
   * @param userId
   * @param title
   * @param content
   * @param address
   * @returns {AxiosPromise<any>}
   */
  publishNews(userId, title, content, address) {
    return axios.post('/api/posts', {
      userId,
      title,
      content,
      address,
    });
  },

  /**
   * 지역이름과, 받아올 마지막 id 값을 넘겨주면 포스트를 가져옴
   * @param localName
   * @param lastId
   * @returns {AxiosPromise<any>}
   */
  loadLocalPreviewPostList(localName, lastId) {
    return axios.get('/api/posts/local', {
      params: {
        localName: decodeURI(localName),
        lastId,
      },
    });
  },
  /**
   * 아이디 찾기
   * @param realName
   * @param email
   * @returns {AxiosPromise<any>}
   */
  findId(realName, email) {
    return axios.post('/api/auth/find-id', {
      realName,
      email,
    });
  },

  /**
   * 비밀번호 찾기
   * @param realName
   * @param nickName
   * @param email
   * @returns {AxiosPromise<any>}
   */
  findPassword(realName, nickName, email) {
    return axios.post('/api/auth/find-password', {
      realName,
      nickName,
      email,
    });
  },

  insertTmpPassword(email){
    return axios.put('api/auth/find-password',{
      email,
    });
  },

  /**
   * 콘텐츠 id 값으로 post 정보들을 가져옴
   * @param id
   * @returns {AxiosPromise<any>}
   */
  getPostContent(id) {
    return axios.get(`/api/posts/${id}`, {
      params: { id },
    });
  },

  /**
   * 유저의 id 값으로 user 정보들을 가져옴
   * @param id
   * @returns {AxiosPromise<any>}
   */
  getUserProfileCard(id) {
    return axios.get(`/api/users/${id}/profile-card`);
  },

  /**
   * 유저의 Id 값으로 유저정보 조회
   * @param id
   * @returns {AxiosPromise<any>}
   */
  getUser(id) {
    return axios.get(`/api/users/${id}`);
  },

  /**
   * user Id 값으로 해당 유저가 작성한 포스트리스트 조회
   * @param userId
   * @param lastId
   * @returns {AxiosPromise<any>}
   */
  loadUserPostList(userId, lastId) {
    return axios.get(`/api/posts/users/${userId}`, {
      params: { lastId },
    });
  },

  writeComment(contentId, userId, commentContent) {
    return axios.post('/api/comments', {
      contentId,
      userId,
      commentContent,
    });
  },

  getCommentList(contentId, lastId) {
    return axios.get('/api/comments', {
      params: { contentId, lastId },
    });
  },
  checkPassword(userId, oldPassword) {
    return axios.post('/api/change-Password', {
      userId,
      oldPassword,
    });
  },
  insertNewPassword(userId, newPassword) {
    return axios.put('/api/change-Password', {
      userId,
      newPassword,
    });
  },

  /**
   * 유저의 자기소개 수정
   * @param userId
   * @param description
   * @returns {AxiosPromise<any>}
   */
  updateDescription(userId, description) {
    return axios.put(`/api/users/${userId}/description`, {
      params: {
        userId,
      },
      description,
    });
  },

  /**
   * 유저의 리포터 구독
   * reader : 유저 고유 Id
   * reporter : 유저가 구독한 다른 유저의 고유 Id
   */

  isSubscribe(reader, reporter) {
    return axios.get('api/subscription/is-subscribed', {
      params: {
        reader,
        reporter,
      },
    });
  },

  subscriptionReporter(reader, reporter) {
    return axios.post('api/subscription/reporter', {
      reader,
      reporter,
    });
  },

  subscriptionLocal(reader, localId) {
    return axios.post('api/subscription/local', {
      reader,
      localId,
    });
  },

  readerList(userId) {
    return axios.get('api/subscription/reader', {
      params: { userId },
    });
  },

  reporterList(userId) {
    return axios.get('api/subscription/reporter', {
      params: { userId },
    });
  },

  localList(userId) {
    return axios.get('api/subscription/local', {
      params: { userId },
    });
  },
  cancelSubscriptionReporter(reader, reporter) {
    return axios.delete('api/subscription/reporter', {
      params: { reader, reporter },
    });
  },

  cancelSubscriptionLocal(reader, localId) {
    return axios.delete('api/subscription/reporter', {
      params: { reader, localId },
    });
  },
  countSubscription(userId) {
    return axios.get('api/subscription/countSubscription', {
      params: { userId },
    });
  },
};
