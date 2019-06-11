<template>
  <div class>
    <div class="main">
      <div class="line">
        <div>
          <div>
            您的位置：
            <span @click="$router.push('/website/home')" style="cursor:pointer;">首页</span> > 专家名录
          </div>
        </div>
        <div class="search">
          <a-input-search placeholder="请输入姓名/编号" style="width: 200px"/>
        </div>
      </div>
      <div class="expert">
        <div class="title">
          <span>专家委员会</span>
        </div>
        <!-- 专家委员会 -->
        <div>
          <a-carousel arrows autoplay>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div class="moveItem" v-for="(a,i) in professor" :key="i">
              <div v-for="(item,index) in a" :key="index">
                <div
                  style="display:flex; align-items: flex-end;justify-content: center;font-size:12px;"
                >
                  <img :src="IMAGE_REVIEW_URL_RENDER(item.personalPhoto)" alt="个人照片" />
                  <div style="margin-left:10px;">
                    <span>{{item.name}}</span>
                    <br>
                    <span>{{item.time}}</span>
                  </div>
                </div>
                <div style="margin-top:10px;text-align:center;">{{item.text}}</div>
              </div>
            </div>
          </a-carousel>
        </div>
        <div class="title">
          <span>注册评审员</span>
        </div>
        <!-- 注册评审员 -->
        <div>
          <a-carousel arrows autoplay>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div class="moveItem" v-for="(d,m) in approvar" :key="m">
              <div v-for="(item,index) in d" :key="index" class="item">
                <img :src="IMAGE_REVIEW_URL_RENDER(item.personalPhoto)" alt="个人照片" />
                <div>
                  <p>{{item.name}}</p>
                </div>
                <div>
                  <p>
                    {{item.text}}
                  </p>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
        <div class="title">
          <span>注册协调员</span>
        </div>
        <!-- 注册协调员 -->
        <div>
          <a-carousel arrows autoplay>
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle"/>
            </div>
            <div class="moveItem" v-for="(b,k) in cooperator" :key="k">
              <div v-for="(item,index) in b" :key="index" class="item">
                <img :src="IMAGE_REVIEW_URL_RENDER(item.personalPhoto)" alt="个人照片" />
                <div>
                  <p>{{ item.name }}</p>
                </div>
                <div>
                  <p>
                    {{item.text}}
                  </p>
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
      professor: [],
      approvar: [],
      cooperator: [],
      url: 'sys/personnel/list'
    }
  },
  mounted() {
    async.series(
      {
        surfaceShow: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT._true })
          cb(null, res.itemValue)
        },
        certificate_type_professor: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.certificate_type_professor })
          cb(null, res.itemValue)
        },
        certificate_type_approvar: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.certificate_type_approvar })
          cb(null, res.itemValue)
        },
        certificate_type_cooperator: async cb => {
          const res = await getDictItemByDictCodeAndItemCode({ ...ConstConfig.DICT.certificate_type_cooperator })
          cb(null, res.itemValue)
        }
      },
      async (err, result) => {
        if (!err) {
          console.log('result = ', result)
          const res = await getAction(`${window._CONFIG['domainURL']}/${this.url}`, {
            pageSize: -1,
            surfaceShow: result.surfaceShow
          })
          if (res.code === 0) {
            const records = res.result.records
            records.forEach(v => {
              if (v.certificateType === result.certificate_type_professor) {
                this.professor.push(v)
              }
              if (v.certificateType === result.certificate_type_approvar) {
                this.approvar.push(v)
              }
              if (v.certificateType === result.certificate_type_cooperator) {
                this.cooperator.push(v)
              }
            })
            for (let i = 0; i < this.allArr.length; i += 4) {
              this.arr.push(this.professor.slice(i, i + 4))
            }
          }
        }
      }
    )
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
// 轮播
.expert {
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
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 20%;
      margin-bottom: 20px;
      min-width: 180px;
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
      width: 80px;
      height: 100px;
      display: inline-block;
      border: 1px solid #deeffb;
    }
  }
}
</style>
