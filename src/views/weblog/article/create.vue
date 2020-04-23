<template>
    <div id="main">
      <el-form :inline="true" class="fl">
        <el-form-item label="标题">
          <el-input  placeholder="请输入文章标题" v-model="temp.title"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="分类">
          <el-select v-model="temp.classificationId" multiple clearable
                     style="width: 120px" class="filter-item" placeholder="请选择分类"
                     @visible-change="getAllClassifications">
            <el-option v-for="item in classificationList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="temp.labelId" multiple clearable
                     style="width: 120px" class="filter-item" placeholder="请选择标签"
                     @visible-change="getAllLabels">
            <el-option v-for="item in labelList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限">
          <el-select clearable
                     style="width: 120px"
                     class="filter-item"
                     v-model="temp.visible"
                     placeholder="是否私密">
            <el-option v-for="item in visibleOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="mavonEditor">
        <mavon-editor ref=md :toolbars="toolbars" :ishljs="true" @imgAdd="uploadImage" @imgDel="deleteImage"/>
      </div>
      <!--对话框动作按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData">保存</el-button>
      </div>
    </div>

</template>

<script>
  import { uploadImage } from '@/api/qiniu'
  import { createArticle } from '@/api/weblog/article'
  import { getAllClassifications } from '@/api/weblog/classification'
  import { getAllLabels } from '@/api/weblog/label'
  export default {
    name: 'articleCreate',
    data() {
      return {
        doc: '',
        markdown: '',
        html: '',
        classificationList: '',
        labelList: '',
        // 保存参数
        temp: {
          title: '',
          classificationId: [],
          labelId: [],
          visible: '',
          content: 1
        },
        // 文章私密 是否私密不可见 0否 1是
        visibleOptions: [
          { value: '0', label: '公开' },
          { value: '1', label: '私密' },
        ],
        // markdown工具栏配置
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
      }
    },
    methods: {
      /**
       * 分类列表
       */
      getAllClassifications(isShow) {
        if (isShow) {
          getAllClassifications().then(response => {
            this.classificationList = response.data
          })
        }
      },
      /**
       * 标签列表
       */
      getAllLabels(isShow) {
        if (isShow) {
          getAllLabels().then(response => {
            this.labelList = response.data
          })
        }
      },
      /**
       * 上传图片
       * @param pos url回填位置
       * @param file 文件
       */
      uploadImage(pos, file) {
        console.log('pos:', pos)
        console.log('file:', file)
        const formData = new FormData()
        formData.append('file', file); //key名对应后台要求传的参数名
        uploadImage(formData).then(response => {
          const data = response.data
          if (data.status === 'success' && data.url) {
            // 回填服务器url
            /**
             * $vm 指为mavonEditor实例，可以通过如下两种方式获取
             * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
             * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
             */
            //$vm.$img2Url(pos, url)
            this.$refs.md.$img2Url(pos, response.data.url+'#width-full')
          }
        })
      },
      /**
       * 保存文章
       */
      createData() {
          // 获取 markdown
          //let markdown = this.$refs.md.d_value;
          // 获取编译后的 html
          this.temp.content = this.$refs.md.d_render
          createArticle(this.temp).then(() => {
            this.$notify({
              title: '创建成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            // todo查看详情
          })
      },
    }
  }
</script>
<style scoped>
  /*
  * 可设置全局属性？
  * ![trump.jpg](https://view.moezx.cc/images/2018/05/27/trump.jpg#width-full)  设置图片大小宽高：url拼接属性
  */
  img[src*="#width-full"] {
    width: 100%;
  }
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
</style>
