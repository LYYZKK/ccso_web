<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16" class="card">
      <a-col v-for="(item,index) in template" :key="index" v-has="'template:download'">
        <a-card :title=item :bordered="false">
          <a-button type="primary">点击下载</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      template:['绩效数据模板','评审申请模板','现场访谈模板','现场确认模板','现场试算模板']
    }
  }
}
</script>
<style lang="scss" scoped>
  .card{
    display:flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    &>div{
      margin: 20px;
    }
  }
</style>


