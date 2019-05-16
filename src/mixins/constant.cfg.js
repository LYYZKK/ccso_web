import filter from 'lodash.filter'
import Vue from 'vue'

import { ACCESS_TOKEN } from "@/store/mutation-types"

export default {
  data() {
    return {
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
      UPLOAD_CHANGE_HANDLER: (input, fieldName) => {
        if (input.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (input.file.status === 'done') {
          var response = input.file.response;
          this.uploadLoading = false;
          if (response.success) {
            this.model[fieldName] = response.message;
          } else {
            this.$message.warning(response.message);
          }
        }
      },
      FILE_UPLOAD_HEADERS: {
        'X-Access-Token': Vue.ls.get(ACCESS_TOKEN)
      },
      FILE_UPLOAD_URL: `${window._CONFIG['domainURL']}/sys/common/upload`,
      FILE_UPLOAD_ACTION: () => {
        return this.FILE_UPLOAD_URL
      },
      FILE_REVIEW_BASE_URL: `${window._CONFIG['domainURL']}/sys/common/view`,
      IMAGE_REVIEW_URL_RENDER: (filePathSuffix) => {
        return `${this.this.FILE_REVIEW_BASE_URL}/${filePathSuffix}`
      },
      FILE_DOWNLOAD_BASE_URL: `${window._CONFIG['domainURL']}/sys/common/view`,
      FILE_DOWNLOAD_URL_RENDER: (filePathSuffix) => {
        return `${this.this.FILE_DOWNLOAD_BASE_URL}?filePath=${filePathSuffix}`
      }
    }
  }
}
