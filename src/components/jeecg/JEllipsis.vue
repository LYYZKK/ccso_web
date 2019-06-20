<template>
  <a-popover v-if="viewMoreType === 'popover' && showMore">
    <template slot="content">
      <span>{{ value }}</span>
    </template>
    {{ value | ellipsis(length) }}
  </a-popover>
  <a-tooltip placement="topLeft" v-else-if="viewMoreType === 'tooltip' && showMore">
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
      showMore: {
        type: Boolean,
        required: false,
        default: true,
      },
      viewMoreType: {
        type: String,
        required: false,
        default: 'tooltip' // 可选 tooltip, popover
      }
    }
  }
</script>

<style scoped>

</style>
