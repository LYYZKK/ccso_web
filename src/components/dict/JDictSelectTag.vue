<template>
  <a-select :placeholder="placeholder" :value="value" @change="handleInput">
    <a-select-option v-if="hasEmptyOption" value>{{ emptyOptionText }}</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-select-option>
  </a-select>
</template>

<script>
  import {ajaxGetDictItems} from '@/api/api'

  export default {
    name: 'JDictSelectTag',
    props: {
      dictCode:{
        type: String,
        required: true,
      },
      placeholder:{
        type: String,
        required: false,
        default: ''
      },
      triggerChange: Boolean,
      value: {
        type: String,
        required: false,
        default: ''
      },
      hasEmptyOption: {
        type: Boolean,
        required: false,
        default: true
      },
      emptyOptionText: {
        type: String,
        required: false,
        default: '请选择'
      }
    },
    data() {
      return {
        dictOptions: []
      }
    },
    created() {
      // 获取字典数据.
      this.initDictData()
    },
    methods: {
      initDictData() {
        // 根据字典Code, 初始化字典数组.
        ajaxGetDictItems(this.dictCode, null).then((res) => {
          if (res.success) {
            this.dictOptions = res.result
          }
        })
      },
      handleInput(val) {
        if(this.triggerChange){
          this.$emit('change', val)
        } else {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<style scoped>
</style>
