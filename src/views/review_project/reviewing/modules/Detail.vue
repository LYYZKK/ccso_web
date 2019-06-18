<template>
  <a-modal
    :title="title"
    :width="1500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    :destroyOnClose="true">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div v-if="sendBackNum > 0">
          <a-alert message="注意" type="warning">
            <span slot="description">
              项目已被回退补审，补审原因：<span style="color: red">{{sendBackMsg}}</span>。
            </span>
          </a-alert>
          <a-divider/>
        </div>

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
          <a-tag color="green">评审中</a-tag>
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
            :columns="columns_1"
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
          <a-date-picker v-decorator="[ 'informationBeginTime', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资料评审计划结束">
          <a-date-picker v-decorator="[ 'informationEndTime', {}]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现场评审计划开始">
          <a-date-picker v-decorator="[ 'sceneBeginTime', {}]" format="YYYY-MM-DD"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现场评审计划结束">
          <a-date-picker v-decorator="[ 'sceneEndTime', {}]"/>
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
            :columns="columns_1"
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
        <h3 class="devide-title">原评审记录</h3>
        <a-form-item>
          <span v-for="(value, index) in oldEnrtyRecord">
            <label>第{{index+1}}次原评审记录</label>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns_2"
              :dataSource="value"
              :pagination=false
              :loading="loading"
              :expandedRowKeys="expandedRowKeys"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange"
              @expand="handleExpand"
              >
              <a-table
                slot="expandedRowRender"
                slot-scope="text"
                :columns="columns_2_child"
                :dataSource="dataSource_3_child"
                size="middle"
                bordered
                rowKey="id"
                :pagination="false"
                :loading="loading"
              >
                <span slot="action" slot-scope="text, record">
                  <a-radio-group :defaultValue="toString(record.reviewEntryRecord.isRight)">
                    <a-radio @click="saveUpdateEntryResult(record, 1)" value="1">符合</a-radio>
                    <a-radio @click="saveUpdateEntryResult(record, 0)" value="0">不符合</a-radio>
                    <a-radio @click="saveUpdateEntryResult(record, 2)" value="2">不适用</a-radio>
                  </a-radio-group>
                  <a-divider type="vertical"/>
                  <a @click="postil(record, record.reviewEntryRecord.isRight)" type="vertical">批注</a>
                </span>
              </a-table>
            </a-table>
            <br />
          </span>
        </a-form-item>
        <h3 class="devide-title">评审记录</h3>
        <a-form-item>
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns_2"
            :dataSource="dataSource_3"
            :pagination=false
            :loading="loading"
            :expandedRowKeys="expandedRowKeys"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange"
            @expand="handleExpand">
            <a-table
              slot="expandedRowRender"
              slot-scope="text"
              :columns="columns_2_child"
              :dataSource="dataSource_3_child"
              size="middle"
              bordered
              rowKey="id"
              :pagination="false"
              :loading="loading"
            >
              <span slot="action" slot-scope="text, record">
                <a-radio-group :defaultValue="toString(record.reviewEntryRecord.isRight)">
                  <a-radio @click="updateEntryResult(record, 1)" value="1">符合</a-radio>
                  <a-radio @click="updateEntryResult(record, 0)" value="0">不符合</a-radio>
                  <a-radio @click="updateEntryResult(record, 2)" value="2">不适用</a-radio>
                </a-radio-group>
                <a-divider type="vertical"/>
                <a @click="postil(record, record.reviewEntryRecord.isRight)" type="vertical">批注</a>
              </span>
            </a-table>
          </a-table>
        </a-form-item>
      </a-form>
    </a-spin>
    <submit ref="Submit"/>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="operateType === 'edit'">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import antMixin from '@/mixins/ant-mixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import moment from 'moment'
  import {copy2NewKeyObject} from '@/utils/util'
  import {getAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {httpAction} from '@/api/manage'
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import Submit from './Submit'

  export default {
    name: 'Detail',
    components: {ATextarea, JEllipsis, Submit},
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
          email: {rules: [{required: true, type: 'email', message: '请输入电子邮箱!'}]},
          tel: {rules: [{required: true, message: '请输入手机号码!'}]},
          position: {rules: [{required: true, message: '请选择职位!'}]},

          remark: {rules: [{required: true, message: '请输入批注信息！'}]},
        },
        url: {
          uploadInformationFileUrl: `${window._CONFIG['domainURL']}/review/information/file/upload`,
          getResponsibleUrl: '/review/responsible/queryByEnterpriseId',
          getReviewObjectUrl: '/review/object/queryByEnterpriseId',
          getByProjectAndRoleCode: '/review/projectUser/queryByProjectAndRoleCode',
          list: '/review/information/getInformationAndFile',
          edit: '/review/project/editReviewing',
          getAccountByRoleCodeUrl: '/sys/user/queryUserByRoleCode',
          getAllCategoryUrl: '/review/category/queryIdAndNameAll',
          updateUrl: '/review/entryRecord/update',
          getEntryRecordUrl: '/review/entry/getEntryRecord',
          getOldReviewRecord: '/review/category/queryByReviewProjectAndNumber',
          getReviewTime: '/review/time/queryByReviewProject',
          getSendBackByReviewProjectUrl: '/review/sendBack/getSendBackByReviewProject'

        },
        FILE_INFORMATION_UPLOAD_URL: `${window._CONFIG['domainURL']}/review/information/file/upload`,
        businessType: '',
        isPay: '',
        isRight: '',
        coordinator: [],
        targetKeys_1: [],
        targetKeys_2: [],
        reviewer: [],
        enterpriseType: '',
        uploading: false,
        sendBackMsg: '',
        sendBackNum: '-1',
        reviewResultFormData: {
          id: '',
          reviewEntryId: '',
          reviewProjectId: '',
          isRight: ''
        },
        // 评审资料表头
        columns_1: [
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
            customRender: (text, record) => {
              if (text != null) {
                return (<a href={this.FILE_DOWNLOAD_URL_RENDER(text, record.originalFileName)}>下载文件</a>)
              } else {
                return (<span style="color: red;">未上传</span>)
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

        // 评审记录父表表头
        columns_2: [
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
            title: '编号',
            align: 'center',
            dataIndex: 'no'
          },
          {
            title: '评审类别',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '达标百分比',
            align: 'center',
            dataIndex: 'standardValue'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
        ],


        // 评审记录子表头
        columns_2_child: [
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
            title: '编号',
            align: 'center',
            dataIndex: 'no'
          },
          {
            title: '评审条目要求',
            align: 'center',
            dataIndex: 'requirements',
            customRender: text => {
              return (<j-ellipsis value={text} length={10} />)
            }
          },
          {
            title: '查看资料',
            align: 'center',
            dataIndex: 'path',
            customRender: (text, record) => {
              return (<a href={this.FILE_DOWNLOAD_URL_RENDER(text, record.reviewInformationFile.originalFileName)}>下载文件</a>)
            }
          },
          {
            title: '评判时间',
            align: 'center',
            dataIndex: 'updateTime',
            customRender: (text, record) => {
              if (record.reviewEntryRecord != null) {
                return record.reviewEntryRecord.updateTime
              } else {
                return '暂未评判'
              }
            }
          },
          {
            title: '评审员',
            align: 'center',
            dataIndex: 'updateBy',
            customRender: (text, record) => {
              if (record.reviewEntryRecord != null) {
                return record.reviewEntryRecord.updateBy
              } else {
                return '暂未评判'
              }
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
          },
        ],
        reviewProjectId: '',
        selectdRolePersonnel: [],
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
        entryRecordData: [],
        dataSource_1: [],
        dataSource_2: [],
        dataSource_3: [],
        dataSource_3_child: [],
        expandedRowKeys: [],
        oldEnrtyRecord: [],
        uploadLoading: false,
        operateType: 'view'
      }
    },
    methods: {
      FILE_INFORMATION_UPLOAD_ACTION: () => {
        return this.FILE_INFORMATION_UPLOAD_URL
      },

      // 得到嵌套表格子表格数据
      handleExpand(expanded, record) {
        this.expandedRowKeys = [];
        this.dataSource_3_child = [];
        if (expanded === true) {
          this.loading = true;
          this.expandedRowKeys.push(record.id)
          getAction(this.url.getEntryRecordUrl, {
            reviewCategoryId: record.id,
            reviewProjectId: this.reviewProjectId
          }).then((res) => {
            if (res.success) {
              this.loading = false;
              this.dataSource_3_child = res.result
            }
          });
          this.loading = false;
        }
      },

      handleUploadChange(info) {
        this.UPLOAD_CHANGE_HANDLER({
            info,
            callback: () => {
              this.getInformation(this.reviewProjectId)
            }
          }
        )
      },

      edit(record, operateType) {
        this.operateType = operateType
        this.reviewProjectId = record.id
        this.dataSource_3_child = []
        this.getSelectedPersonnelByRoleCode(record.id, "coordinator")
        this.getSelectedPersonnelByRoleCode(record.id, "reviewer")
        this.getAllCategory()
        this.getInformation(record.id)
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'no', 'state', 'isPay', 'result', 'createTime'))

          // 得到评审企业信息
          this.form.setFieldsValue(copy2NewKeyObject(this.model.sysEnterprise, ['id', 'name', 'businessLicenseNo', 'logo', 'registeredCapital',
            'sitesLinks', 'briefIntroduction', 'industry'], {
            id: 'sysEnterpriseId'
          }))

          // 得到评审负责人信息
          getAction(this.url.getResponsibleUrl, {enterpriseId: record.sysEnterprise.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObject(res.result, ['id', 'name', 'email', 'tel', 'position', 'sex'], {
                id: 'responsibleId', name: 'responsibleName'
              }))
              this.form.setFieldsValue({birthYear: res.result.birthYear ? moment(res.result.birthYear) : null})
            }
          })
          // 得到评审主体信息
          getAction(this.url.getReviewObjectUrl, {enterpriseId: record.sysEnterprise.id}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue(copy2NewKeyObject(
                res.result, ['id', 'name', 'establishingSite', 'establishingYear', 'licenseNo', 'positionSize'],
                {
                  id: 'objectId',
                  name: 'objectName'
                }))
              this.form.setFieldsValue({establishingYear: res.result.establishingYear ? moment(res.result.establishingYear) : null})
              this.businessType = res.result.businessType
              this.isPay = record.isPay
            }
          })

          // 得到旧评审记录信息
          getAction(this.url.getOldReviewRecord, {reviewProjectId: this.reviewProjectId}).then((res) => {
            if (res.success) {
              this.oldEnrtyRecord = res.result
            }
          })

          // 得到评审时间计划
          getAction(this.url.getReviewTime, {reviewProjectId: this.reviewProjectId}).then((res) => {
            if (res.success) {
              this.form.setFieldsValue({informationBeginTime: res.result.informationBeginTime ? moment(res.result.informationBeginTime) : null})
              this.form.setFieldsValue({informationEndTime: res.result.informationEndTime ? moment(res.result.informationEndTime) : null})
              this.form.setFieldsValue({sceneBeginTime: res.result.sceneBeginTime ? moment(res.result.sceneBeginTime) : null})
              this.form.setFieldsValue({sceneEndTime: res.result.sceneEndTime ? moment(res.result.sceneEndTime) : null})
            }
          })

          // 得到回退信息
          getAction(this.url.getSendBackByReviewProjectUrl, {reviewProjectId: record.id}).then((res) => {
            this.sendBackMsg = res.result.sendBackMsg
            this.sendBackNum = res.result.sendBackNum
          })
        })
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = {}
            //时间格式化
            formData.reviewTime = {
              informationBeginTime: values.informationBeginTime ? values.informationBeginTime.format('YYYY-MM-DD HH:mm:ss') : null,
              informationEndTime: values.informationEndTime ? values.informationEndTime.format('YYYY-MM-DD HH:mm:ss') : null,
              sceneBeginTime: values.sceneBeginTime ? values.sceneBeginTime.format('YYYY-MM-DD HH:mm:ss') : null,
              sceneEndTime: values.sceneEndTime ? values.sceneEndTime.format('YYYY-MM-DD HH:mm:ss') : null,
            }
            formData.updateBy = values.updateBy
            formData.reviewProjectId = this.reviewProjectId
            var selectedReviewer = []
            for (var i = 0; i < this.targetKeys_2.length; i++) {
              selectedReviewer.push(this.reviewer[this.targetKeys_2[i]].userId)
            }
            formData.reviewerIds = selectedReviewer.join(',')
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
        // 得到现场评审资料信息
        getAction(this.url.list, {reviewProjectId: id, type: 1}).then((res) => {
          if (res.success) {
            this.dataSource_2 = res.result
          }
        })
        // 得到其它评审资料信息
        getAction(this.url.list, {reviewProjectId: id, type: 2}).then((res) => {
          if (res.success) {
            this.dataSource_1 = res.result
          }
        })
      },

      getAllCategory() {
        // 得到评审记录信息
        getAction(this.url.getAllCategoryUrl).then((res) => {
          if (res.success) {
            this.dataSource_3 = res.result
          }
        })
      },

      getSelectedPersonnelByRoleCode(id, roleCode) {
        const dataSource = [];
        const targetKeys = [];
        this.selectdRolePersonnel = []
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
              this.selectdRolePersonnel.push(data)
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
              for (var j = 0; j < this.selectdRolePersonnel.length; j++) {
                if (this.selectdRolePersonnel[j].userId == res.result[i].id) {
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

      updateEntryResult(record, selectedValue) {
        this.reviewResultFormData.reviewEntryId = record.id
        this.reviewResultFormData.isRight = selectedValue
        this.reviewResultFormData.reviewProjectId = this.reviewProjectId
        this.reviewResultFormData.id = record.reviewEntryRecord.id
        httpAction(this.url.updateUrl, this.reviewResultFormData, 'post').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
        })
      },

      postil(record, judgeResult) {
        this.$refs.Submit.editPostil(record, judgeResult, this.reviewProjectId);
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
