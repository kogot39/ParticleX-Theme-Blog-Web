<template>
    <div class="container">
        <div class="nav-container">
            <AdminNav />
        </div>
        <div class="content">
            <div class="row__head">
                <h2 class="row__title">Blog({{ blogList.total }})</h2>
            </div>
            <div class="row row--top-20">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table__th" style="width:5%">ID</th>
                            <th class="table__th" style="width: 35%;">BlogTitle</th>
                            <th class="table__th" style="width: 30%;">Date</th>
                            <th class="table__th" style="width: 15%;">Status</th>
                            <th class="table__th" style="width: 15%;">
                                <i class="fa-solid fa-plus table-row__plus" @click="showAddFormButton"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="blog in blogList.blogs" :key="blog.blogId">
                            <td data-column="ID" class="table-row__td table-row__id" style="width:5%">{{ blog.blogId }}
                            </td>
                            <td class="table-row__td" style="width: 35%;">
                                <div class="table-row__info">
                                    <p class="table-row__name">{{ blog.title }}</p>
                                    <!-- <span class="table-row__small"></span> -->
                                </div>
                            </td>
                            <td data-column="Date" class="table-row__td" style="width: 30%">
                                <div>
                                    <p class="table-row__date">{{ blog.blogDate }}</p>
                                </div>
                            </td>
                            <td data-column="Status" class="table-row__td" style="width: 15%;">
                                <p class="table-row__status status--green status" v-if="blog.blogStatus === 1">Display
                                </p>
                                <p class="table-row__status status--yellow status" v-if="blog.blogStatus === 2">
                                    UnDisplay
                                </p>
                                <p class="table-row__status status--red status" v-if="blog.blogStatus === 3">modify</p>
                            </td>
                            <td class="table-row__td" style="width: 15%;">
                                <i class="fa-regular fa-pen-to-square table-row__edit"
                                    @click="showFixFormButton(blog.blogId)"></i>
                                <i class="fa-regular fa-trash-can table-row__bin" @click="opendelete(blog.blogId)"></i>
                                <i class="fa-solid fa-arrow-right table-row__arrow"
                                    @click="toBlogPage(blog.blogId)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :page-size="10" :total="blogList.total"
                    :current-page="currentPage" @current-change="handlePageChange" class="mt-4" />
            </div>
        </div>
    </div>


    <div>
        <teleport to="body">
            <div v-if="showFixForm" class="formlay">
                <FixForm @closeFixForm="closeFixForm" :id="id" />
            </div>
        </teleport>
    </div>
    <div>
        <teleport to="body">
            <div v-if="showAddForm" class="formlay">
                <AddForm @closeAddForm="closeAddForm" />
            </div>
        </teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { opendelete } from './js/Delete';
import FixForm from './FixForm.vue';
import AddForm from './AddForm.vue';
import AdminNav from './AdminNav.vue';
import { getAdminBlogList } from './js/adminapi';

const showFixForm = ref(false);
const showAddForm = ref(false);
const id = ref(0);
const currentPage = ref(1);

const showFixFormButton = (blogId) => {
    id.value = blogId;
    showFixForm.value = true;
    document.body.style.overflowY = 'hidden';
}

const closeFixForm = () => {
    showFixForm.value = false;
    document.body.style.overflowY = 'scroll';
    getBlogList();
}

const showAddFormButton = () => {
    showAddForm.value = true;
    document.body.style.overflowY = 'hidden';
}

const closeAddForm = () => {
    showAddForm.value = false;
    document.body.style.overflowY = 'scroll';
    currentPage.value = 1;
    getBlogList();
}

const router = useRouter();

const blogList = ref({
    total: 0,
    blogs: []
})

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    getBlogList();
}

const toBlogPage = (id) => {
    router.push({
        path: '/blog/blogpage',
        query: {
            id: id
        }
    })
}

const getBlogList = async () => {
    const responseData = await getAdminBlogList(currentPage.value)
    if (responseData.code === 1) {
        blogList.value = responseData.data;
    }
    else {
        ElMessage.error("获取失败");
    }
}

const checkLogin = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        router.push('/login');
    }
}

