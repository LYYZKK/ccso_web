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
            :action="FILE_UPLOAD_ACTION"
            :headers="FILE_UPLOAD_HEADERS"
            ref="personalPhotoUpload"
            :beforeUpload="beforeUpload"
            @change="handleChange_1"
          >
            <img v-if="model.personalPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.personalPhoto)" alt="个人照片" style="height:104px;max-width:300px"/>
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
            :action="FILE_UPLOAD_ACTION"
            :data="{'isup':1}"
            :headers="FILE_UPLOAD_HEADERS"
            :beforeUpload="beforeUpload"
            @change="handleChange_2"
          >
            <img v-if="model.frontIdCardPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.frontIdCardPhoto)" alt="证件照正面"
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
            :action="FILE_UPLOAD_ACTION"
            :data="{'isup':1}"
            :headers="FILE_UPLOAD_HEADERS"
            :beforeUpload="beforeUpload"
            @change="handleChange_3"
          >
            <img v-if="model.reverseIdCardPhoto" :src="IMAGE_REVIEW_URL_RENDER(model.reverseIdCardPhoto)" alt="证件照反面"
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
            :action="FILE_UPLOAD_ACTION"
            :data="{'isup':1}"
            :headers="FILE_UPLOAD_HEADERS"
            :beforeUpload="beforeUpload"
            @change="handleChange_4"
          >
            <img v-if="model.certificatePhoto" :src="IMAGE_REVIEW_URL_RENDER(model.certificatePhoto)" alt="证书照片"
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
        <a-form-item label="角色分配" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
  import {queryall} from '@/api/api'

  export default {
    name: 'PersonnelModal',
    mixins: [antMixin, constantCfgMixin],
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
          edit: '/sys/personnel/edit',
          enterpriseUrl: '/sys/enterprise/queryIdAndNameAll',
          roleUrl: "/sys/role/queryIdAndNameAll",
        },
        uploadLoading: false,
        enterpriseData: [],
        roleData: [],
        selectedRole: [],
        roleList: [],
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
        queryall().then((res) => {
          if (res.success) {
            this.roleList = res.result;
          } else {
            console.log(res.message);
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
      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'name', 'personalPhoto', 'idCard', 'frontIdCardPhoto', 'reverseIdCardPhoto', 'sex', 'email', 'phoneNum', 'certificateType', 'certificateNo', 'certificatePhoto', 'enterpriseId', 'roleIds'))
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
            formData.roleIds = this.selectedRole.length>0?this.selectedRole.join(","):''
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
        this.UPLOAD_CHANGE_HANDLER(input, 'personalPhoto')
      },
      handleChange_2(input) {
        this.UPLOAD_CHANGE_HANDLER(input, 'frontIdCardPhoto')
      },
      handleChange_3(input) {
        this.UPLOAD_CHANGE_HANDLER(input, 'reverseIdCardPhoto')
      },
      handleChange_4(input) {
        this.UPLOAD_CHANGE_HANDLER(input, 'certificatePhoto')
      },
    }
  }
</script>

<style scoped>

</style>
