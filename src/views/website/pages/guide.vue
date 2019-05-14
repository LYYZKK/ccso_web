<template>
  <div class="">
    <div class="main">
      <div class="line">
        <div>
          您的位置：<span
            @click="$router.push('/website/home')"
            style="cursor:pointer;"
            >首页</span
          >
          > 标准指引
        </div>
      </div>
      <div class="news">
        <div class="left">
          <div class="title">标准指引</div>
          <div class="list">
            <div
              v-for="(item, index) in guide"
              :key="index"
              @click="showArticle(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="detail">
            <div v-for="(item, k) in guide" :key="k" v-show="item.articleState">
              <div class="newsTitle">{{ item.title }}</div>
              <div class="newsTime">【发布时间】{{ item.createTime }}</div>
              <div class="newsContent" v-html="item.text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      guide: []
    };
  },
  methods: {
    showArticle(index) {
      for (let i = 0; i < this.guide.length; i++) {
        this.guide[i].articleState = 0;
      }
      this.guide[index].articleState = 1;
    },
    getArticle() {
      axios
        .get("http://119.27.179.175:8111/ccso/show/article/list?pageSize=-1")
        .then(res => {
          if (res.data.code === 0) {
            console.log();
            for (let i = 0; i < res.data.result.records.length; i++) {
              if (res.data.result.records[i].articleType === "2") {
                res.data.result.records[i].articleState = 0;
                this.guide.push(res.data.result.records[i]);
              }
            }
            this.guide[0].articleState = 1;
          }
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>
<style lang="scss" scoped>
@import '../common.scss';
</style>