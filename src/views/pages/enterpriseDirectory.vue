<template>
  <div class="">
    <div class="main">
      <div class="line">
        <div><div>您的位置：<span @click="$router.replace('/home')" style="cursor:pointer;">首页</span> > 企业名录</div></div>
        <div class="search">
          <input type="text" placeholder="请输入姓名/编号" />
          <img
            src="http://chinaccso.org.cn:8090/images/ss_03.png"
            alt=""
            style="cursor:pointer;"
          />
        </div>
      </div>
      <div class="enterprise">
        <div class="title">
          <span>评审合格企业</span>
        </div>
        <div class="detail">
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt="LOGO"
            />
            <p>
              第一行第一
            </p>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt="LOGO"
            />
            <p>
              第一行第一
            </p>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt="LOGO"
            />
            <p>
              第一行第一行第一行第一行第一行第一行第二行
            </p>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt="LOGO"
            />
            <p>
              第一行第一行第一行第一行第一行第一行第二行
            </p>
          </div>
        </div>
        <div class="title">
          <span>注册合作企业</span>
        </div>
        <div class="qiye">
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt=""
            />
            <div>注册合作企业</div>
            <div>
              第一行第一行第一行第一行第一行第一行第二行第二行第二行第二行第二行第二行
              第三行第三行第三行第三行第
            </div>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt=""
            />
            <div>注册合作企业</div>
            <div>
              第一行第一行第一行第一行第一行第一行第二行第二行第二行第二行第二行第二行
              第三行第三行第三行第三行第
            </div>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt=""
            />
            <div>注册合作企业</div>
            <div>
              第一行第一行第一行第一行第一行第一行第二行第二行第二行第二行第二行第二行
              第三行第三行第三行第三行第
            </div>
          </div>
          <div>
            <img
              src="http://chinaccso.org.cn:8090/upload/company/123456789012345678901234567890_logoFile_2016_03_31_16_34_20.png"
              alt=""
            />
            <div>注册合作企业</div>
            <div>
              第一行第一行第一行第一行第一行第一行第二行第二行第二行第二行第二行第二行
              第三行第三行第三行第三行第
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
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
