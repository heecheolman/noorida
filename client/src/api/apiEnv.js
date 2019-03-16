/**
 *
 * key: API_KEY
 *
 * geoLocation.baseUrl: api url
 * geoLocation 쿼리
 * key=API_KEY (required)
 *
 *
 * geoCoding.baseUrl: api url
 * geoCoding 쿼리
 *
 * latlng=number,number (optional)
 * place_id=string (optional)
 * key=API_KEY, (required)
 *
 * example)
 * baseUrl + ?latlng=999,999&key=API_KEY
 *
 */

export default {
  key: '',
  geoLocation: {
    baseUrl: 'https://www.googleapis.com/geolocation/v1/geolocate',
  },
  geoCoding: {
    baseUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  },
};
