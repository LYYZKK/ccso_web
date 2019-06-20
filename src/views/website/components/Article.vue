<template>
  <div class>
    <div class="main">
      <div class="line">
        <div>
          您的位置：
          <span @click="$router.push('/website/home')" style="cursor:pointer;">首页</span>
          >{{message}}
        </div>
      </div>
      <div class="news">
        <div class="left">
          <div class="title">{{message}}</div>
          <div class="list">
            <div
              v-for="(item, idx) in articles"
              :key="idx"
              @click="showArticle(idx)"
              :class="activeClasses[idx]"
            >
              <j-ellipsis :showMore="isDesktop() ? true : false" :value="item.title" :length="8"/>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="detail">
            <div
              v-for="(item, idx) in articles"
              :key="idx"
              v-if="changeArticle"
              v-show="active[idx]"
            >
              <div class="newsTitle">{{ item.title }}</div>
              <div class="newsTime">【发布时间】{{ item.updateTime }}</div>
              <div class="newsContent" v-html="item.text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
import { getDictItemByDictCodeAndItemCode } from '@/components/dict/JDictSelectUtil'
import ConstConfig from '@/config/constant.config'
import { mixinDevice } from '@/utils/mixin.js'

import JEllipsis from '@/components/jeecg/JEllipsis'

export default {
  name: 'Article',
  components: {
    JEllipsis
  },
  mixins: [mixinDevice],
  data() {
    return {
      articles: [],
      url: 'show/article/list',
      active: [],
      activeClasses: [],
      changeArticle: false
    }
  },
  props: ['message'],
  methods: {
    refresh() {
      this.changeArticle = false
      this.$nextTick(() => {
        this.changeArticle = true
      })
    },
    showArticle(index) {
      for (let i = 0; i < this.articles.length; i++) {
        this.active[i] = false
        this.activeClasses[i] = ''
      }
      this.active[index] = true
      this.activeClasses[index] = 'actived'
      this.refresh()
    },
    getArticle(param = {}) {
      getAction(`${window._CONFIG['domainURL']}/${this.url}`, { pageSize: -1, ...param }).then(res => {
        if (res.code === 0) {
          if (this.$route.path == '/website/news') {
            res.result.records.forEach(item => {
                if(item.articleType == 1){
                    this.articles.push(item)
                }
            })
          }else if (this.$route.path == '/website/guide') {
            res.result.records.forEach(item => {
                if(item.articleType == 2){
                    this.articles.push(item)
                }
            })
          }else if (this.$route.path == '/website/train') {
            res.result.records.forEach(item => {
                if(item.articleType == 3){
                    this.articles.push(item)
                }
            })
          }
          console.log(this.articles)
          if (this.articles.length > 0) {
            for (let i = 0; i < this.articles.length; i++) {
              if (i === 0) {
                this.active[i] = true
                this.activeClasses[i] = 'actived'
              } else {
                this.active[i] = false
                this.activeClasses[i] = ''
              }
            }
            this.refresh()
          }
        }
      })
    }
  },
  mounted() {
    getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT._true }).then(surfaceShowRes => {
      this.getArticle({
        surfaceShow: surfaceShowRes.itemValue
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
</style>

