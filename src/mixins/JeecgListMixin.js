/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * 高级查询按钮调用 superQuery方法  高级查询组件ref定义为superQueryModal
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 */
import keys from 'lodash.keys'

import { filterObj } from '@/utils/util'
import { deleteAction, getAction } from '@/api/manage'
export const JeecgListMixin = {
  data(){
    return {
      /* 查询条件 */
      queryParam: {},
      queryParamWithQueryType: {},
      /* 查询条件类型 */
      queryType: {},
      queryTypeAlias: {
        like: v => `*${v}*`, // 全模糊.
        llike: v => `*${v}`, // 左模糊.
        rlike: v => `${v}*`, // 右模糊.
        gt: v => `>${v}`, // 大于.
        gte: v => `>=${v}`, // 大于等于.
        eq: v => v, // 等于.
        lt: v => `<${v}`, // 小于.
        lte: v => `<=${v}`, // 小于等于.
        ne: v => `!${v}`, // 不等于.
      },
      /* 数据源 */
      dataSource:[],
      /* 分页参数 */
      ipagination:{
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter:{
        column: 'createTime',
        order: 'desc',
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading:false,
      /* table选中keys*/
      selectedRowKeys: [],
      /* table选中records*/
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus:false,
      /* 高级查询条件生效状态 */
      superQueryFlag:false,
      /* 高级查询条件 */
      superQueryParams:"",
    }
  },
  created() {
    this.loadData();
    //初始化字典配置 在自己页面定义
    this.initDictConfig();
  },
  methods:{
    loadData(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();//查询条件
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
      })
    },
    initDictConfig(){
      console.log("--这是一个假的方法!")
    },
    handleSuperQuery(arg) {
      //高级查询方法
      if(!arg){
        this.superQueryParams=''
        this.superQueryFlag = false
      }else{
        this.superQueryFlag = true
        this.superQueryParams=JSON.stringify(arg)
      }
      this.loadData()
    },
    filterQueryParamsByQueryType() {
      keys(this.queryParam).forEach(v => {
        if (this.queryType[v] && this.queryTypeAlias[this.queryType[v]]) {
          this.queryParamWithQueryType[v] = this.queryTypeAlias[this.queryType[v]](this.queryParam[v])
        } else if (this.queryParam[v] != null && this.queryParam[v] != undefined) {
          this.queryParamWithQueryType[v] = this.queryParam[v]
        }
      })
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if(this.superQueryParams){
        sqp['superQueryParams']=encodeURI(this.superQueryParams)
      }

      this.filterQueryParamsByQueryType()

      var param = Object.assign(sqp, this.queryParamWithQueryType, this.isorter ,this.filters)
      param.field = this.getQueryField()
      param.pageNo = param.pageNo === undefined || param.pageNo === null ? this.ipagination.current : param.pageNo
      param.pageSize = param.pageSize === undefined || param.pageSize === null ? this.ipagination.pageSize : param.pageSize
      return filterObj(param)
    },
    getQueryField() {
      //TODO 字段权限控制
      var str = "id,";
      this.columns.forEach(function (value) {
        str += "," + value.dataIndex;
      });
      return str;
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    onClearSelected() {
      this.selectedRowKeys = [];
      this.selectionRows = [];
    },
    searchQuery() {
      this.loadData(1);
    },
    superQuery() {
      this.$refs.superQueryModal.show();
    },
    searchReset() {
      this.queryParam = {}
      this.queryParamWithQueryType = {}
      this.loadData(1);
    },
    batchDel() {
      if(!this.url.deleteBatch){
        this.$message.error("请设置url.deleteBatch属性!")
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！');
        return
      } else {
        var ids = "";
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ","
        }
        var that = this
        this.$confirm({
          title: "确认删除",
          content: "是否删除选中数据?",
          onOk: () => {
            deleteAction(that.url.deleteBatch, {ids: ids}).then((res) => {
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
    handleDelete(id) {
      if(!this.url.delete){
        this.$message.error("请设置url.delete属性!")
        return
      }
      var that = this;
      deleteAction(that.url.delete, {id: id}).then((res) => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      });
    },
    handleEdit(record) {
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "编辑";
    },
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = "新增";
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field;
        this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
      }
      this.ipagination = pagination;
      this.loadData();
    },
    handleToggleSearch(){
      this.toggleSearchStatus = !this.toggleSearchStatus;
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData();
    },
    handleDetail(record){
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title="详情";
      this.$refs.modalForm.disableSubmit = true;
    },
    /* 导出 */
    handleExportXls(){
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
      let url = `${window._CONFIG['domainURL']}/${this.url.exportXlsUrl}?paramsStr=${paramsStr}`;
      window.location.href = url;
    },
    /* 导入 */
    handleImportExcel(info){
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 文件上传成功`);
        this.loadData();
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  }
}
