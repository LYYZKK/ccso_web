<template>
  <div class="main user-layout-register">
    <a-spin :spinning="confirmLoading">
      <a-form ref="formRegister" :autoFormCreate="(form)=>{this.form = form}" id="formRegister">
        <br>
        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="email"
          :fieldDecoratorOptions="{rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}">
          <a-input size="large" type="text" placeholder="邮箱"></a-input>
        </a-form-item>

        <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
          <template slot="content">
            <div :style="{ width: '240px' }">
              <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
              <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
              <div style="margin-top: 10px;">
                <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
              </div>
            </div>
          </template>
          <a-form-item
            label="密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}">
            <a-input size="large" type="password" @click="handlePasswordInputClick" autocomplete="false"
                     placeholder="至少6位密码，区分大小写"></a-input>
          </a-form-item>
        </a-popover>

        <a-form-item
          label="确认密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="password2"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}">
          <a-input size="large" type="password" autocomplete="false" placeholder="确认密码"></a-input>
        </a-form-item>
        <a-divider/>
        <a-form-item
          label="企业名称 "
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="enterpriseName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入企业名称' }, { validator: this.handleEnterpriseCheck } ], validateTrigger: ['change', 'blur'] }">
          <a-input size="large" placeholder="请输入企业名称"/>
        </a-form-item>

        <a-form-item
          label="营业执照注册号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          fieldDecoratorId="businessLicenseNo"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入营业执照注册号' }, { validator: this.handleEnterpriseCheck } ], validateTrigger: ['change', 'blur'] }">
          <a-input size="large" placeholder="请输入营业执照注册号"/>
        </a-form-item>

        <a-row :gutter="0">
          <a-col :span="14">
            <a-form-item
              fieldDecoratorId="inputCodeVerified"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码' }, { validator: this.validateInputCode }], validateTrigger: ['change', 'blur']}">
              <a-input
                size="large"
                type="text"
                @change="inputCodeChange"
                placeholder="请输入验证码">
                <a-icon slot="prefix" v-if=" inputCodeContent==verifiedCode " type="smile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                <a-icon slot="prefix" v-else type="frown" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col  :span="10">
            <j-graphic-code @success="generateCode" style="float: right"></j-graphic-code>
          </a-col>
        </a-row>

        <a-form-item>
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="register-button"
            :loading="registerBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="registerBtn">注册
          </a-button>
          <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
  import {mixinDevice} from '@/utils/mixin.js'
  import {httpAction} from '@/api/manage'
  import {getDictItemByDictCodeAndItemCode} from '@/components/dict/JDictSelectUtil'
  import ConstConfig from '@/config/constant.config'
  import JGraphicCode from '@/components/jeecg/JGraphicCode'

  const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
  }
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
  }
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a',
  }
  export default {
    name: "Register",
    mixins: [mixinDevice],
    components: {
      JGraphicCode
    },
    data() {
      return {
        formData: {
          username: '',
          password: '',
          enterpriseName: '',
          businessLicenseNo: '',
          enterpriseType: '',
        },
        state: {
          time: 60,
          smsSendBtn: false,
          passwordLevel: 0,
          passwordLevelChecked: false,
          percent: 10,
          progressColor: '#FF0000'
        },
        registerBtn: false,
        url: {
          registerUrl: '/sys/user/register'
        },
        confirmLoading: false,
        labelCol: {
          xs: {span: 28},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        verifiedCode: "",
        inputCodeContent: "",
        inputCodeNull: true,
        inputCodeVerified: "",
      }
    },
    computed: {
      passwordLevelClass() {
        return levelClass[this.state.passwordLevel]
      },
      passwordLevelName() {
        return levelNames[this.state.passwordLevel]
      },
      passwordLevelColor() {
        return levelColor[this.state.passwordLevel]
      }
    },
    mounted() {
      this.initDictConfig()
    },
    methods: {
      initDictConfig() {
        // 初始化字典 - 企业类型
        getDictItemByDictCodeAndItemCode({...ConstConfig.DICT.enterprise_type_review}).then(res => {
          if (res != null) {
            this.formData.enterpriseType = res.itemValue
          }
        })
      },

      handleSubmit() {
        this.form.validateFields(['email', 'password', 'enterpriseName', 'businessLicenseNo', 'inputCodeVerified'], {force: true}, (err, values) => {
          if (!err) {
              this.confirmLoading = true
              this.formData.username = values.email
              this.formData.password = values.password
              this.formData.enterpriseName = values.enterpriseName
              this.formData.businessLicenseNo = values.businessLicenseNo
              httpAction(this.url.registerUrl, this.formData, 'post').then((res) => {
                if (res.success) {
                  this.$router.push({name: 'registerResult', params: {...values}})
                } else {
                  this.$message.error(res.message)
                }
                this.confirmLoading = false;
              }).finally(() => {
                this.confirmLoading = false
              })
            } else {
              return
            }
        })
      },

      handleEnterpriseCheck(rule, value, callback) {
        callback()
      },

      handlePasswordLevel(rule, value, callback) {
        let level = 0
        // 判断这个字符串中有没有数字
        if (/[0-9]/.test(value)) {
          level++
        }
        // 判断字符串中有没有字母
        if (/[a-zA-Z]/.test(value)) {
          level++
        }
        // 判断字符串中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level++
        }
        this.state.passwordLevel = level
        this.state.percent = level * 30
        if (level >= 2) {
          if (level >= 3) {
            this.state.percent = 100
          }
          callback()
        } else {
          if (level === 0) {
            this.state.percent = 10
          }
          callback(new Error('密码强度不够'))
        }
      },

      handlePasswordCheck(rule, value, callback) {
        let password = this.form.getFieldValue('password')
        if (value === undefined) {
          callback(new Error('请输入密码'))
        }
        if (value && password && value.trim() !== password.trim()) {
          callback(new Error('两次密码不一致'))
        }
        callback()
      },

      handlePasswordInputClick() {
        if (!this.isMobile()) {
          this.state.passwordLevelChecked = true
          return;
        }
        this.state.passwordLevelChecked = false
      },
      watch: {
        'state.passwordLevel'(val) {
        }
      },
      validateInputCode(rule,value,callback){
        if(!value || this.verifiedCode==this.inputCodeContent){
          callback();
        }else{
          callback("您输入的验证码不正确!");
        }
      },
      generateCode(value){
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e){
        this.inputCodeContent = e.target.value
        if(!e.target.value||0==e.target.value){
          this.inputCodeNull=true
        }else{
          this.inputCodeContent = this.inputCodeContent.toLowerCase()
          this.inputCodeNull=false
        }
      },
    }
  }
</script>
<style lang="scss">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }


  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="scss" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>