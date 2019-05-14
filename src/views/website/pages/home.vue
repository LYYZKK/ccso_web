<template>
  <div class="">
    <div class="main">
      <div class="links">
        <div v-for="(item, index) in links" :key="index" @click="goto(item.path)">
          <span>{{ item.name }}</span>
          <img :src="item.img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '../../../../static/images/bg01.jpg'
import img2 from '../../../../static/images/bg02.jpg'
import img3 from '../../../../static/images/bg03.jpg'
import img4 from '../../../../static/images/bg04.jpg'
import img5 from '../../../../static/images/bg05.jpg'
import img6 from '../../../../static/images/bg06.jpg'
export default {
  data() {
    //这里存放数据
    return {
      links: [
        {
          name: '新闻资讯',
          img: img1,
          path: '/website/news'
        },
        {
          name: '标准指引',
          img: img2,
          path: '/website/guide'
        },
        {
          name: '标准培训',
          img: img3,
          path: '/website/train'
        },
        {
          name: '企业名录',
          img: img4,
          path: '/website/enterpriseDirectory'
        },
        {
          name: '专家名录',
          img: img5,
          path: '/website/expertDirectories'
        },
        {
          name: '评审登录',
          img: img6,
          path: '/user/login'
        }
      ]
    }
  },
  methods: {
    goto(path) {
      this.$router.replace(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.links {
  padding: 10px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  & > div {
    box-sizing: border-box;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin: 10px 0;
    & > span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -20%);
      color: rgb(25, 107, 167);
      font-size: 20px;
      font-weight: 900;
    }
  }
  img {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .links > div {
    width: 45%;
    & > span {
      font-size: 12px;
    }
  }
}
</style>
