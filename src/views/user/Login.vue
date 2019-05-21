<template>
  <div class="main">
    <a-form class="user-layout-login" ref="formLogin" :autoFormCreate="(form)=>{this.form = form}" id="formLogin">
      <a-form-item
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{ required: true, type: 'email', message: '请输入帐户邮箱' }], validateTrigger: 'change'}">
        <a-input size="large" type="email" placeholder="请输入帐户邮箱" style="margin-top: 15%;">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}">
        <a-input size="large" type="password" autocomplete="false" placeholder="密码">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
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
              <a-icon slot="prefix" v-if=" inputCodeContent==verifiedCode " type="smile"
                      :style="{ color: 'rgba(0,0,0,.25)' }"/>
              <a-icon slot="prefix" v-else type="frown" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <j-graphic-code @success="generateCode" style="float: right"></j-graphic-code>
        </a-col>
      </a-row>


      <a-form-item>
        <a-checkbox v-model="formLogin.rememberMe">自动登陆</a-checkbox>
        <router-link :to="{ name: 'forgotPassword' }" class="forge-password" style="float: right;">
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn">确定
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <router-link class="register" :to="{ name: 'register' }">
          注册账户
        </router-link>
        <span class="no-account">还没有账户？</span>
      </div>
    </a-form>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import {timeFix} from "@/utils/util"
  import Vue from 'vue'
  import {ACCESS_TOKEN} from "@/store/mutation-types"
  import JGraphicCode from '@/components/jeecg/JGraphicCode'

  export default {
    components: {
      JGraphicCode
    },
    data() {
      return {
        loginBtn: false,
        form: null,
        state: {
          time: 60,
          smsSendBtn: false,
        },
        formLogin: {
          username: "",
          password: "",
          captcha: "",
          mobile: "",
          rememberMe: true
        },
        verifiedCode: "",
        inputCodeContent: "",
        inputCodeNull: true,
        inputCodeVerified: "",
      }
    },
    created() {
      Vue.ls.remove(ACCESS_TOKEN)
    },
    methods: {
      ...mapActions(["Login", "Logout"]),
      handleSubmit() {
        let that = this
        let flag = false

        let loginParams = {
          remember_me: that.formLogin.rememberMe
        };

        // 使用账户密码登陆
        that.form.validateFields(['username', 'password', 'inputCodeVerified'], {force: true}, (err, values) => {
          if (!err) {
            flag = true
            loginParams.username = values.username
            loginParams.password = values.password
          }
        })
        if (!flag) return
        that.loginBtn = true
        that.Login(loginParams).then(() => {
          that.loginSuccess()
        }).catch((err) => {
          that.requestFailed(err);
        })
      },
      loginSuccess() {
        this.loginBtn = false
        // this.$router.push({ name: "dashboard" })
        this.$router.push({path: "/dashboard/analysis"})
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        });
      },
      requestFailed(err) {
        this.$notification['error']({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false;
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

<style lang="scss" scoped>

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 15px;
      line-height: 22px;
      margin-bottom: 24px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, .2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }

      .no-account {
        float: right;
        margin-right: 5px;
      }
    }
  }

</style>