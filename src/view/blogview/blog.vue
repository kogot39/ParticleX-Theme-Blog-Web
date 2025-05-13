<script>
import downLoding from '@/components/utils/downLoding.vue';
import { getBlogList } from '@/js/api/blogapi';

export default {
    components: {
        downLoding
    },
    data() {
        return {
            total: 0,
            blogs: [],
            loading: true,
            page: 1
        }
    },
    methods: {
        async getBlogs() {
            const responseData = await getBlogList(this.page);
            if(responseData.code === 1){
                this.blogs = responseData.data.blogs;
                this.total = responseData.data.total;
                this.loading = false;
            }
        },

        changePage(newPage) {
            // 缓慢滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            this.blogs = [];
            this.loading = true;
            this.page = newPage;

            // 延时保证过渡效果
            setTimeout(() => {
                this.getBlogs();
            }, 500);
        }
    },
    mounted() {
        this.getBlogs();
    },
}
</script>

<template>
    <div id="archives">
        <downLoding v-if="loading"></downLoding>
        <div v-for="item in blogs">
            <div class="blog-card-animation timeline">
                <div class="timeline-tail"></div>
                <div class="timeline-content">
                    <div class="item-time">
                        <span class="icon" style="color: #03a9f4;">
                            <i class="fa-solid fa-calendar fa-fw"></i>
                        </span>
                        {{ item.blogDate }}
                    </div>
                    <router-link :to="{ path: '/blog/blogpage', query: { id: item.blogId } }">
                        <h3>{{ item.title }}</h3>
                    </router-link>
                    <div class="content">
                        {{ item.content }}
                    </div>
                    <div class="info">
                        <span class="tags">
                            <span class="icon" style="color: #00bcd4;">
                                <i class="fa-solid fa-tags fa-fw"></i>
                            </span>
                            <span class="tag">
                                {{ item.tags }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination" v-if="!loading">
            <el-pagination background layout="prev, pager, next" :page-size="5" :total="total"
            :current-page="page" @current-change="changePage" class="mt-4" />
        </div>
    </div>
</template>