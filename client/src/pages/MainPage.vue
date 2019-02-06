<template>
  <div>
    main page
    <a-button type="primary" @click="getLocation()">get Location</a-button>
    <a-button type="dashed" @click="parseLocation()">Parse Location</a-button>

    <pre>
      {{ JSON.stringify(location) }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      baseUrl: 'https://www.googleapis.com/geolocation/v1/geolocate?key=',
      location: '',
    };
  },
  methods: {
    getLocation() {
      /*this.$http.post(this.baseUrl + this.key)
        .then(result => console.log('result', result))
        .catch(err => console.error('err', err));*/
    },
    parseLocation() {
      /*const lat = '37.6689979';
      const lng = '127.05075719999999';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=`;
      this.$http.get(url)
        .then(result => {
          console.log(result);
          this.location = result.data;
        })
        .catch(err => console.log('err', err));*/
    },
  },
};
</script>
