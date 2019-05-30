<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <h3>项目信息</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目编号">
          <a-input v-decorator="['no', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前状态">
          <a-input defaultValue="启动中"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评审结果">
          <a-input defaultValue="未知"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新建时间">
          <a-input v-decorator="['createTime', {}]"/>
        </a-form-item>

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
            @change="handleChange"
          >
            <img v-if="model.logo" :src="IMAGE_REVIEW_URL_RENDER(model.logo)" alt="Logo"
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
        <h3 class="devide-title">负责人信息</h3>
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
        <h3 class="devide-title">请选择协调员</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="coordinator-form-item">
          <a-transfer
            :dataSource="mockData"
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
  import pick from 'lodash.pick'

  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import moment from 'moment'
  import {copy2NewKeyObjeect} from '@/utils/util'
  import {getAction} from '@/api/manage'


  export default {
    name: 'Detail',
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
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {},
        url: {
          uploadFileUrl: '/sys/user/queryUserByRoleCode',
          getResponsibleUrl: '/review/responsible/queryByEnterpriseId',
          getReviewObjectUrl: '/review/object/queryByEnterpriseId',
          getPersonnelUrl: '/review/projectUser/queryByProjectAndRoleCode',
        },
        businessType: '',
        isPay: '',
        mockData: [],
        targetKeys: [],
        enterpriseType: '',

      }
    },
    methods: {
      edit(record) {
        this.getPersonnel(record.id)
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'no', 'state', 'isPay', 'result', 'createTime'))
          this.form.setFieldsValue(pick(this.model.sysEnterprises[0], 'name', 'businessLicenseNo', 'logo', 'registeredCapital', 'sitesLinks', 'briefIntroduction', 'industry'))
          // 得到评审负责人信息
          getAction(this.url.getResponsibleUrl, {enterpriseId: record.sysEnterprises[0].id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['name', 'email', 'tel', 'position', 'sex'],
                {
                  name: 'responsibleName', email: 'email', tel: 'tel', position: 'position',
                  sex: 'sex'
                }))
              this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
            }
          })
          // 得到评审主体信息
          getAction(this.url.getReviewObjectUrl, {enterpriseId: record.sysEnterprises[0].id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                {
                  name: 'objectName',
                  establishingSite: 'establishingSite',
                  licenseNo: 'licenseNo',
                  positionSize: 'positionSize'
                }))
              this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
              this.businessType = res.result.businessType
              this.isPay = record.isPay
            }
          })
          //时间格式化
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleCancel() {
        this.close()
      },

      getPersonnel(id) {
        const dataSource = [];
        const targetKeys = [];
        getAction(this.url.getPersonnelUrl, {
          roleCode: 'coordinator',
          reviewProjectId: id
        }).then(res => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              const data = {
                key: i.toString(),
                title: res.result[i]
              }
              targetKeys.push(data.key);
              dataSource.push(data)
            }
            this.targetKeys = targetKeys
            this.mockData = dataSource

          }
        })
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
