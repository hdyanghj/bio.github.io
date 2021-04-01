<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-alert
    v-if="aleftText"
    :title="aleftText"
    type="warning">
  </el-alert>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品名" prop="name">
      <el-input v-model="dataForm.name" placeholder="商品名"></el-input>
    </el-form-item>
    <el-form-item label="商品图片" prop="picture">
      <!-- <el-input v-model="dataForm.picture" placeholder="商品图片"></el-input> -->
      <el-upload
        action="http://cms.v7-sport.com:8080/mall/file/uploads"
        list-type="picture-card"
        name="muFile"
        :file-list="picFileList"
        :headers="headers"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="upPic">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogPictureUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-form-item label="优惠价" prop="rebatePrice">
          <el-input v-model="dataForm.rebatePrice" placeholder="优惠价"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原价" prop="price">
          <el-input v-model="dataForm.price" placeholder="原价"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-form-item label="套餐" prop="dynamicTags">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item label="介绍" prop="intro">
      <el-input
        type="textarea"
        placeholder="介绍"
        v-model="dataForm.intro"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="详情图片" prop="detailsPicture">
      <el-upload
        action="http://cms.v7-sport.com:8080/mall/file/uploads"
        list-type="picture-card"
        name="muFile"
        :file-list="imgFileList"
        :headers="headers"
        :on-preview="handleImageCardPreview"
        :on-remove="handleImageRemove"
        :on-success="upImg">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogDisplay ">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          goodsId: 0,
          name: '',
          intro: '',
          rebatePrice: '',
          price: '',
          tag: '',
          picture: '',
          detailsPicture: ''
        },
        dataRule: {
          name: [
            { required: true, message: '商品名不能为空', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '介绍不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          picture: [
            { required: true, message: '商品图片不能为空', trigger: 'blur' }
          ]
        },
        // 上传主题
        dialogPictureUrl: '',
        dialogVisible: false,
        picFileList: [],
        // 上传详情
        dialogImageUrl: '',
        dialogDisplay: false,
        imgFileList: [],
        // 套餐
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        aleftText: null
      }
    },
    computed: {
      headers () {
        let token = Vue.cookie.get('token')
        return {
          'token': token
        }
      }
    },
    methods: {
      init (id) {
        this.dynamicTags = []
        this.picFileList = []
        this.imgFileList = []
        this.dataForm = {
          goodsId: 0,
          name: '',
          intro: '',
          rebatePrice: '',
          price: '',
          tag: '',
          picture: '',
          detailsPicture: ''
        }
        this.dataForm.goodsId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.goodsId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/goods/info/${this.dataForm.goodsId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              console.log(data)
              if (data && data.code === 0) {
                this.dataForm.name = data.goods.name
                this.dataForm.intro = data.goods.intro
                this.dataForm.price = data.goods.price
                this.dataForm.rebatePrice = data.goods.preferentialPrice
                this.dataForm.num = data.goods.num
                this.dynamicTags = data.goods.specification.split(',')
                let picFileList = (data.goods.picture).split(',')
                let imgFileList = (data.goods.images).split(',')
                console.log(this.dataForm)

                if (picFileList.length > 0) {
                  picFileList.forEach(item => {
                    var obj = {}
                    let index = item.lastIndexOf('/')
                    let fileName = item.substring(index + 1, item.length) // 最后的文件名截取出来
                    this.$set(obj, 'name', fileName)
                    this.$set(obj, 'url', item) // 修改files里面的结构（name,url）
                    this.picFileList.push(obj)
                  })
                }
                if (imgFileList.length > 0) {
                  imgFileList.forEach(item => {
                    var obj = {}
                    let index = item.lastIndexOf('/')
                    let fileName = item.substring(index + 1, item.length) // 最后的文件名截取出来
                    this.$set(obj, 'name', fileName)
                    this.$set(obj, 'url', item) // 修改files里面的结构（name,url）
                    this.imgFileList.push(obj)
                  })
                }
                console.log(this.picFileList)
                console.log(this.imgFileList)
              }
            })
          }
        })
      },
      // 上传图片
      upPic (response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
        this.picFileList = fileList
        console.log(this.picFileList)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.picFileList = fileList
      },
      handlePictureCardPreview (file) {
        this.dialogPictureUrl = file.url
        this.dialogVisible = true
      },
      // 上传详情 handleImageRemove
      upImg (response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
        this.imgFileList = fileList
        console.log(this.imgFileList)
      },
      handleImageRemove (file, fileList) {
        console.log(file, fileList)
        this.imgFileList = fileList
      },
      handleImageCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogDisplay = true
      },
      // 添加tag
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          for (let i = 0; i < this.dynamicTags.length; i++) {
            if (this.dynamicTags[i] === inputValue) {
              console.log('重复')
              this.aleftText = 'tag ditto'
              setTimeout(() => {
                this.aleftText = null
              }, 2000)
              return
            }
          }
          this.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.picFileList)
        console.log(this.imgFileList)
        let picurl = []
        for (let i = 0; i < this.picFileList.length; i++) {
          if (this.picFileList[i].response) {
            console.log(this.picFileList[i].url)
            picurl.push(this.picFileList[i].response.path)
          } else {
            picurl.push(this.picFileList[i].url)
          }
        }
        let imgurl = []
        for (let i = 0; i < this.imgFileList.length; i++) {
          if (this.imgFileList[i].response) {
            console.log(this.imgFileList[i].url)
            imgurl.push(this.imgFileList[i].response.path)
          } else {
            imgurl.push(this.imgFileList[i].url)
          }
        }
        this.dataForm.picture = picurl.join(',')
        this.dataForm.detailsPicture = imgurl.join(',')
        this.dataForm.tag = this.dynamicTags.join(',')
        console.log(this.dataForm)
        // return
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/goods/${!this.dataForm.goodsId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'goodsId': this.dataForm.goodsId || undefined,
                'name': this.dataForm.name,
                'intro': this.dataForm.intro,
                'price': this.dataForm.price,
                'preferentialPrice': this.dataForm.rebatePrice,
                'num': 1000,
                'picture': this.dataForm.picture,
                'specification': this.dataForm.tag,
                'images': this.dataForm.detailsPicture
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
