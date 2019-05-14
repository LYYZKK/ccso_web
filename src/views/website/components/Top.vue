<template>
  <div>
    <div class="top" @click="goto('/website/home')">
      <img src="../../../../static/images/top.jpg" alt="" />
    </div>
    <div class="navBar">
      <div @click="goto('/website/home')" :class="{on:'/website/home'===$route.path}">
        <span>网站首页</span>
      </div>
      <div @click="goto('/website/news')" :class="{on:'/website/news'===$route.path}">
        <span>新闻资讯</span>
      </div>
      <div @click="goto('/website/guide')" :class="{on:'/website/guide'===$route.path}">
        <span>标准指引</span>
      </div>
      <div @click="goto('/website/train')" :class="{on:'/website/train'===$route.path}">
        <span>标准培训</span>
      </div>
      <div @click="goto('/website/enterpriseDirectory')" :class="{on:'/website/enterpriseDirectory'===$route.path}">
        <span>企业名录</span>
      </div>
      <div @click="goto('/website/expertDirectories')" :class="{on:'/website/expertDirectories'===$route.path}">
        <span>专家名录</span>
      </div>
      <div>
        <!-- <a href="http://chinaccso.org.cn:8090/login.jsp">评审登陆</a> -->
        <router-link to="/user/login" >评审登陆</router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      navs:[
        {
          name:'新闻资讯',
          path:'/news'
        },
        {
          name:'新闻资讯',
          path:'/news'
        },
        {
          name:'标准指引',
          path:'/guide'
        },
        {
          name:'标准培训',
          path:'/train'
        },
        {
          name:'企业名录',
          path:'/enterpriseDirectory'
        },
        {
          name:'专家名录',
          path:'/expertDirectories'
        },
        {
          name:'评审登录',
          path:'/expertDirectories'
        },
      ]
    };
  },
  methods: {
    goto(path){
      this.$router.push({path})
    },
  },
};
</script>
<style scoped>
a{
  text-decoration: none;
  color: #fff;
}
.top {
  text-align: center;
  cursor: pointer;
}
.top img {
  width: 100%;
}
.navBar {
  margin-top: 5px;
  padding:10px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  background-color: #168bf7;
  color: #fff;
}
@media (max-width: 500px) {
  .navBar {
    display: none
  }
}
.navBar > div {
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}
.on {
  color: #ef585a;
}
</style>
