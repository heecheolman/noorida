import moment from 'moment';

moment.locale('ko');

export default function absoluteDate(date) {
  if (!date) return '';
  return moment(date).format('YYYY년 MM월 DD일 a h:mm:ss');
}
