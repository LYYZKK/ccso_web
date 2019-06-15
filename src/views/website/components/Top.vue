<template>
  <div>
    <div class="top" @click="goto('/website/home')">
      <img src="../../../../static/images/top.jpg" alt="" />
    </div>
    <div class="navBar">
      <div @click="goto('/website/home')" :class="{on:'/website/home' === $route.path}">
        <span>网站首页</span>
      </div>
      <div @click="goto('/website/news')" :class="{on:'/website/news' === $route.path}">
        <span>新闻资讯</span>
      </div>
      <div @click="goto('/website/guide')" :class="{on:'/website/guide' === $route.path}">
        <span>标准指引</span>
      </div>
      <div @click="goto('/website/train')" :class="{on:'/website/train' === $route.path}">
        <span>标准培训</span>
      </div>
      <div @click="goto('/website/enterprise-directory')" :class="{on:'/website/enterprise-directory' === $route.path}">
        <span>企业名录</span>
      </div>
      <div @click="goto('/website/expert-directory')" :class="{on:'/website/expert-directory' === $route.path}">
        <span>专家名录</span>
      </div>
      <div>
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
          name:'网站首页',
          path:'/website/home'
        },
        {
          name:'新闻资讯',
          path:'/website/news'
        },
        {
          name:'标准指引',
          path:'/website/guide'
        },
        {
          name:'标准培训',
          path:'/website/train'
        },
        {
          name:'企业名录',
          path:'/website/enterprise-directory'
        },
        {
          name:'专家名录',
          path:'/website/expert-directory'
        },
        {
          name:'评审登录',
          path:'/user/login'
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
  color: #f53235;
}
</style>
