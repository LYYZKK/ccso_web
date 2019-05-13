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

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件编号">
          <a-input placeholder="请输入文件编号" v-decorator="['no', validatorRules.no]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件名称">
          <a-input placeholder="请输入文件名称" v-decorator="['name', validatorRules.name]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件格式">
          <a-checkbox v-model="formatObj.XLS">XLS</a-checkbox>
          <a-checkbox v-model="formatObj.XLSX">XLSX</a-checkbox>
          <a-checkbox v-model="formatObj.DOC">DOC</a-checkbox>
          <a-checkbox v-model="formatObj.DOCX">DOCX</a-checkbox>
          <a-checkbox v-model="formatObj.PDF">PDF</a-checkbox>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文件大小">
          <a-input-number v-decorator="['size', validatorRules.size]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "InformationModal",
    data() {
      return {
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
        form: this.$form.createForm(this),
        url: {
          add: "/review/information/add",
          edit: "/review/information/edit",
        },
        formatObj: {
          XLS: false,
          XLSX: false,
          DOC: false,
          DOCX: false,
          PDF: false
        },
        formatResult: '',
        validatorRules: {
          no: {rules: [{required: true, message: '请输入编号!'}]},
          name: {rules: [{required: true, message: '请输入文件名!'}]},
          size: {rules: [{required: true, message: '请输入文件大小!'}]},
        },
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        if (JSON.stringify(record) !== '{}') {
          var str = record.format.split(",")
          for (var i = 0; i < str.length; i++) {
            this.formatObj[str[i]] = true
          }
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'no', 'name', 'format', 'size'))
          //时间格式化
        });

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
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            for (var i in this.formatObj) {
              if (this.formatObj[i] == true) {
                this.formatResult += i + ','
              }
            }
            var suffix = this.formatResult.substring(this.formatResult.length-1, this.formatResult.length)
            if (suffix===',') {
              this.formatResult = this.formatResult.substring(0, this.formatResult.length-1)
            }
            values.format = this.formatResult
            let formData = Object.assign(this.model, values);
            //时间格式化
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              this.formatObj = {XLS: false, XLSX: false, DOC: false, DOCX: false, PDF: false};
              this.formatResult = '';
              that.close();
            })
          }
        })
      },
      handleCancel() {
        this.formatObj = {XLS: false, XLSX: false, DOC: false, DOCX: false, PDF: false};
        this.formatResult = '';
        this.close()
      },
    }
  }
</script>

<style scoped>

</style>