onMounted(() => {
    checkLogin();
    getBlogList();
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');

:deep(*) {

    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

    .row {
        width: 100%;
        height: 100%;
    }

    .row__head {
        width: 100%;
    }

    .row__title {
        color: #53646f;
        font-weight: 500;
        font-size: 36px;
        margin: 10px 0px;
    }

    .row--top-20 {
        margin-top: 20px;
    }

    .table {
        width: 100%;
        display: table;
        table-layout: fixed;
    }

    thead {
        display: table;
        width: 100%;
    }

    tbody {
        display: block;
        max-height: calc(100vh - 250px);
        overflow-y: auto;
        width: 100%;
    }

    tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    th,
    td {
        box-sizing: border-box;
    }

    .table__th {
        color: #9eabb4;
        font-weight: 500;
        font-size: 18px;
        text-transform: uppercase;
        text-align: left;
        cursor: pointer;
        border: 0 !important;
        padding: 10px 8px !important;
    }


    .table__th:hover {
        color: #01b9d1;
    }

    .table-row__td {
        vertical-align: middle !important;
        color: #53646f;
        font-size: 13px;
        font-weight: 400;
        position: relative;
        line-height: 18px !important;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
    }


    .table-row__info {
        display: inline-block;
        vertical-align: middle;
    }

    .table-row__id {
        color: #53646f;
        font-size: 16px;
        font-weight: 500;
    }

    .table-row__name {
        color: #53646f;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        margin: 10px 0;
    }

    .table-row__small {
        color: #9eabb4;
        font-weight: 300;
        font-size: 12px;
    }

    .table-row__date {
        color: #53646f;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        margin: 10px 0;
    }


    .table-row__status {
        font-size: 16px;
        vertical-align: middle;
        display: inline-block;
        color: #9eabb4;
        margin: 10px 0;
    }

    .status:before {
        content: '';
        width: 9px;
        height: 9px;
        display: inline-block;
        margin-right: 7px;
        border-radius: 50%;
    }

    .status--red:before {
        background-color: #e36767;
    }

    .status--red {
        color: #e36767;
    }

    .status--yellow:before {
        background-color: #ecce4e;
    }

    .status--yellow {
        color: #ecce4e;
    }

    .status--green {
        color: #6cdb56;
    }

    .status--green:before {
        background-color: #6cdb56;
    }

    .table-row__td:last-child {
        text-align: right;
        padding-right: 30px !important;
    }

    .table-row__edit,
    .table-row__bin,
    .table-row__arrow {
        margin-left: 30px;
    }

    .table-row__edit {
        font-size: 18px;
        padding: 8px;
        display: inline-block;
        border-radius: 18px;
        cursor: pointer;
    }

    .table-row__edit:hover {
        color: #ecce4e;
    }

    .table-row__bin {
        font-size: 18px;
        display: inline-block;
        cursor: pointer;
    }

    .table-row__bin:hover {
        color: #e36767 !important;
    }

    .table-row__arrow {
        font-size: 18px;
        display: inline-block;
        cursor: pointer;
    }

    .table-row__arrow:hover {
        color: #6cdb56 !important;
    }

    .table-row__plus {
        color: #556270;
        font-size: 18px;
        cursor: pointer;
        position: relative;
        z-index: 2;
        float: right;
        margin-right: 20px;
    }

    .table-row__plus:hover {
        color: #01b9d1;
    }

    .pagination {
        position: absolute;
        bottom: 10px;
        right: 20px;
        width: auto;
        display: flex;
        justify-content: flex-end;
        z-index: 4;
        margin-top: 10px;
    }
}

.container {
    display: flex;
    width: 100%;
    height: 93vh;
    margin-top: 7vh;
}

.content {
    width: 85%;
    height: 100%;
    padding: 20px;
    padding-bottom: 60px;
    box-sizing: border-box;
    overflow-y: hidden;
    position: relative;
}

.nav-container {
    width: 15%;
    height: 97%;
    border-right: 1px solid #d4dbe1;
    border-radius: 0 15px 15px 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    padding-top: 20px;
}

.formlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
</style>