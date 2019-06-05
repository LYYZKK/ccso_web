<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
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
            @change="handleUploadChange"
          >
            <img v-if="model.logo" :src="IMAGE_REVIEW_URL_RENDER(model.logo)" alt="LOGO"
                 class="logo-img"/>
            <div v-else>
              <a-icon :type="uploading ? 'loading' : 'plus'"/>
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
        <h3 class="devide-title">已选择协调员</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="coordinator-form-item">
          <a-transfer
            :dataSource="coordinator"
            :filterOption="filterTransferOption"
            :targetKeys="targetKeys_1"
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

        <h3 class="devide-title">评审资料</h3>
        <a-form-item>
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource_1"
            :pagination=false
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-upload
            name="file"
            @change="handleUploadChange">
            <a-button>
                <a-icon type="upload"/>
                选择文件
            </a-button>
          </a-upload>
        </span>
          </a-table>
        </a-form-item>
        <h3 class="devide-title">请选择计划时间</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资料评审计划开始">
          <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY-MM"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资料评审计划结束">
          <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY-MM"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现场评审计划开始">
          <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY-MM"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现场评审计划结束">
          <a-MonthPicker v-decorator="[ 'establishingYear', {}]" format="YYYY-MM"/>
        </a-form-item>
        <h3 class="devide-title">请选择评审员</h3>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="coordinator-form-item">
          <a-transfer
            :dataSource="reviewer"
            :filterOption="filterTransferOption"
            :targetKeys="targetKeys_2"
            showSearch
            @change="handleChange_reviewer"
            :titles="['可选评审员', '已选评审员']"
            :render="item => item.title"
          >
          </a-transfer>
        </a-form-item>
        <h3 class="devide-title">评审现场记录</h3>
        <a-form-item>
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource_2"
            :pagination=false
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-upload
            name="file"
            :action="url.uploadInformationFileUrl"
            :headers="FILE_UPLOAD_HEADERS"
            :data="{'reviewInformationId':record.informationId, 'reviewProjectId':reviewProjectId,'type':1, 'reviewInformationFileId': record.reviewInformationFileId}"
            @change="handleUploadChange">
            <a-button>
                <a-icon type="upload"/>
                选择文件
            </a-button>
          </a-upload>
        </span>
          </a-table>
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
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {httpAction} from '@/api/manage'
  import ATextarea from "ant-design-vue/es/input/TextArea";


  export default {
    name: 'Detail',
    components: {ATextarea},
    mixins: [antMixin, constantCfgMixin, JeecgListMixin],
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
          uploadInformationFileUrl: `${window._CONFIG['domainURL']}/review/information/file/upload`,
          getResponsibleUrl: '/review/responsible/queryByEnterpriseId',
          getReviewObjectUrl: '/review/object/queryByEnterpriseId',
          getByProjectAndRoleCode: '/review/projectUser/queryByProjectAndRoleCode',
          list: '/review/information/getInformationAndFile',
          edit: '/review/project/edit',
          getAccountByRoleCodeUrl: '/sys/user/queryUserByRoleCode'
        },
        businessType: '',
        isPay: '',
        coordinator: [],
        targetKeys_1: [],
        targetKeys_2: [],
        reviewer: [],
        enterpriseType: '',
        uploading: false,
        // 表头
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
            title: '文件名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '限传格式',
            align: 'center',
            dataIndex: 'format'
          },
          {
            title: '限传大小',
            align: 'center',
            dataIndex: 'size',
            customRender: text => {
              return text + "M"
            }
          },
          {
            title: '上传状态',
            align: 'center',
            dataIndex: 'path',
            customRender: text => {
              if (text != null) {
                return ( < a
                href = {text} > 查看文件 < /a>)
              } else {
                return ( < font
                color = "red" > 未上传 < /font>)
              }
            }
          },
          {
            title: '上传时间',
            align: 'center',
            dataIndex: 'updateTime'
          },
          {
            title: '上传人员',
            align: 'center',
            dataIndex: 'updateBy'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
          }
        ],
        reviewProjectId: '',
        selectdCoordinator: [],
        sysEnterprise: {
          id: '',
          name: '',
          businessLicenseNo: '',
          logo: '',
          registeredCapital: '',
          sitesLinks: '',
          briefIntroduction: '',
          industry: '',
        },
        reviewResponsible: {
          id: '',
          name: '',
          email: '',
          tel: '',
          position: '',
          sex: '',
        },
        reviewObject: {
          id: '',
          name: '',
          establishingSite: '',
          establishingYear: '',
          licenseNo: '',
          positionSize: '',
        },

      }
    },
    methods: {
      beforeUpload: function (file) {
        var fileType = file.type
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片')
          return false
        }
        //TODO 验证文件大小
      },

      handleUploadChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file.response.success) {
            this.$message.success('上传成功！');
            this.getInformation(this.reviewProjectId);
          } else {
            this.$message.error(info.file.response.message);
          }
        } else if (info.file.status === 'error') {
          this.$message.error(`上传失败！`);
        }
      },

      edit(record) {
        this.reviewProjectId = record.id
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.getSelectedPersonnelByRoleCode(record.id, "coordinator")
        this.getSelectedPersonnelByRoleCode(record.id, "reviewer")
        this.getInformation(record.id)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'no', 'state', 'isPay', 'result', 'createTime'))

          // 得到评审企业信息
          this.form.setFieldsValue(copy2NewKeyObjeect(this.model.sysEnterprise, ['id', 'name', 'businessLicenseNo', 'logo', 'registeredCapital',
            'sitesLinks', 'briefIntroduction', 'industry'], {
            id: 'sysEnterpriseId',
            name: 'name',
            businessLicenseNo: 'businessLicenseNo',
            logo: 'logo',
            registeredCapital: 'registeredCapital',
            sitesLinks: 'sitesLinks',
            briefIntroduction: 'briefIntroduction',
            industry: 'industry'
          }))

          // 得到评审负责人信息
          getAction(this.url.getResponsibleUrl, {enterpriseId: record.sysEnterprise.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(res.result, ['id', 'name', 'email', 'tel', 'position', 'sex'], {
                id: 'responsibleId', name: 'responsibleName', email: 'email', tel: 'tel', position: 'position',
                sex: 'sex'
              }))
              this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
              this.model.reviewResponsible = res.result
            }
          })
          // 得到评审主体信息
          getAction(this.url.getReviewObjectUrl, {enterpriseId: record.sysEnterprise.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['id', 'name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                {
                  id: 'objectId',
                  name: 'objectName',
                  establishingSite: 'establishingSite',
                  licenseNo: 'licenseNo',
                  positionSize: 'positionSize'
                }))
              this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
              this.businessType = res.result.businessType
              this.isPay = record.isPay
              this.model.reviewObject = res.result
            }
          })
        })
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = Object.assign(this.model, values)
            formData.sysEnterprise = Object.assign(this.model.sysEnterprise, values)
            formData.reviewResponsible = Object.assign(this.model.reviewResponsible, values)
            formData.reviewObject = Object.assign(this.model.reviewObject, values)
            //时间格式化
            console.log('send request with formData =', formData)
            formData.businessTypes = this.businessType
            formData.reviewProjectId = this.reviewProjectId
            var selectedCoordinator = []
            for (var i = 0; i < this.targetKeys_1.length; i++) {
              selectedCoordinator.push(this.coordinator[this.targetKeys_1[i]].userId)
            }
            formData.coordinatorIds = selectedCoordinator.join(',')
            formData.isPay = this.isPay;
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
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleCancel() {
        this.close()
      },

      getInformation(id) {
        // 得到评审资料信息
        getAction(this.url.list, {reviewProjectId: id, type: 2}).then((res) => {
          if (res.success) {
            this.dataSource_1 = res.result
          }
        })
        // 得到评审资料信息
        getAction(this.url.list, {reviewProjectId: id, type: 1}).then((res) => {
          if (res.success) {
            this.dataSource_2 = res.result
          }
        })
      },

      getSelectedPersonnelByRoleCode(id, roleCode) {
        const dataSource = [];
        const targetKeys = [];
        // 得到选中的
        getAction(this.url.getByProjectAndRoleCode, {
          roleCode: roleCode,
          reviewProjectId: id
        }).then(res => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              const data = {
                key: i.toString(),
                userId: res.result[i].userId
              }
              this.selectdCoordinator.push(data)
            }
            this.getAllByRoleCode(roleCode, dataSource, targetKeys)
          }
        })
      },

      getAllByRoleCode(roleCode, dataSource, targetKeys) {
        // 获取所有指定角色编码人员，选中的放入选中框
        getAction(this.url.getAccountByRoleCodeUrl, {roleCode: roleCode}).then(res => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              const data = {
                key: i.toString(),
                title: res.result[i].name,
                userId: res.result[i].id
              }
              for (var j = 0; j < this.selectdCoordinator.length; j++) {
                if (this.selectdCoordinator[j].userId == res.result[i].id) {
                  // 已选
                  targetKeys.push(data.key)
                }
              }
              dataSource.push(data)
            }
            if (roleCode == 'coordinator') {
              this.targetKeys_1 = targetKeys
              this.coordinator = dataSource
            } else if (roleCode == 'reviewer') {
              this.targetKeys_2 = targetKeys
              this.reviewer = dataSource
            }
          }
        })
      },

      handleChange_coordinator(targetKeys) {
        this.targetKeys_1 = targetKeys
      },
      handleChange_reviewer(targetKeys_2) {
        this.targetKeys_2 = targetKeys_2
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

  .devide-title {
    margin-bottom: 20px;
  }
</style>
