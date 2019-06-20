<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="8" :sm="12">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="12">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="permissions.add">新增</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="showOperateModal(record, true, 'view')">查看</a>
          <a-divider type="vertical"/>
          <a @click="showOperateModal(record, false, 'edit')">编辑</a>
          <span v-has="permissions.start">
            <a-divider type="vertical"/>
            <a @click="start(record.id)">启动</a>
          </span>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <starting-modal ref="modalForm" @ok="modalFormOk"></starting-modal>
    <detail ref="detail" @ok="modalFormOk"></detail>
    <start ref="start" @ok="modalFormOk"></start>
  </a-card>

</template>

<script>
  import StartingModal from './modules/StartingModal'
  import Start from './modules/Start'
  import Detail from './modules/Detail'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import antMixin from '@/mixins/ant-mixin'

  export default {
    name: 'StartingList',
    mixins: [JeecgListMixin, constantCfgMixin, antMixin],
    components: {
      StartingModal,
      Detail,
      Start
    },
    data() {
      return {
        // 查询条件中的字段使用的查询条件方式, 支持的类型参考 src/mixins/JeecgListMixin.js 中 queryTypeAlias.
        /*
        e.g:
        queryType: {
          username: 'like',
          email: 'llike',
          phone: 'rlike',
          age_start: 'gte',
          age_end: 'lt'
        }
        */
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
            title: '项目编号',
            align: 'center',
            dataIndex: 'no'
          },
          {
            title: '评审企业',
            align: 'center',
            dataIndex: 'enterpriseName',
            customRender: (text, record) => {
              return record.sysEnterprise.name
            }
          },
          {
            title: '项目状态',
            align: 'center',
            dataIndex: 'state',
            customRender: text => {
              return (<a-tag color="green">启动中</a-tag>)
            }
          },
          {
            title: '评审协调员',
            align: 'center',
            dataIndex: 'realName',
            customRender: (text, record) => {
              const realNames = []
              for (var i = 0; i < record.personnelRoleResultModels.length; i++) {
                record.personnelRoleResultModels[i].sysRoles.forEach((sr) => {
                  if (sr.roleCode == 'coordinator') {
                    realNames.push(record.personnelRoleResultModels[i].name)
                  }
                })
              }
              return realNames.join("，")
            }
          },
          {
            title: '评审费用',
            align: 'center',
            dataIndex: 'isPay',
            customRender: text => {
              if (text == 0) {
                return (<a-tag color="orange">未支付</a-tag>)
              } else {
                return (<a-tag color="green">已支付</a-tag>)
              }
            }
          },
          {
            title: '修改人',
            align: 'center',
            dataIndex: 'updateBy'
          },
          {
            title: '修改时间',
            align: 'center',
            dataIndex: 'updateTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: 'review/project/starting/list',
          delete: 'review/project/delete',
          deleteBatch: 'review/project/deleteBatch',
          exportXlsUrl: 'review/project/exportXls',
          importExcelUrl: 'review/project/importExcel',
        },
        permissions: {
          add: 'starting_review_project:add',
          start: 'starting_review_project:start',
        }
      }
    },
    created() {
      if (this.$store.getters.roleCodes.includes('coordinator')) {
        this.queryParam.coordinatorUserId = this.$store.getters.userInfo.id
      }
      if (this.$store.getters.roleCodes.includes('reviewer')) {
        this.queryParam.reviewerUserId = this.$store.getters.userInfo.id
      }
      if (this.$store.getters.roleCodes.includes('busi_review_applier')) {
        this.queryParam.busiReviewApplierUserId = this.$store.getters.userInfo.id
      }
      this.loadData()
    },
    computed: {
      importExcelUrl() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      start(id) {
        this.$refs.start.edit(id);
      },
      showOperateModal(record, isShowProjectInfo, operateType) {
        this.$refs.detail.edit(record, isShowProjectInfo, operateType);
      },
    }
  }
</script>
<style lang="less" scoped>
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 3px
  }

  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>
