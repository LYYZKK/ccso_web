<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="编号">
              <a-input placeholder="请输入编号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="评审需求">
              <a-input placeholder="请输入评审需求" v-model="queryParam.requirements"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="评审类别">
              <a-select
                showSearch
                v-model="queryParam.categoryId"
              >
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="(_type, key) in categoryData"
                  :key="key"
                  :value="_type.id"
                >{{ _type.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="评审资料">
              <a-select
                showSearch
                placeholder="全部"
                v-model="queryParam.informationId"
              >
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="(_type, key) in informationData"
                  :key="key"
                  :value="_type.id"
                >{{ _type.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
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
            <a-icon type="delete"/>删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>
        <span>项</span>
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
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down"/>
            </a>
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
    <entry-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
import filter from 'lodash.filter'

import { getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { constantCfgMixin } from '@/mixins/constant.cfg'

import EntryModal from './modules/EntryModal'

export default {
  name: 'EntryList',
  mixins: [JeecgListMixin, constantCfgMixin],
  components: {
    EntryModal
  },
  data() {
    return {
      description: '评审条目管理页面',
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
        requirements: 'like',
        remark: 'like',
        categoryId: 'like',
        informationId: 'like',
        updateById: 'like'
      },
      queryParam: {
        categoryId: this.$route.params.categoryId || ''
      },
      categoryData: [],
      informationData: [],
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
          title: '编号',
          align: 'center',
          dataIndex: 'no'
        },
        {
          title: '评审需求',
          align: 'center',
          dataIndex: 'requirements'
        },
        {
          title: '评审类别',
          align: 'center',
          dataIndex: 'categoryId',
          customRender: text => {
            return filter(this.categoryData, { id: text })[0].name
          }
        },
        {
          title: '评审资料',
          align: 'center',
          dataIndex: 'informationId',
          customRender: text => {
            return filter(this.informationData, { id: text })[0].name
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
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 请求参数
      url: {
        list: '/review/entry/list',
        delete: '/review/entry/delete',
        deleteBatch: '/review/entry/deleteBatch',
        informationUrl: '/review/information/queryIdAndNameAll?pageSize=-1',
        categoryUrl: '/review/category/queryIdAndNameAll?pageSize=-1'
      }
    }
  },
  mounted() {
    this.initSelectOptions()
  },
  methods: {
    initSelectOptions() {
      // 初始化下拉框 - 评审类别
      getAction(this.url.categoryUrl).then(res => {
        if (res.success) {
          this.categoryData = res.result
        }
      })

      // 初始化下拉框 - 评审资料
      getAction(this.url.informationUrl).then(res => {
        if (res.success) {
          this.informationData = res.result
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/** Button按钮间距 */
.ant-btn {
  margin-left: 3px;
}
.ant-card-body .table-operator {
  margin-bottom: 18px;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 15px;
  padding-bottom: 15px;
}

.anty-row-operator button {
  margin: 0 5px;
}

.ant-btn-danger {
  background-color: #ffffff;
}

.ant-modal-cust-warp {
  height: 100%;
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}
</style>
