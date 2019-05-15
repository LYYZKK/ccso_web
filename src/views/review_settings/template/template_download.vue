<template>
  <div class="card-container">
    <a-row :gutter="16" class="card">
      <a-col v-for="(item,index) in template" :key="index">
        <a-card :title=item.name :bordered="false" v-has="item.permissionSid">
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
      template:[
        { name: '绩效数据模板', permissionSid: 'template:achievements' },
        { name: '评审申请模板', permissionSid: 'template:review' },
        { name: '现场访谈模板', permissionSid: 'template:interviews' },
        { name: '现场确认模板', permissionSid: 'template:insure' },
        { name: '现场试算模板', permissionSid: 'template:calculation' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-container {
    background-color: #ececec;
    padding: 15px;

    .card {
      display:flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      &>div{
         margin: 20px;
      }
    }
  }
</style>


