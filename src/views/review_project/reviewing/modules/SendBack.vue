<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回退信息">
          <a-textarea placeholder="请输入回退信息" v-decorator="['sendBackMsg', validatorRules.sendBackMsg]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import {httpAction} from '@/api/manage'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import ATextarea from "ant-design-vue/es/input/TextArea";

  export default {
    name: 'SendBack',
    components: {ATextarea, AFormItem},
    mixins: [antMixin, constantCfgMixin],
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16}
        },
        confirmLoading: false,
        url: {
          add: '/review/sendBack/add',
        },
        form: this.$form.createForm(this),
        reviewProjectId: '',
        validatorRules: {
          sendBackMsg: {rules: [{required: true, message: '请输入回退信息！'}]},
        },
        formData: {
          id: '',
          sendBackMsg: '',
        }
      }
    },
    methods: {
      edit(id) {
        this.reviewProjectId = id
        this.visible = true
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        this.confirmLoading = true
        const that = this
        this.form.validateFields((err, values) => {
          if (!err) {
            httpAction(this.url.add, {
              sendBackMsg: values.sendBackMsg,
              reviewProjectId: this.reviewProjectId
            }, 'post').then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
          this.confirmLoading = false
          this.$emit('error', {err})
        })
      },
      handleCancel() {
        this.close()
      },
    }
  }
</script>

<style scoped>
</style>
