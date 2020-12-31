<template>
  <div class="app-container">
    <el-form ref="form" label-position="left" :model="form" label-width="150px">
      <el-form-item label="Commodity Title">
        <el-input v-model="form.title" prefix-icon="el-icon-fork-spoon" style="width: 300px" />
      </el-form-item>
      <el-form-item label="Commodity Price">
        <el-input v-model="form.price" prefix-icon="el-icon-coin" style="width: 150px" @keyup.native="inputPrice" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" style="width: 600px" />
      </el-form-item>
      <el-form-item label="Category">
        <el-select v-model="form.category" placeholder="please choose category!">
          <el-option label="Drinks" value="drinks" />
          <el-option label="Snacks" value="snacks" />
          <el-option label="Daily" value="Daily" />
        </el-select>
      </el-form-item>
      <el-form-item label="Image">
        <el-upload
          action=""
          :file-list="fileArr"
          list-type="picture-card"
          :limit="1"
          accept="image/*"
          auto-upload="false"
          :on-remove="handleRemove"
          :on-success="handleUpSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ action }}</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveCommodity, updateCommodity } from '../../api/commodity'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      action: 'Create',
      form: {
        id: '',
        title: '',
        desc: '',
        price: null,
        thumb: '',
        category: ''
      }
    }
  },
  computed: {
    fileArr() {
      // 上传图片 显示默认图片
      return this.form.icon_url ? [{ url: this.form.icon_url }] : []
    }
  },
  created() {
    if (this.$route && Object.keys(this.$route.params).length > 0) {
      this.fetchData(this.$route.params)
    }
  },
  methods: {
    onSubmit() {
      const commodity = {
        title: this.form.title,
        desc: this.form.desc,
        price: this.form.price,
        thumb: this.form.thumb,
        category: this.form.category
      }
      if (this.action === 'Create') {
        saveCommodity(commodity)
      } else {
        commodity._id = this.form.id
        updateCommodity(commodity)
      }
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleUpSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    inputPrice() {
      this.form.price = this.form.price.replace(/[^\d.]/g, '')
      this.form.price = this.form.price.replace(/^\./g, '')
      this.form.price = this.form.price.replace(/\.{2,}/g, '.')
      this.form.price = this.form.price.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      this.form.price = this.form.price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    },
    async fetchData(params) {
      this.form.id = params.id
      this.form.thumb = params.thumb
      this.form.title = params.title
      this.form.price = params.price
      this.form.desc = params.desc
      this.form.category = params.category
      if (this.action !== '') {
        this.action = params.action
      }
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

