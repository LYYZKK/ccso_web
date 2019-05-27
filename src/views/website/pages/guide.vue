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
              v-for="(item, index) in articles"
              :key="index"
              @click="showArticle(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="detail">
            <div v-for="(item, k) in articles" :key="k" v-show="item.active">
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
import async from 'async'
import { getAction } from '@/api/manage'
import { getDictItemByDictCodeAndItemCode } from '@/components/dict/JDictSelectUtil'
import ConstConfig from '@/config/constant.config'

export default {
  data () {
    return {
      articles: [],
      url: 'show/article/list'
    }
  },
  methods: {
    showArticle (index) {
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].active = 0
      }
      this.articles[index].active = 1
    },
    getArticle (param = {}) {
      getAction(`${window._CONFIG['domainURL']}/${this.url}`, { pageSize: -1 , ...param }).then(res => {
        if (res.code === 0) {
          this.articles = res.result.records
          if (this.articles.length > 0) {
            this.articles[0].active = 1
          }
        }
      })
    }
  },
  mounted () {
    async.series({
      articleType: async cb => {
        const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.article_type_guide })
        cb(null, res.itemValue)
      },
      articleState: async cb => {
        const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.article_state_released })
        cb(null, res.itemValue)
      }
    },
    (err, result) => {
      if (!err) {
        this.getArticle({ ...result })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  @import '../common.scss';
</style>