<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
          <br><br>
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
          <br>
          <template>
            <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input type="password" placeholder="请输入登陆密码" v-decorator="[ 'password', validatorRules.password]" />
            </a-form-item>
            <br>
            <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码"
                       v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
            </a-form-item>
          </template>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {getAction, httpAction} from '@/api/manage'

  export default {
    name: "UserModal",
    data() {
      return {
        confirmDirty: false,
        form: this.$form.createForm(this),
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
        confirmLoading: false,
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
        url: {
          add: "/sys/user/add",
          personnelUrl: "/sys/personnel/queryIdAndNameAll", // 查询所有员工
        },
        firstPassword:'',
        personnelData: [],
      }
    },
    created() {
    },
    computed: {},
    mounted() {
      this.initSelectOptions()
    },
    methods: {
      initSelectOptions() {
        // 初始化下拉框 - 所有员工
        getAction(this.url.personnelUrl).then(res => {
          if (res.success) {
            this.personnelData = res.result
          }
        })
      },
      add() {
        this.form.resetFields()
        this.visible = true;
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            httpAction(this.url.add, formData, 'post').then((res) => {
              if (res.success) {
                that.$message.success(res.message)
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
      handleCancel() {
        this.close()
      },

      validateToNextPassword  (rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback();
      },
      compareToFirstPassword (rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！');
        } else {
          callback()
        }
      },
      handleConfirmBlur  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      }
    }
  }
</script>

<style scoped>

</style>
