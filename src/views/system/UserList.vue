<template>
  <a-card :bordered="false">
    <a-spin :spinning="confirmLoading">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">

            <a-col :md="6" :sm="12">
              <a-form-item label="账号">
                <a-input placeholder="请输入账号查询" v-model="queryParam.username"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="状态">
                <!--<j-dict-select-tag
                  v-model="queryParam.status"
                  :triggerChange="true"
                  placeholder="请选择"
                  emptyOptionText="全部"
                  dictCode="user_status"
                />-->


                <a-select
                  showSearch
                  v-model="queryParam.status"
                >
                  <a-select-option value>全部</a-select-option>
                  <a-select-option
                    v-for="(item, key) in userStatusDictOptions"
                    :key="key"
                    :value="item.value"
                  >{{ item.text }}
                  </a-select-option>
                </a-select>

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
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="2">
              <a-icon type="lock" @click="batchFrozen('2')"/>
              冻结
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="unlock" @click="batchFrozen('1')"/>
              解冻
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
          <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
          selectedRowKeys.length }}</a>项&nbsp;&nbsp;
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="record.status==1">
                <a-popconfirm title="确定冻结吗?" @confirm="() => handleFrozen(record.id,2)">
                  <a>冻结</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==2">
                <a-popconfirm title="确定解冻吗?" @confirm="() => handleFrozen(record.id,1)">
                  <a>解冻</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定重置密码吗?" @confirm="() => resetPassword(record.username)">
                  <a>重置密码</a>
                </a-popconfirm>
              </a-menu-item>

            </a-menu>
          </a-dropdown>
        </span>
        </a-table>
      </div>
      <!-- 表单区域 -->
      <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
    </a-spin>
  </a-card>
</template>

<script>
  import UserModal from './modules/UserModal'
  import {frozenBatch} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import constantCfgMixin from '@/mixins/constant.cfg'
  import {filterDictOptionByText, initDictOptions} from '@/components/dict/JDictSelectUtil'
  import {httpAction} from '@/api/manage'
  import {mapActions} from 'vuex'

  export default {
    name: "UserList",
    mixins: [JeecgListMixin, constantCfgMixin],
    components: {
      UserModal,
    },
    data() {
      return {
        description: '这是用户管理页面',
        queryType: {
          username: 'eq',
          status:'eq'
        },
        formData: {
          username: ''
        },
        queryParam: {
          enterpriseId: this.$route.params.enterpriseId || ''
        },
        sexDictOptions: [],
        userStatusDictOptions: [],
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
            title: '登陆账号',
            align: "center",
            dataIndex: 'username',
            width: 120
          },
          {
            title: '真实姓名',
            align: "center",
            width: 100,
            dataIndex: 'realName',
            customRender: (text, record) => {
              const realNames = []
              record.sysPersonnels.forEach((v) => {
                realNames.push(v.name)
              })
              return realNames
            }
          },
          {
            title: '性别',
            align: "center",
            width: 80,
            dataIndex: 'sex',
            customRender: (text, record) => {
              const sexs = []
              record.sysPersonnels.forEach((v) => {
                sexs.push(this.DICT_SHOW_RENDER(filterDictOptionByText(this.sexDictOptions, v.sex)))
              })
              return sexs
            }
          },
          {
            title: '角色',
            align: "center",
            width: 100,
            dataIndex: 'roles',
            customRender: (text, record) => {
              const roleNames = []
              record.sysRoles.forEach((v) => {
                roleNames.push(v.roleName)
              })
              return roleNames.join(', ')
            }
          },
          {
            title: '企业名称',
            align: "center",
            width: 100,
            dataIndex: 'sysEnterprises',
            customRender: (text, record) => {
              const enterpriseName = []
              record.sysEnterprises.forEach((v) => {
                enterpriseName.push(v.name)
              })
              return enterpriseName
            }
          },
          {
            title: '状态',
            align: "center",
            width: 80,
            dataIndex: 'status',
            customRender: text => {
              return this.DICT_SHOW_RENDER(filterDictOptionByText(this.userStatusDictOptions, text))
            }
          },
          {
            title: '修改人',
            align: "center",
            width: 150,
            dataIndex: 'updateBy',
            sorter: true
          },
          {
            title: '修改时间',
            align: "center",
            width: 150,
            dataIndex: 'updateTime',
            sorter: true
          },

          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }

        ],
        url: {
          list: "/sys/user/list",
          retrievePasswordUrl: '/sys/user/retrievePassword',
        },
        confirmLoading: false,
      }
    },
    computed: {},
    methods: {
      ...mapActions(['Logout']),
      initDictConfig() {
        // 初始化字典 - 用户状态
        initDictOptions('user_status').then(res => {
          if (res.success) {
            this.userStatusDictOptions = res.result
          }
        })
        // 初始化字典 - 性别
        initDictOptions('sex').then(res => {
          if (res.success) {
            this.sexDictOptions = res.result
          }
        })
      },
      batchFrozen: function (status) {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return false;
        } else {
          let ids = "";
          let that = this;
          that.selectedRowKeys.forEach(function (val) {
            ids += val + ",";
          });
          that.$confirm({
            title: "确认操作",
            content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
            onOk: function () {
              frozenBatch({ids: ids, status: status}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              });
            }
          });
        }
      },
      handleMenuClick(e) {
        this.confirmLoading = true
        if (e.key == 2) {
          this.batchFrozen(2);
        } else if (e.key == 3) {
          this.batchFrozen(1);
        }
      },
      handleFrozen: function (id, status) {
        let that = this;
        frozenBatch({ids: id, status: status}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      // 重置密码
      resetPassword(username) {
        this.confirmLoading = true;
        this.formData.username = username
        httpAction(this.url.retrievePasswordUrl, this.formData, 'post').then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            let userInfo = JSON.parse(localStorage.getItem("pro__Login_Username"))
            if (userInfo.value === username) {
              this.handleLogout()
            }
          } else {
            this.$message.error(res.message)
          }
          this.confirmLoading = false
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      handleLogout() {
        const that = this
        return that.Logout({}).then(() => {
          window.location.href = '/user/login'
        }).catch(err => {
          that.$message.error({
            title: '错误',
            description: err.message
          })
        })
      }
    }
  }
</script>
<style scoped>
  /** Button按钮间距 */

  .table-operator button {
    margin-bottom: 18px;
    margin-right: 5px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }

  .anty-img-wrap > img {
    max-height: 100%;
  }
</style>
