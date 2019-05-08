<template>
  <div>
    <editor v-model="body" :init="init"></editor>
  </div>
</template>

<script>
  import tinymce from  'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'

  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'

  export default {
    name: "RciEditor",
    components: {
      Editor
    },
    props: {
      value: {
        default: '',
        type: String
      },
      config: {
        type: Object,
        default: () => {
          return {
            theme: 'modern',
            height: 600
          }
        }
      },
      url: {
        default: '',
        type: String
      },
      accept: {
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: {
        default: 2097152, // 2M.
        type: Number
      }
    },
    data() {
      return {
        body: this.value,
        init: {
          language_url: '/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/tinymce/skins/lightgray',
          height: 300,
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | insertfile link image | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code | undo redo | fullscreen `,//需要的工具栏
          plugins: `
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            lists
            textcolor
            colorpicker
            hr
            preview
          `,
          branding: false
        },
        content: this.value,
        visible: true,
      }
    },
    methods: {
      // getContent() {
      //   return tinymce.getContent()
      // }
    },
    created() {
    },
    mounted() {
      tinymce.init({})
    },
    watch: {
      body(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style scoped>
</style>