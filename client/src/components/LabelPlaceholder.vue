<template>
  <label>{{ placeholder }}</label>
</template>

<script>
export default {
  name: 'LabelPlaceholder',
  props: {
    placeholder: {
      type: String,
    },
  },
};
</script>
