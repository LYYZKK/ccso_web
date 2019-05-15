<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="文章标题">
              <a-input placeholder="请输入文章标题" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="文章类型">
              <j-dict-select-tag
                v-decorator="['articleType', {}]"
                :triggerChange="true"
                placeholder="请选择文章类型"
                emptyOptionText="全部"
                dictCode="article_type"
              />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="文章状态">
                <j-dict-select-tag
                  v-decorator="['articleState', {}]"
                  :triggerChange="true"
                  placeholder="请选择文章状态"
                  emptyOptionText="全部"
                  dictCode="article_state"
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="修改人">
                <a-input placeholder="请输入修改人名称" v-model="queryParam.createBy"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
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
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>项
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
    <article-modal ref="modalForm" @ok="modalFormOk"></article-modal>
  </a-card>
</template>

<script>
import ArticleModal from './modules/ArticleModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import constantCfgMixin from '@/mixins/constant.cfg'
import { initDictOptions, filterDictOptionByText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'ArticleList',
  mixins: [JeecgListMixin, constantCfgMixin],
  components: {
    ArticleModal
  },
  data () {
    return {
      description: '文章管理管理页面',
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
        title: 'like',
        text: 'like',
        articleType: 'like',
        articleState: 'like',
        createBy: 'like'
      },
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: (text, record, index) => {
            return parseInt(index) + 1
          }
        },
        {
          title: '文章标题',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '文章类型',
          align: 'center',
          dataIndex: 'articleType',
          customRender: text => {
            return this.DICT_SHOW_RENDER(filterDictOptionByText(this.articleTypeDictOptions, text))
          }
        },
        {
          title: '文章状态',
          align: 'center',
          dataIndex: 'articleState',
          customRender: text => {
            return this.DICT_SHOW_RENDER(filterDictOptionByText(this.articleStateDictOptions, text))
          }
        },
        {
          title: '附件地址',
          align: 'center',
          dataIndex: 'accessoryUrl'
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
      url: {
        list: '/show/article/list',
        delete: '/show/article/delete',
        deleteBatch: '/show/article/deleteBatch'
      },
      articleTypeDictOptions: [],
      articleStateDictOptions: []
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domainURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig () {
      // 初始化字典 - 文章类型
      initDictOptions('article_type').then(res => {
        if (res.success) {
          this.articleTypeDictOptions = res.result
        }
      })
      // 初始化字典 - 文章状态
      initDictOptions('article_state').then(res => {
        if (res.success) {
          this.articleStateDictOptions = res.result
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
