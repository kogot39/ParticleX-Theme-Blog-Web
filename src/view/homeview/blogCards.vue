<script>
import IntersectionObserver from '@/js/utils/intersectionObserver';
import downLoding from '@/components/utils/downLoding.vue';
import { getBlogList } from '@/js/api/blogapi';

export default {
    components: {
        downLoding
    },
    data() {
        return {
            visiblePosts: [],
            observer: null,
            page: 1,
            blogs: [],
            total: 0,
            loading: false,
            noMore: false
        }
    },
    methods: {
        async getBlogs() {
            if (this.loading || this.noMore) return;
            this.loading = true;

            const responseData = await getBlogList(this.page);
            if(responseData.code !== 1) return;
            const newBlogs = responseData.data.blogs;

            if (this.page === 1) {
                // 首次加载
                this.total = responseData.data.total;
                this.blogs = newBlogs;
                this.visiblePosts = Array(this.blogs.length).fill(false);
            } else {
                // 加载更多时延迟1秒
                await new Promise(resolve => setTimeout(resolve, 1000));
                // 追加新内容
                this.blogs = this.blogs.concat(newBlogs);
                // 只为新追加的部分补充visiblePosts
                for (let i = 0; i < newBlogs.length; i++) {
                    this.visiblePosts.push(false);
                }
            }

            // 判断是否还有更多
            if (this.page*5 >= this.total) {
                this.noMore = true;
            }
            this.loading = false;

            // 只观察新追加的post
            this.$nextTick(() => {
                if (!this.observer) {
                    this.initIntersectionObserver();
                } else {
                    // 只观察新追加的元素
                    const posts = document.querySelectorAll('.post');
                    for (let i = posts.length - newBlogs.length; i < posts.length; i++) {
                        IntersectionObserver.observe(posts[i], this.observer);
                    }
                }
            });
        },

        initIntersectionObserver() {
            if (this.observer) {
                IntersectionObserver.disconnect(this.observer);
            }
            this.observer = IntersectionObserver.createObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        if (!isNaN(index) && index >= 0 && index < this.visiblePosts.length) {
                            this.$nextTick(() => {
                                this.visiblePosts[index] = true;
                            });
                        }
                    }
                });
            }, { threshold: 0.3 });
            // 首次加载时观察所有
            const posts = document.querySelectorAll('.post');
            IntersectionObserver.observe(posts, this.observer);
        },

        handleScroll() {
            if (this.loading || this.noMore) return;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight >= docHeight - 10) {
                // 到底部，加载更多
                this.page++;
                this.getBlogs();
            }
        }
    },

    mounted() {
        this.getBlogs();
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        if (this.observer) {
            IntersectionObserver.disconnect(this.observer);
        }
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<template>
    <div>
        <div class="post" v-for="(item, index) in blogs"
            :class="{ 'fade-in-card': true, 'visible': visiblePosts[index] }" :data-index="index">
            <h2 class="post-title">{{ item.title }}</h2>
            <div class="category-and-date">
                <span class="date">
                    <span class="icon" style="color: #03a9f4;">
                        <i class="fa-solid fa-calendar fa-fw"></i>
                    </span>
                    {{ item.blogDate }}
                </span>
            </div>
            <div class="description">
                <div class="content">
                    {{ item.content }}
                </div>
            </div>
            <div class="post-tags">
                <span class="icon" style="color: #00bcd4;">
                    <i class="fa-solid fa-tags fa-fw"></i>
                </span>
                <span class="tag">
                    <span>{{ item.tags }}</span>
                </span>
            </div>
            <router-link class="go-post" :to="{ path: '/blog/blogpage', query: { id: item.blogId } }">
                阅读全文
            </router-link>
        </div>
        <div v-if="loading" class="loading-tip"><downLoding /></div>
        <div v-if="noMore" class="no-more-tip">---No More---</div>
    </div>
</template>