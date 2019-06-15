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
          label="备注信息">
          <a-textarea placeholder="请输入备注信息" v-decorator="['remark', {}]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import {postAction} from '@/api/manage'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import ATextarea from "ant-design-vue/es/input/TextArea";

  export default {
    name: 'Start',
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
          startUrl: '/review/project/start',
        },
        form: this.$form.createForm(this),
        reviewProjectId: ''
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
          let formData = Object.assign(this.model, values)
          postAction(this.url.startUrl, {
            remark: formData.remark,
            id: this.reviewProjectId
          }).then((res) => {
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
