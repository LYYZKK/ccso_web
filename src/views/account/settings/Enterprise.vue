<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <a-form layout="vertical" :form="form">
          <a-card title="企业信息" :bordered="false">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="企业名称">
                  <a-input placeholder="请输入企业名称" v-decorator="['name', validatorRules.name]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item label="LOGO">
                  <a-upload
                    listType="picture-card"
                    :showUploadList="false"
                    :action="FILE_UPLOAD_ACTION"
                    :data="{'isup':1}"
                    :headers="FILE_UPLOAD_HEADERS"
                    :beforeUpload="beforeUpload"
                    @change="handleLogoChange"
                    v-decorator="['logo', {}]"
                  >
                    <img v-if="model.logo" :src="IMAGE_REVIEW_URL_RENDER(model.logo)" alt="头像"
                         style="height:104px;max-width:300px"/>
                    <div v-else>
                      <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="营业执照编号">
                  <a-input placeholder="请输入营业执照编号" v-decorator="['businessLicenseNo', validatorRules.businessLicenseNo]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
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
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="注册资本">
                  <j-dict-select-tag
                    v-decorator="['registeredCapital', validatorRules.registeredCapital]"
                    :triggerChange="true"
                    placeholder="请选择注册资本"
                    dictCode="registered_capital"
                  />
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="网站链接">
                  <a-input placeholder="请输入网站链接" v-decorator="['sitesLinks', validatorRules.sitesLinks]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="网站简介">
                  <a-textarea placeholder="请输入网站简介" v-decorator="['briefIntroduction', {}]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="行业">
                  <j-dict-select-tag
                    v-decorator="['industry', {}]"
                    :triggerChange="true"
                    placeholder="请选择行业"
                    dictCode="industry"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card title="企业主体名称" :bordered="false">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="企业主体名称">
                  <a-input placeholder="请输入企业主体名称" v-decorator="['objectName', {}]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="经营许可证号码">
                  <a-input placeholder="请输入经营许可证号码" v-decorator="['licenseNo', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="坐席规模">
                  <j-dict-select-tag
                    v-decorator="['positionSize', {}]"
                    :triggerChange="true"
                    placeholder="请选择坐席规模"
                    dictCode="position_size"
                  />
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="建制地点">
                  <a-input placeholder="请输入建制地点" v-decorator="['establishingSite', {}]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="建制年份">
                  <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="业务类型">
                  <a-radio-group v-model="businessType">
                    <a-radio value="1">服务</a-radio>
                    <a-radio value="2">营销</a-radio>
                    <a-radio value="3">综合</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card title="负责人信息" :bordered="false">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="负责人姓名">
                  <a-input placeholder="请输入姓名" v-decorator="['responsibleName', {}]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="电子邮箱">
                  <a-input placeholder="请输入电子邮箱" v-decorator="['email', validatorRules.email]"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="手机号码">
                  <a-input placeholder="请输入手机号码" v-decorator="['tel', {}]"/>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="职位">
                  <j-dict-select-tag
                    v-decorator="['position', {}]"
                    :triggerChange="true"
                    placeholder="请选择职位"
                    dictCode="position"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="性别">
                  <j-dict-select-tag
                    v-decorator="['sex', {}]"
                    :triggerChange="true"
                    placeholder="请选择性别"
                    dictCode="sex"
                  />
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="12">
                <a-form-item
                  label="出生年份">
                  <a-MonthPicker v-decorator="[ 'birthYear', {}]" format="YYYY"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-form-item>
            <a-button type="primary" @click="handleOk">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'

  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'

  import {getAction, httpAction} from '@/api/manage'
  import {copy2NewKeyObject} from '@/utils/util'

  export default {
    mixins: [antMixin, constantCfgMixin],
    data () {
      return {
        form: this.$form.createForm(this),
        model: {},
        // cropper
        preview: {},
        option: {
          img: '/avatar2.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 180,
          autoCropHeight: 180,
          fixedBox: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        },
        url: {
          edit: '/sys/enterprise/reviewEdit',
          getResponsible: '/review/responsible/queryByEnterpriseId',
          getReviewObject: '/review/object/queryByEnterpriseId',
          getEnterpriseDataByUserIdUrl: '/sys/enterprise/getByUserId',
        },
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
        businessType: '',
        uploadLoading: false
      }
    },
    mounted() {
      this.form.resetFields()
      this.businessType = ''
      this.$nextTick(() => {
        getAction(this.url.getEnterpriseDataByUserIdUrl, { userId: this.$store.getters.userInfo.id }).then(res => {
          if (res.success) {
            this.enterpriseData = pick(res.result, 'id', 'name', 'logo', 'enterpriseType', 'businessLicenseNo', 'businessLicenseFile',
              'registeredCapital', 'sitesLinks', 'briefIntroduction', 'industry')
            this.form.setFieldsValue(this.enterpriseData)
            this.model = Object.assign({}, this.model, this.enterpriseData)

            getAction(this.url.getResponsible, {enterpriseId: res.result.id}).then((res) => {
              if (res.success) {
                this.responsibleData = copy2NewKeyObject(
                  res.result, ['id', 'name', 'email', 'tel', 'position', 'sex'],
                  {
                    id: 'responsibleId', name: 'responsibleName'
                  })
                this.form.setFieldsValue(this.responsibleData)
                this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
                this.responsibleData.birthYear = res.result.birthYear ? moment(res.result.birthYear) : null
                this.model = Object.assign({}, this.model, this.responsibleData)
              }
            })
            getAction(this.url.getReviewObject, {enterpriseId: res.result.id}).then((res) => {
              if (res.success) {
                this.reviewObjectData = copy2NewKeyObject(
                  res.result, ['id', 'name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                  {
                    id: 'objectId', name: 'objectName'
                  })
                this.form.setFieldsValue(this.reviewObjectData)
                this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
                this.reviewObjectData.establishingYear = res.result.establishingYear ? moment(res.result.establishingYear) : null
                this.businessType = res.result.businessType
                this.model = Object.assign({}, this.model, this.reviewObjectData)
              }
            })
          }
        })
      })
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
      handleOk() {
        const that = this

        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let formData = Object.assign(this.model, values, this.files)
            formData.businessType = this.businessType;
            //时间格式化
            console.log('send request with formData =', formData)
            formData.businessTypes = this.businessType
            httpAction(this.url.edit, formData, 'put').then((res) => {
              if (res.success) {
                that.$message.success(res.message)
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>