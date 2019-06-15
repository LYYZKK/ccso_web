<template>
  <result
    :isSuccess="activeSuccess"
    :content="false"
    :title="title"
    :description="description">
    <template slot="action">
      <a-button size="large" @click="goHomeHandle">现在登录</a-button>
    </template>
  </result>
</template>

<script>
  import { getAction } from '@/api/manage'

  import Result from '@/views/result/Result'

  export default {
    name: "RegisterResult",
    components: {
      Result
    },
    data() {
      return {
        query: {},
        activeSuccess: true,
        url: '/sys/user/activateAccount'
      }
    },
    computed: {
      title() {
        return this.activeSuccess ? '激活成功' : '激活失败'
      },
      description() {
        return this.activeSuccess ? '你的账户已激活成功，请登录系统' : '账户激活失败，请点击邮件中的链接激活帐户'
      }
    },
    created() {
      getAction(`${window._CONFIG['domainURL']}/${this.url}`, { ...this.$route.query }).then(res => {
        if (!res.success) {
          this.activeSuccess = false
        }
      })
    },
    methods: {
      goHomeHandle () {
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style scoped>

</style>