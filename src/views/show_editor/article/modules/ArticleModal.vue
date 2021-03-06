<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" :rules="validatorRules">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="标题">
          <a-input placeholder="请输入文章标题" v-decorator="['title', validatorRules.title]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="类型">
          <j-dict-select-tag
            v-decorator="['articleType', validatorRules.articleType]"
            :triggerChange="true"
            placeholder="请选择文章类型"
            dictCode="article_type"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
          <j-dict-select-tag
            v-decorator="['articleState', validatorRules.articleState]"
            :triggerChange="true"
            placeholder="请选择文章状态"
            dictCode="article_state"
          />
        </a-form-item>
        <a-form-item>
          <rich-editor ref="richText" v-if="refreshRichText" v-model="model.text"></rich-editor>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import RichEditor from '@/components/tools/RichEditor'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'

export default {
  name: 'ArticleModal',
  components: {
    RichEditor
  },
  data() {
    return {
      refreshRichText: false,
      editorOption: {},
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      url: {
        add: '/show/article/add',
        edit: '/show/article/edit'
      },
      validatorRules: {
        title: { rules: [{ required: true, message: '请输入标题!' }] },
        articleState: { rules: [{ required: true, message: '请选择状态!' }] },
        articleType: { rules: [{ required: true, message: '请选择类型!' }] }
      }
    }
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.refreshRichText = false
      this.$nextTick(() => {
        this.refreshRichText = true
        this.form.setFieldsValue(pick(this.model, 'title', 'text', 'articleType', 'articleState', 'accessoryUrl'))
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
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
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
