<template>
  <div class="app-container">
    <div class="filter-container">

      <!--查询条件-->
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px"
                class="filter-item"
                placeholder="文章标题"
                v-model="listQuery.title">
      </el-input>
      <el-select v-model="listQuery.classificationId" clearable
                 style="width: 120px" class="filter-item" placeholder="请选择分类"
                 @visible-change="getAllClassifications">
        <el-option v-for="item in classificationList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="listQuery.labelId" clearable
                 style="width: 120px" class="filter-item" placeholder="请选择标签"
                 @visible-change="getAllLabels">
        <el-option v-for="item in labelList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable
                 style="width: 90px"
                 class="filter-item"
                 v-model="listQuery.visible"
                 placeholder="是否私密">
        <el-option v-for="item in visibleOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable
                 style="width: 90px"
                 class="filter-item"
                 v-model="listQuery.deleted"
                 placeholder="请选择用户状态">
        <el-option v-for="item in articleStatus"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <!--动作按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>

    <!--列表-->
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center" label="ID" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="文章标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="文章分类">
        <template slot-scope="scope">
          <span>{{scope.row.classificationId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="文章标签">
        <template slot-scope="scope">
          <span>{{scope.row.label}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ formatDateTime(scope.row.updatedTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{scope.row.updatedBy}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ formatDateTime(scope.row.createdTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createdBy}}</span>
        </template>
      </el-table-column>

       <el-table-column width="120px" align="center" label="权限">
          <template slot-scope="scope">
            <span>{{ formatVisible(scope.row.visible) }}</span>
          </template>
       </el-table-column>

       <el-table-column width="120px" align="center" label="删除">
          <template slot-scope="scope">
            <span>{{ formatStatus(scope.row.deleted) }}</span>
          </template>
       </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row.id)">
            查看详情
          </el-button>
          <el-button type="danger" size="mini" @click="deleteData(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页工具条-->
    <div class="pagination-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { queryArticleList, getArticle, deleteArticle } from '@/api/weblog/article'
  import { getAllClassifications } from '@/api/weblog/classification'
  import { getAllLabels } from '@/api/weblog/label'
  import moment from 'moment' // JavaScript 日期处理类库
  import waves from '@/directive/waves'

  export default {
    name: 'articleList',
    // 水波文效果
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: false,
        downloadLoading: false,
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
        // 文章状态
        articleStatus: [
          { value: '0', label: '启用' },
          { value: '1', label: '停用' },
        ],
        classificationList: [],
        labelList: [],
        dialogStatus: 'create',
        dialogFormVisible: false,

      }
    },
    filters: {

    },
    // 页面加载完成后显示列表页
    created() {
      this.queryArticleList()
      this.resetForm()
    },
    methods: {
      /**
       * 文章列表
       */
      queryArticleList() {
        this.listLoading = true
        queryArticleList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
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
      },
      // 查询过滤器
      handleFilter() {
        this.listQuery.pageNum = 1
        this.queryArticleList()
      },
      // 跳转至文章新增页面
      handleCreate() {
        this.$router.push('/weblog/article/create')
      },
      /**
       * 修改每页显示条数
       */
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.queryArticleList()
      },
      /**
       * 跳转到指定页
       */
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.queryArticleList()
      },
      /**
       * 删除文章
       */
      deleteData(id) {
        this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          type: 'warning'
        }).then(() => {
          deleteArticle(id).then(() => {
            this.$notify({
              title: '删除成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.queryArticleList()
          })
        })
      },
      /**
       * 文章私密状态转换 是否私密不可见 0否 1是
       */
      formatVisible(visible) {
        return visible === 1 ? '是' : '否'
      },
      /**
       * 文章状态转换
       */
      formatStatus(deleted) {
        return deleted === 1 ? '是' : '否'
      },
      /**
       * 时间格式化 YYYY-MM-DD HH:mm:ss
       * @returns {string}
       */
      formatDateTime(dateTime) {
        return dateTime ? moment(dateTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    }
  }
</script>

