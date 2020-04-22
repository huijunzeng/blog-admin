<template>
    <div id="main">
      <el-form :inline="true" :model="searchData" class="fl">
        <el-input style="display: none;"></el-input>
        <el-form-item label="文章标题">
          <el-input  placeholder="请输入文章标题" @keyup.enter.native="onSearch()"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="分类">
          <el-select v-model="listQuery.classificationId" clearable
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
          <el-select v-model="listQuery.labelId" clearable
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
                     v-model="listQuery.visible"
                     placeholder="是否私密">
            <el-option v-for="item in visibleOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <mavon-editor ref="editor" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="doc"/>
    </div>

</template>

<script>
  import { uploadImage } from '@/api/qiniu'
  import { getAllClassifications } from '@/api/weblog/classification'
  import { getAllLabels } from '@/api/weblog/label'
  export default {
    name: 'articleCreate',
    data() {
      return {
        doc: '',
        markdown: '',
        html: '',
        url: '',
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
        // 查询参数
        listQuery: {
          title: '',
          classificationId: '',
          labelId: '',
          createdTimeStart: '',
          createdTimeEnd: '',
          visible: '',
          deleted: '',
          pageNum: 1,
          pageSize: 10
        },
        // 文章私密 是否私密不可见 0否 1是
        visibleOptions: [
          { value: '0', label: '公开' },
          { value: '1', label: '私密' },
        ],
      }
    },
    methods: {
      async $imgAdd(filename, file) {
        var formData = new FormData();
        console.log("formData:", formData)
        formData.append("file", file); //key名对应后台要求传的参数名
        await uploadImage(formData).then(response => {
             this.url = response.data
             console.log("url:", response.data)
             this.$refs.editor.$img2Url(filename, response.data);
        })
      },
      /**
       * 分类列表
       */
      getAllClassifications(isShow) {
        console.log("============", isShow)
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
      }
    }
  }
</script>

