<template>
  <div id="website-app">
    <Top />
    <router-view />
    <Bottom />
  </div>
</template>

<script>
import Top from "./components/Top.vue";
import Bottom from "./components/Bottom.vue";
export default {
  name: "App",
  components: {
    Top,
    Bottom
  }
};
</script>

<style>
#website-app {
  background-color: #fff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  max-width: 809px;
  margin: 0 auto;
  box-shadow: 0 0 5px 1px #ccc;
}
@media (max-width:500px) {
  #app{
    box-shadow: none;
  }
}
.line {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:0 10px 10px 10px;
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  margin: 15px 0;
}
input {
  outline: none;
  text-indent: 10px;
  border-radius: 5px;
  height: 25px;
  border: 1px solid #eee;
}
.main {
}
.title {
  position: relative;
  line-height: 40px;
  color: #145692;
  background-color: #deeffb;
  text-indent: 30px;
}
.title::before {
  content: "";
  width: 15px;
  height: 15px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: url(http://chinaccso.org.cn:8090/images/shu.jpg) no-repeat;
  background-size: 100% 100%;
}
a{
  text-decoration: none;
  color: #fff;
}

/* 新闻公共 */
.news {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 20%;
  min-width: 120px;
}
.left .title {
  line-height: 40px;
  color: #145692;
  background-color: #deeffb;
}
.left .list {
  text-align: center;
  line-height: 35px;
}
.left .list > div {
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px #deeffb solid;
  cursor: pointer;
}
.left .list > div:hover {
  background: rgba(187, 243, 247, 0.3);
}
.left .list > div:visited {
  background: rgba(187, 243, 247, 0.3);
}
.right {
  width: 80%;
  margin: 0 10px;
  font-size: 12px;
}
.newsTitle {
  text-align: center;
  font-size: 14px;
}
.newsTime {
  text-align: right;
}
.newsContent{
  margin-top:10px;
}
</style>
