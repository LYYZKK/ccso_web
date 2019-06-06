import filter from 'lodash.filter'
import isFunction from 'lodash.isfunction'
import Vue from 'vue'

import { ACCESS_TOKEN } from "@/store/mutation-types"

export default {
  data() {
    return {
      files: {},
      DICT_SHOW_COLORS: [
        {value: 'pink', description: '粉红色'},
        {value: 'red', description: '红色'},
        {value: 'orange', description: '橘黄色'},
        {value: 'green', description: '绿色'},
        {value: 'cyan', description: '青绿色'},
        {value: 'blue', description: '蓝色'},
        {value: 'purple', description: '紫色'}
      ],
      DICT_SHOW_TYPES: [
        {value: 'text', description: '文本', render: ({text, show_color}) => !show_color ? text : (<font color={show_color}>{text}</font>)},
        {value: 'tag', description: '标签', render: ({text, show_color}) => {return (<a-tag color={show_color}>{text}</a-tag>)}},
      ],
      DICT_SHOW_RENDER: ({text, show_type, show_color}) => {
        return filter(this.DICT_SHOW_TYPES, {value: show_type || 'text'})[0].render({text, show_color})
      },
      UPLOAD_CHANGE_HANDLER: (info, fieldName, callback, uploadLoading = 'uploadLoading') => {
        this.files = this.files || {}
        if (info.file.status === 'uploading') {
          this[uploadLoading] = true
          return
        }
        if (info.file.status === 'done') {
          this[uploadLoading] = false
          const response = info.file.response
          if (response.success) {
            if (fieldName) this.files[fieldName] = response.message
            if (isFunction(callback)) callback(this.files)
          } else {
            this.$message.warning(response.message)
          }
        } else if (info.file.status === 'error') {
          this.$message.error(`上传失败！`);
        }
      },
      FILE_UPLOAD_HEADERS: {
        'X-Access-Token': Vue.ls.get(ACCESS_TOKEN)
      },
      BEFORE_UPLOAD: (file) => {
        return true
      },
      FILE_UPLOAD_URL: `${window._CONFIG['domainURL']}/sys/common/upload`,
      FILE_UPLOAD_ACTION: () => {
        return this.FILE_UPLOAD_URL
      },
      FILE_REVIEW_BASE_URL: `${window._CONFIG['domainURL']}/sys/common/view`,
      IMAGE_REVIEW_URL_RENDER: (filePathSuffix) => {
        return `${this.FILE_REVIEW_BASE_URL}/${filePathSuffix}`
      },
      FILE_DOWNLOAD_BASE_URL: `${window._CONFIG['domainURL']}/sys/common/download`,
      FILE_DOWNLOAD_URL_RENDER: (filePathSuffix, originalFileName) => {
        return `${this.FILE_DOWNLOAD_BASE_URL}?filePath=${filePathSuffix}&originalFileName=${originalFileName}`
      },
      BEFORE_FILE_UPLOAD_ACTION: (file) => {

      }
    }
  }
}
