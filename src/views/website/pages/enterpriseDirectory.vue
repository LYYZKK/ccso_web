<template>
  <div class>
    <div class="main">
      <div class="line">
        <div>
          <div>
            您的位置：
            <span @click="$router.push('/website/home')" style="cursor:pointer;">首页</span> > 企业名录
          </div>
        </div>
        <div>
          <a-input-search
            placeholder="请输入姓名/编号"
            style="width: 200px"
            v-model="keyText"
            @change="getData"
          />
        </div>
      </div>
      <div class="enterprise">
        <div class="title">
          <span>评审合格企业</span>
        </div>
        <div>
          <a-carousel arrows autoplay>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div class="moveItem" v-for="(a,i) in reviewEnterprisesAll" :key="i">
              <div v-for="(item,index) in a" :key="index" class="item">
                <img :src="IMAGE_REVIEW_URL_RENDER(item.logo)" alt="LOGO">
                <div
                  style="display:flex;flex-direction: column;align-items: center;font-size: 12px;margin-top:10px;"
                >
                  <span class="name">{{item.name}}</span>
                  <span style="cursor:pointer">{{item.businessLicenseNo}}</span>
                  <span class="date">{{formatDateTime(item.updateTime, 'YYYY-MM-DD')}}</span>
                  <span class="brief">{{item.briefIntroduction}}</span>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
        <div class="title">
          <span>注册合作企业</span>
        </div>
        <div>
          <a-carousel arrows autoplay>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div class="moveItem" v-for="(b,k) in cooperateEnterprisesAll" :key="k">
              <div v-for="(item,index) in b" :key="index" class="item">
                <img :src="IMAGE_REVIEW_URL_RENDER(item.logo)" alt="LOGO">
                <div
                  style="display:flex;flex-direction: column;align-items: center;font-size: 12px;margin-top:10px;"
                >
                  <span class="name">{{item.name}}</span>
                  <span class="date">{{formatDateTime(item.updateTime, 'YYYY-MM-DD')}}</span>
                  <span class="brief">{{item.briefIntroduction}}</span>
                </div>
              </div>
            </div>
          </a-carousel>
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
import constantCfgMixin from '@/mixins/constant.cfg'
export default {
  mixins: [constantCfgMixin],
  data() {
    return {
      reviewEnterprises: [],
      reviewEnterprisesAll: [],
      cooperateEnterprises: [],
      cooperateEnterprisesAll: [],
      keyText: '',
      fuzzySearchFields: ',name,briefIntroduction,',
      url: 'sys/enterprise/list'
    }
  },
  methods: {
    getData() {
      async.series(
        {
          surfaceShow: async cb => {
            const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT._true })
            cb(null, res.itemValue)
          },
          enterprise_type_review: async cb => {
            const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.enterprise_type_review })
            cb(null, res.itemValue)
          },
          enterprise_type_cooperate: async cb => {
            const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.enterprise_type_cooperate })
            cb(null, res.itemValue)
          }
        },
        async (err, result) => {
          if (!err) {
            const res = await getAction(`${window._CONFIG['domainURL']}/${this.url}`, {
              pageSize: -1,
              surfaceShow: result.surfaceShow,
              keyText: this.keyText,
              fuzzySearchFields: this.fuzzySearchFields
            })
            if (res.code === 0) {
              this.reviewEnterprisesAll = []
              this.cooperateEnterprisesAll = []
              const records = res.result.records
              records.forEach(v => {
                if (v.enterpriseType === result.enterprise_type_review) {
                  this.reviewEnterprises.push(v)
                } else if (v.enterpriseType === result.enterprise_type_cooperate) {
                  this.cooperateEnterprises.push(v)
                }
              })
              for (let m = 0; m < this.reviewEnterprises.length; m + 3) {
                this.reviewEnterprisesAll.push(this.reviewEnterprises.splice(m, m + 3))
              }
              for (let m = 0; m < this.cooperateEnterprises.length; m + 3) {
                this.cooperateEnterprisesAll.push(this.cooperateEnterprises.splice(m, m + 3))
              }
            }
          }
        }
      )
    },
    to(url) {
      return
      window.open(url)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
.enterprise {
  .title {
    margin-bottom: 20px;
  }
  .name {
    font-size: 13px;
    font-weight: bold;
  }
  .date {
    color: #737373;
    font-size: 12px;
  }
  .brief {
    color: #737373;
    font-size: 13px;
  }
  .ant-carousel .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #aaa;
  }
  .ant-carousel .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }
  /deep/ .ant-carousel .slick-dots li button {
    background: #000;
  }
  /deep/ .ant-carousel .slick-dots li.slick-active button {
    background: #95cff8;
  }
  .moveItem {
    padding: 20px 0 0 0;
    display: flex !important;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 30%;
      min-width: 200px;
      margin-bottom: 20px;
    }
    .item {
      font-size: 12px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin: 5px 0;
      }
    }
    img {
      display: inline-block;
      width: 198px;
      height: 48px;
      border: 1px solid #deeffb;
    }
  }
}
</style>
