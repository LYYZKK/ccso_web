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
          <Avatar shape="square" size={64} icon="user"/>
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
      <h3 class="devide-title">评审资料</h3>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination=false
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a-upload
            name="file"
            :action="FILE_INFORMATION_UPLOAD_ACTION"
            :headers="FILE_UPLOAD_HEADERS"
            :data="{'reviewInformationId':record.informationId, 'reviewProjectId':reviewProjectId,
            'reviewInformationFileId': record.reviewInformationFileId}"
            @change="handleUploadChange">
            <a-button>
                <a-icon type="upload"/>
                选择文件
            </a-button>
          </a-upload>
        </span>
      </a-table>
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


  export default {
    name: 'Detail',
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
          uploadFileUrl: '/sys/user/queryUserByRoleCode',
          getResponsibleUrl: '/review/responsible/queryByEnterpriseId',
          getReviewObjectUrl: '/review/object/queryByEnterpriseId',
          getPersonnelUrl: '/review/projectUser/queryByProjectAndRoleCode',
          list: '/review/information/getInformationAndFile',
          edit: '/review/project/edit'
        },
        businessType: '',
        isPay: '',
        mockData: [],
        targetKeys: [],
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
        reviewProjectId: ''
      }
    },
    methods: {
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
        this.getPersonnel(record.id)
        this.reviewProjectId = record.id
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'no', 'state', 'isPay', 'result', 'createTime'))
          /* this.form.setFieldsValue(pick(this.model.sysEnterprises[0], 'id', 'name', 'businessLicenseNo', 'logo', 'registeredCapital', 'sitesLinks',
             'briefIntroduction', 'industry'))*/

          // 得到评审企业信息
          this.form.setFieldsValue(copy2NewKeyObjeect(this.model.sysEnterprises[0], ['id', 'name', 'businessLicenseNo', 'logo', 'registeredCapital',
            'sitesLinks', 'briefIntroduction', 'industry'], {
            id: 'reviewProjectId',
            name: 'name',
            businessLicenseNo: 'businessLicenseNo',
            logo: 'logo',
            registeredCapital: 'registeredCapital',
            sitesLinks: 'sitesLinks',
            briefIntroduction: 'briefIntroduction',
            industry: 'industry'
          }))

          // 得到评审负责人信息
          getAction(this.url.getResponsibleUrl, {enterpriseId: record.sysEnterprises[0].id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(res.result, ['id', 'name', 'email', 'tel', 'position', 'sex'], {
                id: 'objectId', name: 'responsibleName', email: 'email', tel: 'tel', position: 'position',
                sex: 'sex'
              }))
              this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
            }
          })
          // 得到评审主体信息
          getAction(this.url.getReviewObjectUrl, {enterpriseId: record.sysEnterprises[0].id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObjeect(
                res.result, ['id', 'name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                {
                  id: 'responsibleId',
                  name: 'objectName',
                  establishingSite: 'establishingSite',
                  licenseNo: 'licenseNo',
                  positionSize: 'positionSize'
                }))
              this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
              this.businessType = res.result.businessType
              this.isPay = record.isPay
            }
            this.getInformation(record.id)
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
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleCancel() {
        this.close()
      },

      getInformation(id) {
        // 得到评审资料信息
        getAction(this.url.list, {reviewProjectId: id}).then((res) => {
          if (res.success) {
            this.dataSource = res.result
          }
        })
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

  .devide-title {
    margin-bottom: 20px;
  }
</style>
