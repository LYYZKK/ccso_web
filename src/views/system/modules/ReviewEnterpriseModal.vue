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
        <h3>企业信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业名称">
          <a-input placeholder="请输入企业名称" v-decorator="['name', validatorRules.name]"/>
        </a-form-item>
        <a-form-item label="LOGO" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="FILE_UPLOAD_ACTION"
            :data="{'isup':1}"
            :headers="FILE_UPLOAD_HEADERS"
            :beforeUpload="beforeUpload"
            @change="handleLogoChange"
          >
            <img v-if="model.logo" :src="IMAGE_REVIEW_URL_RENDER(model.logo)" alt="头像"
                 style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照编号">
          <a-input placeholder="请输入营业执照编号" v-decorator="['businessLicenseNo', validatorRules.businessLicenseNo]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="营业执照文件">
          <a-upload
            name="file"
            :action="FILE_UPLOAD_ACTION"
            :headers="FILE_UPLOAD_HEADERS"
            :data="{'isup':1}"
            v-decorator="['businessLicenseFile', validatorRules.businessLicenseFile]"
            @change="handleBusiLicenseFileChange">
            <a-button>
              <a-icon type="upload"/>
              选择文件
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资本">
          <j-dict-select-tag
            v-decorator="['registeredCapital', validatorRules.registeredCapital]"
            :triggerChange="true"
            placeholder="请选择注册资本"
            dictCode="registered_capital"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网站链接">
          <a-input placeholder="请输入网站链接" v-decorator="['sitesLinks', validatorRules.sitesLinks]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网站简介">
          <a-textarea placeholder="请输入网站简介" v-decorator="['briefIntroduction', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业">
          <j-dict-select-tag
            v-decorator="['industry', {}]"
            :triggerChange="true"
            placeholder="请选择行业"
            dictCode="industry"
          />
        </a-form-item>

        <br/>
        <h3 style="margin-bottom: 20px;">评审主体信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业主体名称">
          <a-input placeholder="请输入企业主体名称" v-decorator="['objectName', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营许可证号码">
          <a-input placeholder="请输入经营许可证号码" v-decorator="['licenseNo', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="坐席规模">
          <j-dict-select-tag
            v-decorator="['positionSize', {}]"
            :triggerChange="true"
            placeholder="请选择坐席规模"
            dictCode="position_size"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="建制地点">
          <a-input placeholder="请输入建制地点" v-decorator="['establishingSite', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="建制年份">
          <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <a-radio-group v-model="businessType">
            <a-radio value="1">服务</a-radio>
            <a-radio value="2">营销</a-radio>
            <a-radio value="3">综合</a-radio>
          </a-radio-group>
        </a-form-item>
        <br/>
        <h3 style="margin-bottom: 20px;">负责人信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人姓名">
          <a-input placeholder="请输入姓名" v-decorator="['responsibleName', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮箱">
          <a-input placeholder="请输入电子邮箱" v-decorator="['email', validatorRules.email]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码">
          <a-input placeholder="请输入手机号码" v-decorator="['tel', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职位">
          <j-dict-select-tag
            v-decorator="['position', {}]"
            :triggerChange="true"
            placeholder="请选择职位"
            dictCode="position"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="性别">
          <j-dict-select-tag
            v-decorator="['sex', {}]"
            :triggerChange="true"
            placeholder="请选择性别"
            dictCode="sex"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出生年份">
          <a-MonthPicker v-decorator="[ 'birthYear', {}]" format="YYYY"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'

  import moment from 'moment'
  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import {httpAction, getAction} from '@/api/manage'
  import ARadioGroup from "ant-design-vue/es/radio/Group"
  import {copy2NewKeyObjeect} from '@/utils/util'

  export default {
    name: 'ReviewEnterpriseModal',
    components: {ARadioGroup},
    mixins: [antMixin, constantCfgMixin],
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
        reviewObjectModel: {},

        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          name: {rules: [{required: true, message: '请输入标题!'}]},
          email: {rules: [{type: 'email', message: '请输入正确的邮箱!'}]},
          logo: {rules: [{required: true, message: '请选择状态!'}]},
          businessLicenseNo: {rules: [{required: true, message: '请输入营业执照编号!'}]},
          businessLicenseFile: {rules: [{required: true, message: '请选择营业执照文件!'}]},
          principal: {rules: [{required: true, message: '请输入负责人!'}]},
          principalPhoneNum: {rules: [{required: true, message: '请输入负责人手机号码!'}]},
          sitesLinks: {rules: [{required: true, message: '请输入网站链接!'}]},
          registeredCapital: {rules: [{required: true, message: '请选择注册资本!'}]}
        },
        url: {
          add: '/sys/enterprise/add',
          edit: '/sys/enterprise/reviewEdit',
          getResponsible: '/review/responsible/queryByEnterpriseId',
          getReviewObject: '/review/object/queryByEnterpriseId',
        },
        uploadLoading: false,
        businessType: '',
      }
    },
    methods: {
      handleLogoChange(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'logo'})
      },
      handleBusiLicenseFileChange(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'businessLicenseFile'})
      },
      beforeUpload: function (file) {
        var fileType = file.type;
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.businessType = ''
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'name', 'logo', 'enterpriseType', 'businessLicenseNo', 'businessLicenseFile',
            'registeredCapital', 'sitesLinks', 'briefIntroduction', 'industry'))
          getAction(this.url.getResponsible, {enterpriseId: record.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['name', 'email', 'tel', 'position', 'sex'],
                {
                  name: 'responsibleName'
                }))
              this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
            }
          })
          getAction(this.url.getReviewObject, {enterpriseId: record.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                {
                  name: 'objectName'
                }))
              this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
              this.businessType = res.result.businessType
            }
          })
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
            let formData = Object.assign(this.model, values, this.files)
            formData.businessType = this.businessType;
            //时间格式化
            console.log('send request with formData =', formData)
            formData.businessTypes = this.businessType
            httpAction(this.url.edit, formData, 'put').then((res) => {
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
        this.businessType = ''
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
