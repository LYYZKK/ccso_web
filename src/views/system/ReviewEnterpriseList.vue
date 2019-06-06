<template>
  <a-card :bordered="false">
    <a-spin :spinning="confirmLoading">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">

            <a-col :md="6" :sm="8">
              <a-form-item label="企业名称">
                <a-input placeholder="请输入企业名称" v-model="queryParam.name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="营业执照编号">
                <a-input placeholder="请输入营业执照编号" v-model="queryParam.businessLicenseNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
          <a-button style="margin-left: 8px"> 批量操作
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
          <a @click="jumpPersonnelList(record.id)">下属人员</a>

          <a-divider type="vertical"/>
          <a @click="jumpUserList(record.id)">账户管理</a>

          <a-divider type="vertical"/>
          <a-popconfirm title="确定取消展示吗?" @confirm="() => updateSurfaceShow(record.id, surfaceShowFlaseDictValue)" v-if="record.surfaceShow === surfaceShowTrueDictValue && record.surfaceShow!==''">
            <a><font color="#dc143c">取消展示</font></a>
          </a-popconfirm>
          <a-popconfirm title="确定前台展示吗?" @confirm="() => updateSurfaceShow(record.id, surfaceShowTrueDictValue)" v-else>
            <a>前台展示</a>
          </a-popconfirm>

          <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

        </a-table>
      </div>
      <!-- table区域-end -->

      <!-- 表单区域 -->
      <review-enterprise-modal ref="modalForm" @ok="modalFormOk"></review-enterprise-modal>
    </a-spin>
  </a-card>

</template>

<script>
  import ReviewEnterpriseModal from './modules/ReviewEnterpriseModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import antMixin from '@/mixins/ant-mixin'
  import {
    filterDictOptionByText,
    getDictItemByDictCodeAndItemCode,
    initDictOptions
  } from '@/components/dict/JDictSelectUtil'

  import ConstConfig from '@/config/constant.config'
  import {httpAction} from '@/api/manage'

  export default {
    name: 'ReviewEnterpriseList',
    mixins: [JeecgListMixin, constantCfgMixin, antMixin],
    components: {
      ReviewEnterpriseModal
    },
    data() {
      return {
        description: '合作企业管理管理页面',
        // 查询条件中的字段使用的查询条件方式, 支持的类型参考 src/mixins/JeecgListMixin.js 中 queryTypeAlias.
        queryParam: {
          enterpriseType: ''
        },
        queryType: {
          name: 'like',
          logo: 'like',
          enterpriseType: 'eq',
          businessLicenseNo: 'like',
          businessLicenseFile: 'like',
          registeredCapital: 'like',
          sitesLinks: 'like',
          briefIntroduction: 'like',
        },
        updateParam: {
          id: '',
          surfaceShow: ''
        },
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
            title: '企业类型',
            align: 'center',
            dataIndex: 'enterpriseType',
            customRender: text => {
              return this.DICT_SHOW_RENDER(filterDictOptionByText(this.enterpriseTypeDictOptions, text))
            }
          },
          {
            title: '企业名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '营业执照编号',
            align: 'center',
            dataIndex: 'businessLicenseNo'
          },
          {
            title: '是否前台展示',
            align: 'center',
            dataIndex: 'surfaceShow',
            customRender: text => {
              if (text) {
                return this.DICT_SHOW_RENDER(filterDictOptionByText(this.surfaceShowDictOptions, text))
              } else {
                return (<a-tag color="red">否</a-tag>)
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
            dataIndex: 'updateTime',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
            width: 400
          }
        ],
        url: {
          list: '/sys/enterprise/list',
          delete: '/sys/enterprise/delete',
          deleteBatch: '/sys/enterprise/deleteBatch',
          edit: '/sys/enterprise/edit',
        },
        enterpriseTypeDictOptions: [],
        surfaceShowTrueDictValue: '',
        surfaceShowFlaseDictValue: '',
        confirmLoading: false,
      }
    },
    created() {
      // 初始化 - 评审企业类型值
      getDictItemByDictCodeAndItemCode({...ConstConfig.DICT.enterprise_type_review}).then(res => {
        if (res != null) {
          this.queryParam.enterpriseType = res.itemValue
          this.loadData()
        }
      })
      this.initDictConfig()
    },
    methods: {
      initDictConfig() {
        // 初始化字典 - 企业类型
        initDictOptions('enterprise_type').then(res => {
          if (res.success) {
            this.enterpriseTypeDictOptions = res.result
          }
        })
        // 初始化字典 - 前台显示值
        getDictItemByDictCodeAndItemCode({...ConstConfig.DICT._true}).then(res => {
          if (res != null) {
            this.surfaceShowTrueDictValue = res.itemValue
          }
        })
        // 初始化字典 - 前台不显示值
        getDictItemByDictCodeAndItemCode({...ConstConfig.DICT._false}).then(res => {
          if (res != null) {
            this.surfaceShowFlaseDictValue = res.itemValue
          }
        })
      },
      updateSurfaceShow(id, surfaceShowValue) {
        this.confirmLoading = true
        this.updateParam.id = id
        this.updateParam.surfaceShow = surfaceShowValue
        httpAction(this.url.edit, this.updateParam, 'put').then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this.confirmLoading = false
          this.record.surfaceShow = surfaceShowValue
        }).finally(() => {
          this.confirmLoading = false
          this.loadData();
        })
      },
      jumpPersonnelList(id) {
        this.$router.push({
          name: 'isystem-personnel',
          path: '/isystem/personnel',
          params: {enterpriseId: id}
        })
      },
      jumpUserList(id) {
        this.$router.push({
          name: 'isystem-user',
          path: '/isystem/user',
          params: {enterpriseId: id}
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
