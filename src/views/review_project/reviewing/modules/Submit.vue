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
      <a-form :form="form" v-if="judgeFunction=='sendBack'">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回退信息">
          <a-textarea placeholder="请输入回退信息" v-decorator="['sendBackMsg', {required: true, message: '请输入回退信息！'}]"/>
        </a-form-item>
      </a-form>
      <a-form :form="form" v-else-if="judgeFunction=='postil'">
        <a-form-item
          v-show="postilText!=null"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原批注信息">
            <a-tooltip title="prompt text">
              <span>{{postilText}}</span>
            </a-tooltip>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="批注信息">
          <a-textarea placeholder="请输入批注信息" v-decorator="['postilRemark', {required: true, message: '请输入批注信息！'}]"/>
        </a-form-item>
      </a-form>
      <a-form :form="form" v-else-if="judgeFunction=='reviewProjectSubmit'">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注信息">
          <a-textarea placeholder="请输入备注信息" v-decorator="['submitRemark', {required: true, message: '请输入备注信息！'}]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import {httpAction, getAction} from '@/api/manage'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import ATextarea from "ant-design-vue/es/input/TextArea";

  export default {
    name: 'Submit',
    components: {ATextarea, AFormItem},
    mixins: [antMixin, constantCfgMixin],
    data() {
      return {
        title: '操作',
        visible: false,
        judgeFunction: '',
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
          update: '/review/entryRecord/update',
          reviewSubmit: '/review/project/submitReview',
          getPostil: '/review/entryRecord/list',
        },
        form: this.$form.createForm(this),
        reviewProjectId: '',
        entryRecordId: '',
        judgeResult: '',
        reviewEntryId: '',
        entryRecordFormData: {
          id: '',
          reviewEntryId: '',
          isRight: '',
          reviewProjectId: '',
          remark: '',
        },
        postilText: '',
      }
    },
    methods: {
      editSendBack(id) {
        this.judgeFunction = 'sendBack'
        this.reviewProjectId = id
        this.visible = true
      },
      editPostil(record, judgeResult, reviewProjectId) {
        this.entryRecordId = record.reviewEntryRecord.id
        this.judgeResult = judgeResult;
        this.reviewEntryId = record.id
        this.reviewProjectId = reviewProjectId
        this.judgeFunction = 'postil'
        this.visible = true
        getAction(this.url.getPostil, {
          id: record.reviewEntryRecord.id,
          number: record.reviewEntryRecord.number
        }).then(res => {
          if (res.success) {
            this.postilText = res.result.records[0].remark
          }
          console.log("postilText：" + this.postilText)
        })
      },
      editReviewProjectSubmit(id) {
        this.judgeFunction = 'reviewProjectSubmit'
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
            var url = ''
            var param = {}
            if (this.judgeFunction == 'sendBack') {
              url = this.url.add
              param = {sendBackMsg: values.sendBackMsg, reviewProjectId: this.reviewProjectId}
            } else if (this.judgeFunction == 'postil') {
              url = this.url.update
              this.entryRecordFormData.reviewEntryId = this.reviewEntryId
              this.entryRecordFormData.isRight = this.judgeResult
              this.entryRecordFormData.reviewProjectId = this.reviewProjectId
              this.entryRecordFormData.remark = values.postilRemark
              this.entryRecordFormData.id = this.entryRecordId
              param = this.entryRecordFormData
            } else if (this.judgeFunction == 'reviewProjectSubmit') {
              url = this.url.reviewSubmit
              param = {remark: values.submitRemark, id: this.reviewProjectId}
            }
            httpAction(url, param, 'post').then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
              this.form = this.$form.createForm(this)
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
