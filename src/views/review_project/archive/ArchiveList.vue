<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="项目编号">
              <a-input placeholder="请输入项目编号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <!--<div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>-->

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
          <a @click="queryDetailed(record.id)">查看评审结果</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <starting-modal ref="modalForm" @ok="modalFormOk"></starting-modal>
  </a-card>

</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import antMixin from '@/mixins/ant-mixin'

  export default {
    name: 'ReviewList',
    mixins: [JeecgListMixin, constantCfgMixin, antMixin],
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
              return '已归档'
            }
          },
          {
            title: '评审结果',
            align: 'center',
            dataIndex: 'result',
            customRender: text => {
              if (text == 0) {
                return '未通过'
              } else {
                return '通过'
              }
            }
          },
          {
            title: '证书编号',
            align: 'center',
            dataIndex: 'certificateNo',
            customRender: text => {
              if (text == null) {
                return ( < label
                style = "color:red" > 未上传 < /label>)
              } else {
                return text
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
          list: 'review/project/archive/list',
          delete: 'review/project/delete',
          deleteBatch: 'review/project/deleteBatch',
          exportXlsUrl: 'review/project/exportXls',
          importExcelUrl: 'review/project/importExcel',
        }
      }
    },
    computed: {
      importExcelUrl() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      queryDetailed(id) {
        this.$router.push({path: "/review_project_1"})
      }
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
