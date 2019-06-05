<template>
  <a-tooltip placement="topLeft" v-if="withTooltip">
    <template slot="title">
      <span>{{ value }}</span>
    </template>
    {{ value | ellipsis(length) }}
  </a-tooltip>
  <span v-else>
    {{ value | ellipsis(length) }}
  </span>
</template>

<script>
  export default {
    name: 'JEllipsis',
    props: {
      value: {
        type: String,
        required: false,
      },
      length: {
        type: Number,
        required: false,
        default: 25,
      },
      withTooltip: {
        type: Boolean,
        required: false,
        default: true,
      },
    }
  }
</script>

<style scoped>

</style>
