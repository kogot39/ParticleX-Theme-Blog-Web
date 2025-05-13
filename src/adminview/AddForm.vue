<template>
  <el-card style="max-width: 1000px; max-height: 800px;overflow-y: scroll;">
    <el-form :model="form" style="max-width: 800px; width: 600px; " label-position="left">
      <el-form-item label="Blog Date">
        <el-col :span="11">
          <el-date-picker v-model="form.blogDate" type="date" placeholder="创建时间" style="width: 100%;" />
        </el-col>
      </el-form-item>

      <el-form-item label="Blog Title">
        <el-input v-model="form.title" placeholder="20字内" />
      </el-form-item>

      <el-form-item label="BlogPic Url">
        <el-input v-model="form.blogPic" placeholder="封面图片" />
      </el-form-item>

      <el-form-item label="Github Url">
        <el-input v-model="form.githubUrl" placeholder="项目Github地址" />
      </el-form-item>

      <el-form-item label="Blog Tags">
        <el-input v-model="form.tags" placeholder="类型" />
      </el-form-item>

      <el-form-item label="Blog Status">
        <el-radio-group v-model="form.blogStatus">
          <el-radio :value="1">Display</el-radio>
          <el-radio :value="2">UnDisplay</el-radio>
          <el-radio :value="3">modify</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Blog Content">
        <el-input v-model="form.content" type="textarea" placeholder="200字内" />
      </el-form-item>

      <el-form-item label="Blog Overview">
        <el-input v-model="form.blogOverview" type="textarea"/>
      </el-form-item>

      <div v-for="(item, index) in form.blogText" class="blog_text_row" :class="{ active: index == count.currentRow }"
        @click="selectBlogText(index)">
        <div style="display: flex; justify-content: right;margin: 0px 0 10px 0;">
          <el-button type="danger" circle size="small" @click.stop="deleteBlogText(index)"><i
              class="fa-regular fa-trash-can" style="color: #fff;"></i></el-button>
        </div>
        <el-form-item label="SubTitle" v-if="count.show[index].subTitle">
          <div class="input-with-delete">
            <el-input v-model="item.subTitle" placeholder="副标题" />
            <el-button type="danger" circle size="small" @click.stop="deleteRow('subTitle', index)"><i
                class="fa-regular fa-trash-can" style="color: #fff;"></i></el-button>
          </div>
        </el-form-item>

        <el-form-item label="Blog Content" v-if="count.show[index].blogContent">
          <div class="input-with-delete">
            <el-input v-model="item.blogContent" type="textarea" placeholder="正文" style="margin-right: 10px;" />
            <el-button type="danger" circle size="small" @click.stop="deleteRow('blogContent', index)"><i
                class="fa-regular fa-trash-can" style="color: #fff;"></i></el-button>
          </div>
        </el-form-item>

        <el-form-item label="Pic" v-if="count.show[index].pic">
          <div class="input-with-delete">
            <el-input v-model="item.pic" placeholder="图片地址" />
            <el-button type="danger" circle size="small" @click.stop="deleteRow('pic', index)"><i
                class="fa-regular fa-trash-can" style="color: #fff;"></i></el-button>
          </div>
        </el-form-item>

        <div v-if="count.show[index].code">
          <el-form-item label="Code Type">
            <div class="input-with-delete">
              <el-input v-model="item.codeType" placeholder="代码类型" />
              <el-button type="danger" circle size="small" @click.stop="deleteRow('code', index)"><i
                  class="fa-regular fa-trash-can" style="color: #fff;"></i></el-button>
            </div>
          </el-form-item>
          <el-form-item label="Code Text">
            <el-input v-model="item.codeText" type="textarea" placeholder="代码" />
          </el-form-item>
        </div>
      </div>
      <div class="add-button-container">
        <el-button type="primary" circle @click="addBlogText()"><i class="fa-solid fa-plus"
            style="color: #fff;"></i></el-button>
      </div>
      <div class="form-buttons-row">
        <div class="button-group-left">
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="closeForm">取消</el-button>
        </div>
        <div class="button-group-right">
          <el-button-group class="ml-4">
            <el-button type="primary" @click="showRow('subTitle')">副标题</el-button>
            <el-button type="primary" @click="showRow('blogContent')">正文</el-button>
            <el-button type="primary" @click="showRow('pic')">图片</el-button>
            <el-button type="primary" @click="showRow('code')">代码</el-button>
          </el-button-group>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { addBlog } from './js/adminapi';

