import moment from 'moment';

moment.locale('ko');

export default function timeline(date) {
  if (!date) return '';
  return moment(date).fromNow();
}
