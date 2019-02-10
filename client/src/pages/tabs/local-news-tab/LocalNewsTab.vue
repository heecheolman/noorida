<template>
  <div>Local
    {{ address }}
    {{ placeId }}
    <local-post />
  </div>
</template>

<script>
import LocalPost from '@/components/LocalPost';
import { mapState } from 'vuex';

export default {
  name: 'LocalNewsTab',
  components: {
    LocalPost,
  },
  computed: {
    ...mapState('login', [
      'address',
      'placeId',
    ]),
  },
};
</script>
