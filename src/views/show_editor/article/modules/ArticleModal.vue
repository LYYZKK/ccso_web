<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
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
        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
          <j-dict-select-tag
            v-decorator="['articleState', validatorRules.articleState]"
            :triggerChange="true"
            placeholder="请选择文章状态"
            dictCode="article_state"
          />
        </a-form-item>-->
        <a-form-item>
          <j-editor v-if="refreshEditorStatus" v-model="model.text"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

import { httpAction } from '@/api/manage'

import JEditor from '@/components/jeecg/JEditor'

export default {
  name: 'ArticleModal',
  components: {
    JEditor,
  },
  data() {
    return {
      refreshEditorStatus: false,
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
    refreshEditor() {
      this.refreshEditorStatus = false
      this.$nextTick(() => {
        this.refreshEditorStatus = true
      })
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.refreshEditor()
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