const emit = defineEmits(['closeAddForm']);

const form = reactive({
  blogId: 0,
  blogUrl: '',
  blogPic: '',
  blogDate: '',
  title: '',
  content: '',
  tags: '',
  blogStatus: 1,
  githubUrl: '',
  blogOverview: '',
  blogText: [],
});
const onSubmit =async () => {
  const responseData = await addBlog(form);
  if (responseData.code == 1) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
  }
  else {
    ElMessage({
      type:'error',
      message: '添加失败',
    })
  }
  emit('closeAddForm')
}

const closeForm = () => {
  ElMessage({
    type: 'info',
    message: '取消添加',
  })
  emit('closeAddForm')
}

// 控制表单的增加
const count = reactive({
  show: [],
  sum: 0,
  currentRow: -1
})

const selectBlogText = (index) => {
  if (index == count.currentRow) {
    count.currentRow = count.sum - 1;
  }
  else count.currentRow = index;
}

const addBlogText = () => {
  form.blogText.splice(count.currentRow + 1, 0, {
    subTitle: '',
    blogContent: '',
    pic: '',
    codeType: '',
    codeText: '',
  })
  count.show.splice(count.currentRow + 1, 0, {
    subTitle: false,
    blogContent: false,
    pic: false,
    code: false,
  })
  count.currentRow++;
  count.sum++;
}

const showRow = (rowName) => {
  switch (rowName) {
    case 'subTitle':
      count.show[count.currentRow].subTitle = true;
      break;
    case 'blogContent':
      count.show[count.currentRow].blogContent = true;
      break;
    case 'pic':
      count.show[count.currentRow].pic = true;
      break;
    case 'code':
      count.show[count.currentRow].code = true;
      break;
  }
}

const deleteRow = (name, index) => {
  switch (name) {
    case 'subTitle':
      form.blogText[index].subTitle = '';
      count.show[index].subTitle = false;
      break;
    case 'blogContent':
      form.blogText[index].blogContent = '';
      count.show[index].blogContent = false;
      break;
    case 'pic':
      form.blogText[index].pic = '';
      count.show[index].pic = false;
      break;
    case 'code':
      form.blogText[index].codeType = '';
      form.blogText[index].codeText = '';
      count.show[index].code = false;
      break;
  }
}
const deleteBlogText = (index) => {
  form.blogText.splice(index, 1);
  count.show.splice(index, 1);
  count.sum--;
  if (count.sum == 0) count.currentRow = -1;
  else if (count.currentRow >= index) {
    count.currentRow--;
    if (count.currentRow == -1) count.currentRow = count.sum - 1;
  }
}
</script>

<style scoped>
:deep(.el-radio.is-checked) {

  /* 选中状态 */
  .el-radio__input {
    .el-radio__inner {
      background-color: var(--radio-color);
      /* 圆圈背景色 */
      border-color: var(--radio-color);
      /* 圆圈边框色 */
    }

    &.is-checked+.el-radio__label {
      color: var(--radio-color);
      /* 文本颜色 */
    }
  }
}

/* 为每个 radio 单独指定颜色 */
:deep(.el-radio:nth-child(1)) {
  --radio-color: #6cdb56;
}

:deep(.el-radio:nth-child(2)) {
  --radio-color: #ecce4e;
}

:deep(.el-radio:nth-child(3)) {
  --radio-color: #e36767;
}

.form-buttons-row {
  position: sticky;
  bottom: 20px;
  padding: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  width: 100%;
}

.button-group-left {
  flex: 1;
  display: flex;
  gap: 8px;
}

.button-group-right {
  flex: none;
  display: flex;
  justify-content: flex-end;
  width: auto;
}

.blog_text_row {
  border-color: rgba(200, 200, 200, 0.7);
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  transition: border-color 0.3s ease;
}

.active {
  border-color: rgba(91, 192, 222, 1);
}

.blog_text_row:hover {
  border-color: rgba(91, 192, 222, 0.8);
}

.input-with-delete {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.input-with-delete .el-input {
  flex: 1;
  margin-right: 10px;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px 0;
}
</style>
