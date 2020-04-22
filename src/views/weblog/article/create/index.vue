<template>
  <!--<div class="app-container">
    <div class="filter-container">

      &lt;!&ndash;查询条件&ndash;&gt;
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="用户名"
                v-model="listQuery.username">
      </el-input>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="手机号"
                v-model="listQuery.mobile">
      </el-input>
      <el-select clearable
                 style="width: 90px"
                 class="filter-item"
                 v-model="listQuery.status"
                 placeholder="用户状态">
        <el-option v-for="item in userStatus"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>

      &lt;!&ndash;动作按钮&ndash;&gt;
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" :loading="downloadLoading"
                 @click="handleDownload">
        导出
      </el-button>
    </div>

    &lt;!&ndash;列表&ndash;&gt;
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center" label="ID"/>
      <el-table-column width="180px" align="center" label="用户号">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="用户姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      &lt;!&ndash;<el-table-column class-name="status-col" label="$t('table.status')" width="80">&ndash;&gt;
      &lt;!&ndash;<template slot-scope="scope">&ndash;&gt;
      &lt;!&ndash;<el-tag :type="scope.row.status | statusFilter">{{$t('user.status.'+scope.row.status)}}</el-tag>&ndash;&gt;
      &lt;!&ndash;</template>&ndash;&gt;
      &lt;!&ndash;</el-table-column>&ndash;&gt;

      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{scope.row.updatedBy}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createdBy}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">
            修改
          </el-button>
          <el-button type="danger" size="mini" @click="deleteData(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    &lt;!&ndash;翻页工具条&ndash;&gt;
    <div class="pagination-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.current"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    &lt;!&ndash;添加或编辑对话框&ndash;&gt;
    <el-dialog title="新增/修改" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right"
               label-width="120px" status-icon
               style='width: 80%; margin-left:60px;'>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="temp.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          &lt;!&ndash;:disabled="dialogStatus=='edit'"&ndash;&gt;
          <el-input
                  v-model="temp.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="temp.roleIds" multiple clearable
                     style="width: 100%;" placeholder="请选择"
                     @visible-change="getRoles">
            <el-option v-for="item in roleList"
                       :key="item.code"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户详情" prop="description">
          <el-input :rows="5"
                    type="textarea"
                    v-model="temp.description"
                    placeholder="请输入用户简介">
          </el-input>
        </el-form-item>
      </el-form>
      &lt;!&ndash;对话框动作按钮&ndash;&gt;
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-if="dialogStatus=='edit'" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
   </div>
-->
    <div id="main">
      <mavon-editor ref="editor" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="doc"/>
    </div>

</template>

<script>
  import { queryUserList, getUser, createUser, updateUser, deleteUser } from '@/api/admin/user'
  import { uploadImage } from '@/api/qiniu'
  import moment from 'moment' // JavaScript 日期处理类库

  import waves from '@/directive/waves'

  export default {
    name: 'articleCreate',
    data() {
      return {
        doc: '',
        markdown: '',
        html: '',
        url: ''
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
      }
    }
  }
</script>

