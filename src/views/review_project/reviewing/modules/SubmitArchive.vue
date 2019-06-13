<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <h3>电子证书</h3>
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子证书编号">
          <a-input placeholder="请输入电子证书编号" v-decorator="['sendBackMsg', {required: true, message: '请输入回退信息！'}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子证书日期">
          <a-date-picker v-decorator="[ 'sceneBeginTime', {}]" format="YYYY-MM-DD"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子证书上传">
          <a-upload
            name="file"
            :action="FILE_UPLOAD_ACTION"
            :headers="FILE_UPLOAD_HEADERS"
            :data="{'isup':1}"
            v-decorator="['businessLicenseFile']"
            @change="handleChange_2">
            <a-button>
              <a-icon type="upload"/>
              选择文件
            </a-button>
          </a-upload>
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
    name: 'SubmitArchive',
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
          edit: '/review/sendBack/add',
        },
        form: this.$form.createForm(this),
        reviewProjectId: '',
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
            var url = ''
            var param = {}
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
