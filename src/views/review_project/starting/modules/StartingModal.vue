<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
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
          <a-input placeholder="请输入企业名称" v-decorator="['name', validatorRules.name]" :disabled="true"/>
        </a-form-item>
        <a-form-item label="LOGO" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="FILE_UPLOAD_ACTION"
            :data="{'isup':1}"
            :headers="FILE_UPLOAD_HEADERS"
            :beforeUpload="beforeUpload"
            @change="handleChange"
            v-decorator="['logo', {}]"
          >
            <img v-if="model.logo" :src="IMAGE_REVIEW_URL_RENDER(model.logo)" alt="LOGO"
                 class="logo-img"/>
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
            @change="handleChange_2">
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
        <h3 class="devide-title">评审主体信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业主体名称">
          <a-input placeholder="请输入企业主体名称" v-decorator="['objectName', validatorRules.objectName]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营许可证号码">
          <a-input placeholder="请输入经营许可证号码" v-decorator="['licenseNo', validatorRules.licenseNo]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="坐席规模">
          <j-dict-select-tag
            v-decorator="['positionSize', validatorRules.positionSize]"
            :triggerChange="true"
            placeholder="请选择坐席规模"
            dictCode="position_size"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="建制地点">
          <a-input placeholder="请输入建制地点" v-decorator="['establishingSite', validatorRules.establishingSite]"/>
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
        <h3 class="devide-title">负责人信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人姓名">
          <a-input placeholder="请输入姓名" v-decorator="['responsibleName', validatorRules.responsibleName]"/>
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
          <a-input placeholder="请输入手机号码" v-decorator="['tel', validatorRules.tel]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职位">
          <j-dict-select-tag
            v-decorator="['position', validatorRules.position]"
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
            v-decorator="['sex', validatorRules.sex]"
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
        <h3 class="devide-title">请选择协调员</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="coordinator-form-item">
          <a-transfer
            :dataSource="coordinators"
            :filterOption="filterTransferOption"
            :targetKeys="targetKeys"
            showSearch
            @change="handleChange_coordinator"
            :titles="['可选协调员', '已选协调员']"
            :render="item => item.title"
          >
          </a-transfer>
        </a-form-item>
        <h3 class="devide-title">请选择支付信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="支付状态">
          <a-radio-group v-model="isPay">
            <a-radio value="0">未支付</a-radio>
            <a-radio value="1">已支付</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import async from 'async'
  import moment from 'moment'
  import pick from 'lodash.pick'

  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'

  import {copy2OldObject, copy2NewKeyObject} from '@/utils/util'
  import {httpAction, getAction} from '@/api/manage'
  import {getDictItemByDictCodeAndItemCode} from '@/components/dict/JDictSelectUtil'
  import ConstConfig from '@/config/constant.config'

  export default {
    name: 'StartingModal',
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
        validatorRules: {
          name: {rules: [{required: true, message: '请输入企业名称!'}]},
          businessLicenseNo: {rules: [{required: true, message: '请输入营业执照编号!'}]},
          businessLicenseFile: {rules: [{required: true, message: '请上传营业执照文件!'}]},
          registeredCapital: {rules: [{required: true, message: '请选择注册资本!'}]},
          sitesLinks: {rules: [{required: true, message: '请输入网站链接!'}]},

          objectName: {rules: [{required: true, message: '请输入企业主体名称!'}]},
          licenseNo: {rules: [{required: true, message: '请输入经营许可证号码!'}]},
          positionSize: {rules: [{required: true, message: '请选择坐席规模!'}]},
          establishingSite: {rules: [{required: true, message: '请输入建制地点!'}]},

          responsibleName: {rules: [{required: true, message: '请输入姓名!'}]},
          email: {rules: [{required: true, message: '请输入电子邮箱!'}]},
          tel: {rules: [{required: true, message: '请输入手机号码!'}]},
          position: {rules: [{required: true, message: '请选择职位!'}]},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          add: '/review/project/add',
          edit: '/review/project/edit',
          getAccountByRoleCodeUrl: '/sys/user/queryUserByRoleCode',
          getEnterpriseDataByUserIdUrl: '/sys/enterprise/getByUserId',
          getResponsibleUrl: '/review/responsible/queryByEnterpriseId',
          getReviewObjectUrl: '/review/object/queryByEnterpriseId',
        },
        businessType: '',
        isPay: '0',
        coordinators: [],
        targetKeys: [],
        uploadLoading: false,
        enterpriseType: ''
      }
    },
    created() {
      // 初始化 - 评审企业类型值
      getDictItemByDictCodeAndItemCode({...ConstConfig.DICT.enterprise_type_review}).then(res => {
        if (res != null) {
          this.enterpriseType = res.itemValue
        }
      })
    },
    methods: {
      handleChange_2(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'businessLicenseFile'})
      },
      handleChange(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'logo'})
      },
      beforeUpload: function (file) {
        var fileType = file.type
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片')
          return false
        }
        //TODO 验证文件大小
      },
      add() {
        async.series(
          {
            coordinators: async cb => {
              getAction(this.url.getAccountByRoleCodeUrl, {roleCode: 'coordinator'}).then(res => {
                if (res.success) {
                  const dataSource = []
                  for (let i = 0; i < res.result.length; i++) {
                    const data = {
                      key: i.toString(),
                      title: res.result[i].name,
                      userId: res.result[i].id
                    }
                    dataSource.push(data)
                  }
                  cb(null, dataSource)
                }
              })
            },
            enterpriseData: async cb => {
              getAction(this.url.getEnterpriseDataByUserIdUrl, { userId: this.$store.getters.userInfo.id }).then(res => {
                if (res.success) {
                  this.enterpriseId = res.result.id
                  cb(null, res.result || {})
                }
              })
            },
            responsibleData: async cb => {
              getAction(this.url.getResponsibleUrl, {enterpriseId: this.enterpriseId}).then((res) => {
                if (res.success) {
                  cb(null, res.result || {})
                }
              })
            },
            reviewObjectData: async cb => {
              getAction(this.url.getReviewObjectUrl, {enterpriseId: this.enterpriseId}).then((res) => {
                if (res.success) {
                  cb(null, res.result || {})
                }
              })
            }
          },
          (err, result) => {
            if (!err) {
              this.coordinators = result.coordinators
              // 企业信息
              copy2OldObject(this.model, result.enterpriseData)
              // 负责人信息
              this.model.reviewResponsible = result.responsibleData

              this.visible = true

              this.$nextTick(() => {
                // 负责人信息
                this.form.setFieldsValue(copy2NewKeyObject(result.responsibleData, ['id', 'name', 'email', 'tel', 'position', 'sex'], {
                  id: 'responsibleId', name: 'responsibleName'
                }))
                this.form.setFieldsValue({birthYear: result.responsibleData.birthYear ? moment(result.responsibleData.birthYear) : null})

                // 企业信息
                this.form.setFieldsValue(pick(this.model,
                  'name',
                  'logo',
                  'businessLicenseNo',
                  'businessLicenseFile',
                  'registeredCapital',
                  'sitesLinks',
                  'briefIntroduction',
                  'industry')
                )

                // 评审主体
                this.form.setFieldsValue(copy2NewKeyObject(
                  result.reviewObjectData, ['id', 'name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                  {
                    id: 'objectId',
                    name: 'objectName'
                  })
                )
                this.form.setFieldsValue({establishingYear: result.reviewObjectData.establishingYear ? moment(result.reviewObjectData.establishingYear) : null})
              })
            }
          }
        )
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
            let formData = Object.assign(this.model, values, this.files)
            //时间格式化
            var selectedCoordinator = []
            if (this.targetKeys.length > 0) {
              for (var i = 0; i < this.targetKeys.length; i++) {
                selectedCoordinator.push(this.personnel[this.targetKeys[i]].userId)
              }
            }
            formData.coordinatorIds = selectedCoordinator.join(',')
            formData.enterpriseType = this.enterpriseType
            formData.isPay = this.isPay
            formData.businessType = this.businessType
            console.log('send request with formData =', formData)
            httpAction(httpurl, formData, method).then((res) => {
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
          this.$emit('error', {err})
        })
      },
      handleCancel() {
        this.close()
      },
      getCoordinators() {

      },
      getEnterpriseData() {

      },
      handleChange_coordinator(targetKeys) {
        this.targetKeys = targetKeys
      }
    }
  }
</script>

<style scoped>
  .coordinator-form-item {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .logo-img {
    height: 104px;
    max-width: 300px;
  }

  .devide-title {
    margin-bottom: 20px;
  }
</style>
