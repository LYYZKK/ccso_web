<template>
  <div class>
    <Article :message="article.name"></Article>
  </div>
</template>

<script>
import Article from '../components/Article'
export default {
  components: {
    Article
  },
  data(){
    return {
      article: {
        name:'新闻资讯'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
</style>

