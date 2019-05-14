/**
 * 字典 util
 * author: scott
 * date: 20190109
 */
import toString from 'lodash.tostring'

import {ajaxGetDictItems} from '@/api/api'
import {getAction} from '@/api/manage'

/**
 * 获取字典数组
 * @param dictCode 字典Code
 * @return List<Map>
 */
export async function initDictOptions(dictCode) {
  if (!dictCode) {
    return '字典Code不能为空!'
  }
  //获取字典数组
  return await ajaxGetDictItems(dictCode)
}

/**
 * 字典值替换文本通用方法
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterDictText(dictOptions, text) {
  let re = ""
  dictOptions.forEach(option => {
    if (toString(text) === toString(option.value)) {
      re = option.text
      return
    }
  })

  return re
}

/**
 * 根据字典值获取字典对象
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterDictOptionByText(dictOptions, text) {
  let re = {}
  dictOptions.forEach(option => {
    if (toString(text) === toString(option.value)) {
      re = option
      return
    }
  })

  return re
}

/**
 * 字典值替换文本通用方法(多选)
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterMultiDictText(dictOptions, text) {
  if(!text) {
    return ""
  }
  let re = "", arr = text.split(",")
  dictOptions.forEach(function (option) {
    for(let i = 0; i < arr.length; i++){
      if (arr[i] === option.value) {
        re += option.text + ","
        break
      }
    }
  })
  if(re == "") {
    return re
  }
  return re.substring(0, re.length - 1)
}

/**
 * 翻译字段值对应的文本
 * @param children
 * @returns string
 */
export async function ajaxFilterDictText(dictCode, key) {
  if (!dictCode) {
    return '字典Code不能为空!'
  }
  if (!key) {
    return ''
  }

  //通过请求读取字典文本
  let res = await getAction(`/sys/dict/getDictText/${dictCode}/${key}`)

  return res.success ? res.result : ''
}

/**
 * 根据字典编码和字典项编码查询字典项.
 *
 * @param dictCode 数据字典编码
 * @param itemCode 数据字典项编码
 * @returns 数据字典项.
 */
export async function getDictItemByDictCodeAndItemCode(dictCode, itemCode) {
  if (!dictCode) {
    return '字典Code不能为空!'
  }
  if (!itemCode) {
    return '字典项Code不能为空!'
  }

  //通过请求读取字典文本
  let res = await getAction(`/sys/dictItem/query/${dictCode}/${itemCode}`)

  return res.success ? res.result : {}
}
