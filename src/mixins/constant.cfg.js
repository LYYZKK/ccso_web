import filter from 'lodash.filter'

export const constantCfgMixin = {
  data(){
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
      }
    }
  }
}
