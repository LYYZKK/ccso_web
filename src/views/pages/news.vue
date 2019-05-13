<template>
  <div class="">
    <div class="main">
      <div class="line">
        <div>
          您的位置：<span
            @click="$router.replace('/home')"
            style="cursor:pointer;"
            >首页</span
          >
          > 新闻资讯
        </div>
      </div>
      <div class="news">
        <div class="left">
          <div class="title">新闻资讯</div>
          <div class="list">
            <div
              v-for="(item, index) in news"
              :key="index"
              @click="showArticle(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="detail">
            <div v-for="(item, k) in news" :key="k" v-show="item.articleState">
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
      news: []
    };
  },
  methods: {
    showArticle(index) {
      for (let i = 0; i < this.news.length; i++) {
        this.news[i].articleState = 0;
      }
      this.news[index].articleState = 1;
    },
    getArticle() {
      axios
        .get("http://119.27.179.175:8111/ccso/show/article/list?pageSize=-1")
        .then(res => {
          if (res.data.code === 0) {
            console.log();
            for (let i = 0; i < res.data.result.records.length; i++) {
              if (res.data.result.records[i].articleType === "1") {
                res.data.result.records[i].articleState = 0;
                this.news.push(res.data.result.records[i]);
              }
            }
            this.news[0].articleState = 1;
          }
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>
