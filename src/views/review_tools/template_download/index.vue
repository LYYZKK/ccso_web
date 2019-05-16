<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 3, md: 4, lg: 4, xl: 8, xxl: 8 }"
    :dataSource="templates"
    class="card-list-container"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" class="card-list-item">
      <a-card :title="item.name" :bordered="false" v-has="item.permissionSid">
        <a-button type="primary">点击下载</a-button>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  data () {
    return {
      templates: [
        { name: '绩效数据模板', permissionSid: 'template:achievements' },
        { name: '评审申请模板', permissionSid: 'template:review' },
        { name: '现场访谈模板', permissionSid: 'template:interviews' },
        { name: '现场确认模板', permissionSid: 'template:insure' },
        { name: '现场试算模板', permissionSid: 'template:calculation' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-list-container .card-list-item {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }
</style>
