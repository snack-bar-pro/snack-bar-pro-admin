<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
      style="float: right; margin-right: 25px;"
      @click="handleCreate()"
    >Create</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="Title" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="440" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column width="220" label="Price">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column width="220" label="Category">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column label="Image" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.thumb" width="70" height="70">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getAllCommodity, delCommodity } from '@/api/commodity'
import { baseUrl } from '@/utils/constant'

export default {

  data() {
    return {
      currentPage: 1,
      total: 10,
      pageSize: 10,
      list: [{
        id: 0,
        price: 100,
        title: '可乐',
        desc: '快乐水',
        thumb: require('@/assets/commodity_images/coke.jpg')
      }, {
        id: 1,
        price: 100,
        title: '可乐',
        desc: '快乐水',
        thumb: require('@/assets/commodity_images/coke.jpg')
      }],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const result = await getAllCommodity(0, 10)
      this.list = await result.data
      for (const listKey in this.list) {
        this.list[listKey].thumb = baseUrl + this.list[listKey].thumb
      }
      this.listLoading = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'Form',
        params: {
          id: row._id,
          title: row.title,
          desc: row.desc,
          price: row.price,
          thumb: row.thumb,
          category: row.category,
          action: 'Update'
        }
      })
    },
    handleDelete(index, row) {
      const commodityId = row._id
      delCommodity(commodityId)
      this.fetchData()
    },
    handleCreate() {
      this.$router.push({ name: 'Form' })
    }
  }
}
</script>
