<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="24">
            <a-form-item label="编号">
              <a-input placeholder="请输入编号" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="分类名称">
              <a-input placeholder="请输入分类名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :expandedRowKeys= "expandedRowKeys"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
        @expand="handleExpand"
      >
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :dataSource="innerData"
          size="middle"
          bordered
          rowKey="id"
          :pagination="false"
          :loading="loading"
        >
        </a-table>
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
import { getAction } from '@/api/manage'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import constantCfgMixin from '@/mixins/constant.cfg'
import antMixin from '@/mixins/ant-mixin'
import JEllipsis from '@/components/jeecg/JEllipsis'

export default {
  name: "ReviewEntryQueryList",
  mixins: [JeecgListMixin, constantCfgMixin, antMixin],
  components: {
    JEllipsis
  },
  data() {
    return {
      expandedRowKeys: [],
      description: '列表展开子表Demo',
      queryParam: {
        pageSize: -1
      },
      queryType: {
        no: 'like',
        name: 'like'
      },
      remarkSubStrLength: 20,
      // 列表表头
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
          title: '达标百分比',
          align: "center",
          dataIndex: 'standardValue'
        },
        {
          title: '备注',
          align: "center",
          dataIndex: 'remark',
          customRender: (text) => {
            return (<j-ellipsis value={text} length={this.remarkSubStrLength}/>)
          }
        }],
      // 子表表头
      innerColumns: [
        {
          title: '编号',
          align: "center",
          width: 100,
          dataIndex: 'no',
        },
        {
          title: '评审需求',
          align: "center",
          dataIndex: 'requirements'
        },
        {
          title: '描述',
          align: "center",
          dataIndex: 'remark',
          customRender: (text) => {
            return (<j-ellipsis value={text} length={this.remarkSubStrLength}/>)
          }
        }
      ],
      innerData: [],
      url: {
        list: "/review/category/list",
        innerListByMainId: "/review/entry/list",
      },
    }
  },
  methods: {
    handleExpand(expanded, record){
      this.expandedRowKeys=[];
      this.innerData=[];
      if(expanded===true){
        this.loading = true;
        this.expandedRowKeys.push(record.id)
        getAction(this.url.innerListByMainId, {categoryId: record.id, pageSize: -1}).then((res) => {
          if (res.success) {
            this.loading = false;
            this.innerData = res.result.records
          }
        });
      }
    },
  }
}
</script>
<style scoped>
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