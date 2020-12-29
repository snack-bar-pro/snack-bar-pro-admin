<template>
  <div class="app-container">
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
      <el-table-column width="110" label="Price">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="Image" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.thumb"  width="70" height="70" />
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

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
    fetchData() {
      this.listLoading = true
      // getAllCommodity().then((res) => {})
      setTimeout(() => {
        this.listLoading = false
      }, 1000)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
