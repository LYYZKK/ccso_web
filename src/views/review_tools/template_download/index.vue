<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 3, md: 4, lg: 4, xl: 8, xxl: 8 }"
    :dataSource="templates"
    class="card-list-container"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" class="card-list-item">
      <a-card :title="item.name" :bordered="false" v-has="item.permissionSid">
        <a :href="FILE_DOWNLOAD_URL_RENDER(item.downloadUrl, item.downloadFileName)"><a-button type="primary">点击下载</a-button></a>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<script>
import { getAction } from '@/api/manage'
import constantCfgMixin from '@/mixins/constant.cfg'

export default {
  mixins: [constantCfgMixin],
  data () {
    return {
      url: '/review/reviewTemplate/list',
      templates: [],
    }
  },
  mounted() {
    getAction(`${window._CONFIG['domainURL']}/${this.url}`, { pageSize: -1, column: 'rank', order: 'asc',}).then(res => {
      this.templates = res.result.records
    })
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
