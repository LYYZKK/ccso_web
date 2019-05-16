<template>
  <div class="main">
    <a-spin :spinning="confirmLoading">
      <a-form class="user-layout-login" ref="formData" :autoFormCreate="(form)=>{this.form = form}" id="formData">
        <a-form-item
          fieldDecoratorId="username"
          :fieldDecoratorOptions="{rules: [{ required: true, type: 'email', message: '请输入帐户邮箱' }], validateTrigger: 'change'}">
          <a-input size="large" type="text" placeholder="请输入邮箱账户" style="margin-top: 15%;">
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            @click.stop.prevent="handleSubmit()"
            :disabled="loginBtn">确定
          </a-button>
        </a-form-item>


        <div class="user-login-other">
          <div style="float: left">
            <router-link class="login" :to="{ name: 'login' }">
              使用已有账户登录
            </router-link>
          </div>
          <div style="float: right">
            <router-link class="register" :to="{ name: 'register' }">
              注册账户
            </router-link>
            <span class="no-account">还没有账户？</span>
          </div>
        </div>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
  import {httpAction} from '@/api/manage'

  export default {
    name: 'ForgotPassword',
    data() {
      return {
        loginBtn: false,
        formData: {
          username: ''
        },
        url: {
          retrievePasswordUrl: '/sys/retrievePassword',
        },
        confirmLoading: false
      }
    },
    created() {
    },
    methods: {
      handleSubmit() {
        this.form.validateFields(['username'], {force: true}, (err, values) => {
          if (!err) {
            this.confirmLoading = true
            this.formData.username = values.username
            httpAction(this.url.retrievePasswordUrl, this.formData, 'post').then((res) => {
              this.confirmLoading = false;
              if (res.success) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            }).finally(() => {
              this.confirmLoading = false
            })
          } else {
            return
          }
        })
      }
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