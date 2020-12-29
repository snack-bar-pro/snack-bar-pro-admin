<template>
  <div class="app-container">
    <el-form label-position="left" ref="form" :model="form" label-width="150px">
      <el-form-item label="Commodity Title">
        <el-input prefix-icon="el-icon-fork-spoon" v-model="form.title" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="Commodity Price">
        <el-input prefix-icon="el-icon-coin" @keyup.native="inputPrice" v-model="form.price" style="width: 150px"/>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" style="width: 600px"/>
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
          :on-success="handleUpSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        title: '',
        desc: '',
        price: null,
        thumb: ''
      }
    }
  },
  computed: {
    fileArr() {
      // 上传图片 显示默认图片
      return this.form.icon_url ? [{ url: this.form.icon_url }] : []
    }
  },
  methods: {
    onSubmit() {
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

