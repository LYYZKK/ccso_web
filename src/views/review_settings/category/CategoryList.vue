<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="8" :sm="12">
            <a-form-item label="编号">
              <a-input placeholder="请输入编号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="12">
            <a-form-item label="分类名称">
              <a-input placeholder="请输入分类名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="8" :sm="12">
              <a-form-item label="达标百分比">
                <a-input-number
                  placeholder="请输入"
                  :min="0"
                  :max="100"
                  :precision="0"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="queryParam.standardValue_begin"/>
                ~
                <a-input-number
                  placeholder="请输入"
                  :min="0"
                  :max="100"
                  :precision="0"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-model="queryParam.standardValue_end"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="8" :sm="12">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
              <a @click="handleToggleSearch">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
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
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
          <a @click="jumpEntryList(record.id)">评审条目管理</a>
          <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <category-modal ref="modalForm" @ok="modalFormOk"></category-modal>
  </a-card>
</template>

<script>
  import CategoryModal from './modules/CategoryModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import constantCfgMixin from "@/mixins/constant.cfg"

  export default {
    name: "CategoryList",
    mixins: [JeecgListMixin, constantCfgMixin],
    components: {
      CategoryModal
    },
    data() {
      return {
        description: '评审类别管理管理页面',
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
        queryType: {
          no: 'like',
          name: 'like',
          standardValue_begin: 'eq',
          standardValue_end: 'eq',
          createById: 'like',
          updateById: 'like',
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '编号',
            align: "center",
            dataIndex: 'no'
          },
          {
            title: '分类名称',
            align: "center",
            dataIndex: 'name'
          },
          {
            title: '达标百分比（%）',
            align: "center",
            dataIndex: 'standardValue'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/review/category/list",
          delete: "/review/category/delete",
          deleteBatch: "/review/category/deleteBatch",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domainURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      jumpEntryList(id) {
        this.$router.push({
          name: 'review_settings-entry',
          path: '/review_settings/entry',
          params: {categoryId: id}
        })
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
