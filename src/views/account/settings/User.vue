<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <a-form layout="vertical" :form="form">
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="姓名">
                <a-input placeholder="请输入姓名" v-decorator="['name', validatorRules.name]"/>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item label="个人照片">
                <a-upload
                  listType="picture-card"
                  :showUploadList="false"
                  :action="FILE_UPLOAD_ACTION"
                  :headers="FILE_UPLOAD_HEADERS"
                  ref="personalPhotoUpload"
                  :beforeUpload="beforeUpload"
                  @change="handleChange_1"
                  v-decorator="['personalPhoto', validatorRules.personalPhoto]"
                >
                  <img v-if="model.personalPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.personalPhoto)" alt="个人照片"
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
                label="身份证号码">
                <a-input placeholder="请输入身份证号码" v-decorator="['idCard', validatorRules.idCard]"/>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item label="证件照正面">
                <a-upload
                  listType="picture-card"
                  :showUploadList="false"
                  :action="FILE_UPLOAD_ACTION"
                  :data="{'isup':1}"
                  :headers="FILE_UPLOAD_HEADERS"
                  :beforeUpload="beforeUpload"
                  @change="handleChange_2"
                  v-decorator="['frontIdCardPhoto', validatorRules.frontIdCardPhoto]"
                >
                  <img v-if="model.frontIdCardPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.frontIdCardPhoto)" alt="证件照正面"
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
              <a-form-item label="证件照反面">
                <a-upload
                  listType="picture-card"
                  :showUploadList="false"
                  :action="FILE_UPLOAD_ACTION"
                  :data="{'isup':1}"
                  :headers="FILE_UPLOAD_HEADERS"
                  :beforeUpload="beforeUpload"
                  @change="handleChange_3"
                  v-decorator="['reverseIdCardPhoto', validatorRules.reverseIdCardPhoto]"
                >
                  <img v-if="model.reverseIdCardPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.reverseIdCardPhoto)" alt="证件照反面"
                       style="height:104px;max-width:300px"/>
                  <div v-else>
                    <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
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
          </a-row>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="出生日期">
                <a-date-picker v-decorator="[ 'birthDate', validatorRules.birthDate]"/>
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
                <a-input placeholder="请输入手机号码" v-decorator="['phoneNum', validatorRules.phoneNum]"/>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="证书类型">
                <j-dict-select-tag
                  v-decorator="['certificateType', {}]"
                  :triggerChange="true"
                  placeholder="请选择证书类型"
                  dictCode="certificate_type"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="证书编号">
                <a-input placeholder="请输入证书编号" v-decorator="['certificateNo', {}]"/>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="证书日期">
                <a-date-picker v-decorator="[ 'certificateDate', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
              <a-form-item label="证书照片">
                <a-upload
                  listType="picture-card"
                  :showUploadList="false"
                  :action="FILE_UPLOAD_ACTION"
                  :data="{'isup':1}"
                  :headers="FILE_UPLOAD_HEADERS"
                  :beforeUpload="beforeUpload"
                  @change="handleChange_4"
                  v-decorator="['certificatePhoto', {}]"
                >
                  <img v-if="model.certificatePhoto" :src="IMAGE_REVIEW_URL_RENDER(model.certificatePhoto)" alt="证书照片"
                       style="height:104px;max-width:300px"/>
                  <div v-else>
                    <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item label="所属企业">
                <a-select
                  showSearch
                  :value="model.enterpriseId"
                  :filterOption="filterSelectOption"
                  placeholder="请选择所属企业"
                  v-decorator="['enterpriseId', validatorRules.enterpriseId]"
                >
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option
                    v-for="(_type, key) in enterpriseData"
                    :key="key"
                    :value="_type.id"
                  >{{ _type.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="12">
              <a-form-item label="角色分配">
                <a-select
                  mode="multiple"
                  style="width: 100%"
                  placeholder="请选择用户角色"
                  v-model="selectedRole">
                  <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
                    {{ role.roleName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-form-item
                label="个人简介">
                <a-textarea placeholder="请输入个人简介" v-decorator="['individualResume', {}]"/>
              </a-form-item>
            </a-col>
          </a-row>
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

  import {queryall} from '@/api/api'

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
        enterpriseData: [],
        roleData: [],
        selectedRole: [],
        roleList: [],
        url: {
          list: '/sys/personnel/list',
          edit: '/sys/personnel/edit',
          enterpriseUrl: '/sys/enterprise/queryIdAndNameAll',
          roleUrl: '/sys/role/queryIdAndNameAll',
          getRoleDataUrl: '/sys/role/getByUserId',
        },
        validatorRules: {
          name: {rules: [{required: true, message: '请输入标题!'}]},
          idCard: {rules: [{required: true, message: '请输入身份证号码!'}]},
          email: {rules: [{required: true, message: '请输入电子邮箱!'}]},
          phoneNum: {rules: [{required: true, message: '请输入手机号码!'}]},
          birthDate: {rules: [{required: true, message: '请选择出生日期!'}]},
          personalPhoto: {rules: [{required: true, message: '请选择个人照片!'}]},
          frontIdCardPhoto: {rules: [{required: true, message: '请选择身份证正面照!'}]},
          reverseIdCardPhoto: {rules: [{required: true, message: '请选择身份证反面照!'}]},
          enterpriseId: {rules: [{required: true, message: '请选择企业!'}]},
        },
        uploadLoading: false
      }
    },
    methods: {
      initSelectOptions() {
        // 初始化下拉框 - 企业类别
        getAction(this.url.enterpriseUrl).then(res => {
          if (res.success) {
            this.enterpriseData = res.result
          }
        })
        getAction(this.url.roleUrl).then(res => {
          if (res.success) {
            this.roleData = res.result
          }
        })
        queryall().then((res) => {
          if (res.success) {
            this.roleList = res.result;
          }
        });
      },
      beforeUpload: function (file) {
        var fileType = file.type;
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },
      handleChange_1(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'personalPhoto'})
      },
      handleChange_2(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'frontIdCardPhoto'})
      },
      handleChange_3(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'reverseIdCardPhoto'})
      },
      handleChange_4(info) {
        this.UPLOAD_CHANGE_HANDLER({info, fieldName: 'certificatePhoto'})
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            const httpurl = this.url.edit, method = 'put'

            let formData = Object.assign(this.model, values, this.files)
            //时间格式化
            formData.birthDate = formData.birthDate ? formData.birthDate.format() : null;
            formData.roleIds = this.selectedRole.length > 0 ? this.selectedRole.join(",") : ''
            formData.certificateDate = formData.certificateDate ? formData.certificateDate.format() : null;

            console.log('send request with formData =', formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      },
    },
    mounted() {
      getAction(this.url.list, {sysUserId: this.$store.getters.userInfo.id}).then(res => {
        if (res.success && res.result.records && res.result.records.length > 0) {
          this.model = Object.assign({}, res.result.records[0])
          this.$nextTick(() => {
            this.form.setFieldsValue(this.model)
            this.form.setFieldsValue({birthDate: this.model.birthDate ? moment(this.model.birthDate) : null})
            this.form.setFieldsValue({certificateDate: this.model.certificateDate ? moment(this.model.certificateDate) : null})
            this.selectedRole = this.model.roleIds.split(',')
          })
        }
      })
      this.initSelectOptions()
    },
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