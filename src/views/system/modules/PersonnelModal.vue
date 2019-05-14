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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['name', {}]"/>
        </a-form-item>
        <a-form-item label="个人照片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="uploadAction"
            :headers="headers"
            ref="personalPhotoUpload"
            :beforeUpload="beforeUpload"
            @change="handleChange_1"
          >
            <img v-if="model.personalPhoto" :src="getThumbnailView(1)" alt="个人照片" style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份证号码">
          <a-input placeholder="请输入身份证号码" v-decorator="['idCard', {}]"/>
        </a-form-item>
        <a-form-item label="证件照正面" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange_2"
          >
            <img v-if="model.frontIdCardPhoto" :src="getThumbnailView(2)" alt="证件照正面"
                 style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="证件照反面" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange_3"
          >
            <img v-if="model.reverseIdCardPhoto" :src="getThumbnailView(3)" alt="证件照反面"
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
          label="出生日期">
          <a-date-picker v-decorator="[ 'birthDate', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子邮箱">
          <a-input placeholder="请输入电子邮箱" v-decorator="['email', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机号码">
          <a-input placeholder="请输入手机号码" v-decorator="['phoneNum', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证书类型">
          <j-dict-select-tag
            v-decorator="['certificateType', {}]"
            :triggerChange="true"
            placeholder="请选择证书类型"
            dictCode="certificate_type"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证书编号">
          <a-input placeholder="请输入证书编号" v-decorator="['certificateNo', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证书日期">
          <a-date-picker v-decorator="[ 'certificateDate', {}]"/>
        </a-form-item>
        <a-form-item label="证书照片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            listType="picture-card"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange_4"
          >
            <img v-if="model.certificatePhoto" :src="getThumbnailView(4)" alt="证书照片"
                 style="height:104px;max-width:300px"/>
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属企业">
          <a-select
            v-model="model.enterpriseId"
            showSearch
            :filterOption="filterOption"
            placeholder="请选择所属企业"
            v-decorator="['enterpriseId', {}]"
          >
            <a-select-option value="">请选择</a-select-option>
            <a-select-option
              v-for="(_type, key) in enterpriseData"
              :key="key"
              :value="_type.id"
            >{{ _type.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="人员角色">
          <a-select
            v-model="model.roleId"
            showSearch
            :filterOption="filterOption"
            placeholder="请选择所属企业"
            v-decorator="['roleId', {}]"
          >
            <a-select-option value="">请选择</a-select-option>
            <a-select-option
              v-for="(_type, key) in roleData"
              :key="key"
              :value="_type.id"
            >{{ _type.roleName }}
            </a-select-option>
          </a-select>

        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'
  import Vue from 'vue'

  import antMixin from '@/mixins/ant-mixin'
  import {UPLOAD_CHANGE_HANDLER} from '@/mixins/constant.cfg'
  import {httpAction, getAction} from '@/api/manage'
  import {ACCESS_TOKEN} from "@/store/mutation-types"

  export default {
    name: 'PersonnelModal',
    mixins: [antMixin],
    data() {
      return {
        title: '操作',
        visible: false,
        model: {},
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
        validatorRules: {},
        url: {
          add: '/sys/personnel/add',
          enterpriseUrl: '/sys/enterprise/queryIdAndNameAll',
          roleUrl: "/sys/role/queryIdAndNameAll",
          edit: '/sys/personnel/edit',
          fileUpload: window._CONFIG['domainURL'] + "/sys/common/upload",
          imgerver: window._CONFIG['domainURL'] + "/sys/common/view",
        },
        uploadLoading: false,
        enterpriseData: [],
        roleData: [],
      }
    },
    created() {
      const token = Vue.ls.get(ACCESS_TOKEN);
      this.headers = {"X-Access-Token": token}
    },
    computed: {
      uploadAction: function () {
        return this.url.fileUpload;
      }
    },
    mounted() {
      this.initSelectOptions()
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
      },

      getThumbnailView(judge) {
        if (judge === 1) {
          return this.url.imgerver + "/" + this.model.personalPhoto;
        } else if (judge === 2) {
          return this.url.imgerver + "/" + this.model.frontIdCardPhoto;
        } else if (judge === 3) {
          return this.url.imgerver + "/" + this.model.reverseIdCardPhoto;
        } else if (judge === 4) {
          return this.url.imgerver + "/" + this.model.certificatePhoto;
        }
      },

      beforeUpload: function (file) {
        var fileType = file.type;
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片');
          return false;
        }
        //TODO 验证文件大小
      },

      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'name', 'personalPhoto', 'idCard', 'frontIdCardPhoto', 'reverseIdCardPhoto', 'sex', 'email', 'phoneNum', 'certificateType', 'certificateNo', 'certificatePhoto', 'enterpriseId', 'roleId'))
          //时间格式化
          this.form.setFieldsValue({birthDate: this.model.birthDate ? moment(this.model.birthDate) : null})
          this.form.setFieldsValue({certificateDate: this.model.certificateDate ? moment(this.model.certificateDate) : null})
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
            let httpurl = '', method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'
            } else {
              httpurl += this.url.edit
              method = 'put'
            }
            let formData = Object.assign(this.model, values)
            //时间格式化
            formData.birthDate = formData.birthDate ? formData.birthDate.format() : null;
            formData.certificateDate = formData.certificateDate ? formData.certificateDate.format() : null;

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
        })
      },
      handleCancel() {
        this.close()
      },

      handleChange_1(input) {
        UPLOAD_CHANGE_HANDLER(input, 'personalPhoto')
      },

      handleChange_2(input) {
        UPLOAD_CHANGE_HANDLER(input, 'frontIdCardPhoto')
      },

      handleChange_3(input) {
        UPLOAD_CHANGE_HANDLER(input, 'reverseIdCardPhoto')
      },
      handleChange_4(input) {
        UPLOAD_CHANGE_HANDLER(input, 'certificatePhoto')
      },

    }
  }
</script>

<style scoped>

</style>
