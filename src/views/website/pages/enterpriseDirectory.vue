<template>
  <div class="">
    <div class="main">
      <div class="line">
        <div><div>您的位置：<span @click="$router.push('/website/home')" style="cursor:pointer;">首页</span> > 企业名录</div></div>
        <div class="search">
          <a-input-search
            placeholder="请输入姓名/编号"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="enterprise">
        <div class="title">
          <span>评审合格企业</span>
        </div>
        <div class="detail">
          <div v-for="(item,index) in reviewEnterprises" :key="index">
            <img
              :src="item.logo"
              alt="LOGO"
            />
            <p>
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="title">
          <span>注册合作企业</span>
        </div>
        <div class="qiye">
          <div v-for="(item,index) in cooperateEnterprises" :key="index">
            <img
              src="item.logo"
              alt="LOGO"
            />
            <div>注册合作企业</div>
            <div>
              {{item.name}}
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
      reviewEnterprises: [],
      cooperateEnterprises: [],
      url:'sys/enterprise/list'
    }
  },
  methods: {
    getArticle(param = {}) {
      async.series({
        enterprise_type_review: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.enterprise_type_review })
          cb(null, res.itemValue)
        },
        enterprise_type_cooperate: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.enterprise_type_cooperate })
          cb(null, res.itemValue)
        },
        enterprises: async cb => {
          const res = await getAction(`${window._CONFIG['domainURL']}/${this.url}`, { pageSize: -1 , ...param })
          if (res.code === 0) {
            this.enterprises = res.result.records
          }
          cb(null, this.enterprises)
        }
      },
      (err, result) => {
        if (!err) {
          result.enterprises.forEach(v => {
            if (v.enterpriseType === result.enterprise_type_review) {
              this.reviewEnterprises.push(v)
            } else if (v.enterpriseType === result.enterprise_type_cooperate) {
              this.cooperateEnterprises.push(v)
            }
          })
          console.log('reviewEnterprises =', this.reviewEnterprises)
          console.log('cooperateEnterprises =', this.cooperateEnterprises)
        }
      })
    }
  },
  mounted() {
    async.series({
      isShow: async cb => {
        const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT._true })
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
.enterprise{
  margin: 20px 0;
}
.detail {
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px 0;
}
.detail > div {
  width: 20%;
}
.detail img {
  width: 100%;
}
.qiye {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px 0;
}

.qiye img{
  width: 100%;
}
.qiye > div {
  font-size: 14px;
  width: 20%;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
