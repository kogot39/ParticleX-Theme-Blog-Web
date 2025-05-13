import { markRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { deleteBlog } from './adminapi'

export const opendelete = (id) => {
  ElMessageBox.confirm(
    '是否确定删除该博客?',
    '警告！',
    {
      type: 'warning',
      icon: markRaw(Delete),
      closeOnClickModal: false,
      showClose: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  )
    .then(async () => {
      const responseData = await deleteBlog(id)
      if(responseData.code === 1){
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }
      else{
        ElMessage({
          type:'error',
          message: '删除失败',
        })
      }
      location.reload();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}