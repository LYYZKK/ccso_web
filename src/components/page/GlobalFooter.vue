<template>
  <div class="footer">
    <div class="copyright">
      <span>中国通信企业协会 CCSO 评定中心官方网站</span><hr class="copyright-hr">
      <span>版权所有Copyright </span><a-icon type="copyright"/><span> 2015 - 2015 CHINACCSO.ORG.CN, All Rights Reserved</span><hr class="copyright-hr">
      <span>粤ICP备15086964号</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutFooter"
  }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 20px 0 20px;
    text-align: center;
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
    .copyright-hr {
      border-width: 0px;
    }
  }
</style>
