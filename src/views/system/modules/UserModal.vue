<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>

    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">


        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所有员工">
          <a-select
            v-model="model.personnelId"
            showSearch
            :filterOption="filterOption"
            placeholder="请选择员工"
            v-decorator="['personnelId', validatorRules.personnelId]"
          >
            <a-select-option value="">请选择</a-select-option>
            <a-select-option
              v-for="(_type, key) in personnelData"
              :key="key"
              :value="_type.id"
            >{{ _type.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <template v-if="!model.id">
          <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" placeholder="请输入登陆密码" v-decorator="[ 'password', validatorRules.password]"/>
          </a-form-item>

          <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码"
                     v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
          </a-form-item>
        </template>

        <a-form-item label="角色分配" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="请选择用户角色"
            v-model="selectedRole">
            <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-button style="margin-right: .8rem">取消</a-button>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import moment from 'moment'
  import {getAction, httpAction} from '@/api/manage'
  import {addUser, editUser, queryUserRole, queryall} from '@/api/api'

  export default {
    name: "RoleModal",
    data() {
      return {
        modalWidth: 800,
        drawerWidth: 700,
        confirmDirty: false,
        disableSubmit: false,
        validatorRules: {
          personnelId: {
            rules: [{
              required: true, message: '请选择员工!'
            }]
          },
          password: {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          },
          confirmpassword: {
            rules: [{
              required: true, message: '请重新输入登陆密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          },
        },
        title: "操作",
        visible: false,
        model: {},
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        url: {
          addUDepartIds: "/sys/user/addUDepartIds", // 引入为用户添加部门信息需要的url
          userWithDepart: "/sys/user/userDepartList", // 引入为指定用户查看部门信息需要的url
          personnelUrl: "/sys/personnel/queryIdAndNameAll", // 查询所有员工
        },
        personnelData: [],
      }
    },
    created() {
    },
    computed: {
    },
    mounted() {
      this.initSelectOptions()
    },
    methods: {
      //窗口最大化切换
      toggleScreen() {
        if (this.modaltoggleFlag) {
          this.modalWidth = window.innerWidth;
        } else {
          this.modalWidth = 800;
        }
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      initSelectOptions() {
        // 初始化下拉框 - 所有员工
        getAction(this.url.personnelUrl).then(res => {
          if (res.success) {
            this.personnelData = res.result
          }
        })
      },
      initialRoleList() {
        // 初始化角色选项
        queryall().then((res) => {
          if (res.success) {
            this.roleList = res.result;
          } else {
            console.log(res.message);
          }
        });
      },
      loadUserRoles(userid) {
        queryUserRole({userid: userid}).then((res) => {
          if (res.success) {
            this.selectedRole = res.result;
          } else {
            console.log(res.message);
          }
        });
      },
      add() {
        this.resetScreenSize(); // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.visible = true;
      },

      close() {
        this.$emit('close');
        this.visible = false;
      },
      moment,
      handleSubmit() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let avatar = that.model.avatar;
            if (!values.birthday) {
              values.birthday = '';
            } else {
              values.birthday = values.birthday.format(this.dateFormat);
            }
            let formData = Object.assign(this.model, values);
            formData.avatar = avatar;
            formData.selectedroles = this.selectedRole.length > 0 ? this.selectedRole.join(",") : '';

            let obj;
            if (!this.model.id) {
              formData.id = this.userId;
              obj = addUser(formData);
            } else {
              obj = editUser(formData);
            }
            obj.then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.checkedDepartNames = [];
              that.close();
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },

      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], {force: true})
        }
        callback();
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！');
        } else {
          callback()
        }
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },

      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth < 500) {
          this.drawerWidth = screenWidth;
        } else {
          this.drawerWidth = 700;
        }
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader > .ant-upload {
    width: 104px;
    height: 104px;
  }

  .ant-upload-select-picture-card i {
    font-size: 49px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>
