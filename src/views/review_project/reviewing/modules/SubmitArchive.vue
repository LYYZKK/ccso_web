<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <h3 class="devide-title">评审统计</h3>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination=false
        :loading="loading">
      </a-table>
      <br/>
      <h3 class="devide-title">电子证书</h3>
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子证书编号">
          <a-input placeholder="请输入电子证书编号" v-decorator="['certificateNo', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子证书日期">
          <a-date-picker v-decorator="[ 'certificateDate', {}]" format="YYYY-MM-DD"/>
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
            v-decorator="['certificateFile', {}]"
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
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import {getAction,httpAction} from '@/api/manage'

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
          submitArchiveUrl: '/review/project/submitArchive',
          getRecordStatistics: '/review/entryRecord/getRecordStatistics',
        },
        form: this.$form.createForm(this),
        reviewProjectId: '',
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => {
              return parseInt(index) + 1
            }
          },
          {
            title: '评审类别名称',
            align: 'center',
            dataIndex: 'categoryName'
          },
          {
            title: '评判条目总量',
            align: 'center',
            dataIndex: 'enrtyNum'
          },
          {
            title: '符合数量',
            align: 'center',
            dataIndex: 'correctEnrtyNum'
          },
          {
            title: '不符合数量',
            align: 'center',
            dataIndex: 'noCorrectEnrtyNum'
          },
          {
            title: '不适合数量',
            align: 'center',
            dataIndex: 'inconformityEnrtyNum'
          },
          {
            title: '达标占比',
            align: 'center',
            dataIndex: 'standardValue'
          },
          {
            title: '符合占比',
            align: 'center',
            dataIndex: 'correctProportion'
          },
          {
            title: '是否通过',
            align: 'center',
            dataIndex: 'isOk',
            customRender: text => {
              if (text == 1) {
                return '通过'
              } else {
                return '不通过'
              }
            }
          },
        ],
        dataSource: [],
        formData: {
          certificateNo: '',
          certificateDate: '',
          certificateFile: null,
          id: ''
        },
      }
    },
    methods: {
      handleChange(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'certificateFile'})
      },
      edit(id) {
        this.reviewProjectId = id
        getAction(this.url.getRecordStatistics, {
          reviewProjectId: this.reviewProjectId
        }).then((res) => {
          if (res.success) {
            this.dataSource = res.result
          }
        });
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
            this.formData.certificateNo = values.certificateNo ? values.certificateNo : null
            this.formData.certificateDate = values.certificateDate ? values.certificateDate.format('YYYY-MM-DD HH:mm:ss') : null
            if (values.certificateFile != null) {
              if (values.certificateFile.file != null) {
                this.formData.certificateFile = values.certificateFile.file.response.message
              } else {
                this.formData.certificateFile = values.certificateFile
              }
            }
            this.formData.id = this.reviewProjectId
            httpAction(this.url.submitArchiveUrl, this.formData, 'post').then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
              // this.form = this.$form.createForm(this)
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
  .devide-title {
    margin-bottom: 20px;
  }
</style>
