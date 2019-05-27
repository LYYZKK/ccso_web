<template>
  <div class="">
    <div class="main">
      <div class="line">
        <div>
          您的位置：<span @click="$router.push('/website/home')" style="cursor:pointer;">首页</span>
          > 标准培训
        </div>
      </div>
      <div class="news">
        <div class="left">
          <div class="title">标准培训</div>
          <div class="list">
            <div v-for="(item, index) in train" :key="index" @click="showArticle(index)">
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
import async from 'async'
import { getAction } from '@/api/manage'
import { getDictItemByDictCodeAndItemCode } from '@/components/dict/JDictSelectUtil'
import ConstConfig from '@/config/constant.config'

export default {
  data() {
    return {
      train: [],
      url: 'show/article/list'
    }
  },
  methods: {
    showArticle(index) {
      for (let i = 0; i < this.train.length; i++) {
        this.train[i].articleState = 0
      }
      this.train[index].articleState = 1
    },
    getArticle ({ article_type, article_state }) {
      getAction(`${window._CONFIG['domainURL']}/${this.url}`, { pageSize: -1 , article_type, article_state}).then(res => {
        if (res.code === 0) {
          for (let i = 0; i < res.result.records.length; i++) {
            if (res.result.records[i].articleType === '3') {
              res.result.records[i].articleState = 0
              this.train.push(res.result.records[i])
            }

            if (i === 0) {
              this.train[0].articleState = 1
            }
          }
        }
      })
    }
  },
  mounted() {
    async.series({
      article_type: async cb => {
        const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.article_type_train })
        cb(null, res.itemValue)
      },
      article_state: async cb => {
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