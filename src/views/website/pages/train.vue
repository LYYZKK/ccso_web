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
          > 标准培训
        </div>
      </div>
      <div class="news">
        <div class="left">
          <div class="title">标准培训</div>
          <div class="list">
            <div
              v-for="(item, index) in train"
              :key="index"
              @click="showArticle(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="detail">
            <div v-for="(item, k) in train" :key="k" v-show="item.articleState">
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
      train: []
    };
  },
  methods: {
    showArticle(index) {
      for (let i = 0; i < this.train.length; i++) {
        this.train[i].articleState = 0;
      }
      this.train[index].articleState = 1;
    },
    getArticle() {
      axios
        .get("http://119.27.179.175:8111/ccso/show/article/list?pageSize=-1")
        .then(res => {
          if (res.data.code === 0) {
            console.log();
            for (let i = 0; i < res.data.result.records.length; i++) {
              if (res.data.result.records[i].articleType === "3") {
                res.data.result.records[i].articleState = 0;
                this.train.push(res.data.result.records[i]);
              }
            }
            this.train[0].articleState = 1;
          }
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>