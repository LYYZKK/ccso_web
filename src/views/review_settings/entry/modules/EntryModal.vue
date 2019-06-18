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
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="编号">
          <a-input placeholder="请输入编号" v-decorator="['no', validatorRules.no]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评审需求">
          <a-textarea
            placeholder="请输入评审需求"
            v-decorator="['requirements', validatorRules.requirements]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评审类别">
          <a-select
            v-model="model.categoryId"
            showSearch
            :filterOption="filterSelectOption"
            placeholder="请选择评审类别"
            v-decorator="['categoryId', validatorRules.categoryId]"
          >
            <a-select-option value="">请选择</a-select-option>
            <a-select-option
              v-for="(_type, key) in categoryData"
              :key="key"
              :value="_type.id"
            >{{ _type.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="评审资料">
          <a-select
            v-model="model.informationId"
            showSearch
            :filterOption="filterSelectOption"
            placeholder="请选择评审资料"
            v-decorator="['informationId', validatorRules.informationId]"
          >
            <a-select-option value="">请选择</a-select-option>
            <a-select-option
              v-for="(_type, key) in informationData"
              :key="key"
              :value="_type.id"
            >{{ _type.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-textarea placeholder="请输入描述" v-decorator="['remark', {}]" style="height: 100px"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

import { httpAction, getAction } from '@/api/manage'
import antMixin from '@/mixins/ant-mixin'

export default {
  name: 'EntryModal',
  mixins: [antMixin],
  data() {
    return {
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
      informationData: [],
      categoryData: [
        { id: '1', name: 'far' },
        { id: '3', name: 'fagr' },
      ],
      confirmLoading: false,
      form: this.$form.createForm(this),
      url: {
        add: '/review/entry/add',
        edit: '/review/entry/edit',
        informationUrl: '/review/information/queryIdAndNameAll',
        categoryUrl: '/review/category/queryIdAndNameAll'
      },
      validatorRules: {
        no: { rules: [{ required: true, message: '请输入编号!' }] },
        requirements: { rules: [{ required: true, message: '请输入评审需求!' }] },
        categoryId: { rules: [{ required: true, message: '请选择评审类别!' }] },
        informationId: { rules: [{ required: true, message: '请选择评审资料!' }] }
      }
    }
  },
  mounted() {
    this.initSelectOptions()
  },
  methods: {
    initSelectOptions() {
      // 初始化下拉框 - 评审类别
      getAction(this.url.categoryUrl).then(res => {
        if (res.success) {
          this.categoryData = res.result
        }
      })

      // 初始化下拉框 - 评审资料
      getAction(this.url.informationUrl).then(res => {
        if (res.success) {
          this.informationData = res.result
        }
      })
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'no', 'requirements', 'categoryId', 'informationId', 'remark'))
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
          console.log(formData)
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
