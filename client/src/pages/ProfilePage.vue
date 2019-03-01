<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  props: {
    id: {
      type: Number,
    },
  },
};
</script>
