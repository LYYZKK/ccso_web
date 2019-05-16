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
          label="模板名称">
          <a-input placeholder="请输入模板名称" v-decorator="['name', validatorRules.name]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="说明">
          <a-textarea placeholder="请输入说明" :autosize="{ minRows: 2, maxRows: 6 }" v-decorator="['description', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件地址">
          <a-input placeholder="请输入文件地址" v-decorator="['downloadUrl', validatorRules.downloadUrl]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="权限标识">
          <a-input placeholder="请输入权限标识" v-decorator="['permissionSid', validatorRules.permissionSid]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'

  import antMixin from '@/mixins/ant-mixin'
  import { httpAction } from '@/api/manage'

  export default {
    name: 'ReviewTemplateModal',
    mixins: [antMixin],
    data () {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          name: {rules: [{required: true, message: '请输入模板名称!'}]},
          downloadUrl: {rules: [{required: true, message: '请输入文件文件地址!'}]},
          permissionSid: {rules: [{required: true, message: '请输入权限标识!'}]},
        },
        url: {
          add: '/review/reviewTemplate/add',
          edit: '/review/reviewTemplate/edit',
        }
      }
    },
    created () {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'name', 'description', 'downloadUrl', 'permissionSid'))
		    //时间格式化
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let httpurl = '', method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            let formData = Object.assign(this.model, values)
            //时间格式化

            console.log('send request with formData =', formData)
            httpAction(httpurl, formData, method).then((res)=>{
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
        })
      },
      handleCancel() {
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
