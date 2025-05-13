<script>
import { useAppStore } from '@/js/stores/app';
import { storeToRefs } from 'pinia';
import BackToTop from '@/components/utils/backtotop.vue'
import TableOfContents from '@/components/utils/tableOfContents.vue'
import githubButton from '@/components/utils/githubButton.vue'
import { getBlogPage } from '@/js/api/blogapi';

// 先导入所有js库，再定义mixins对象
import '@/js/lib/highlight.js';
import '@/js/lib/math.js';
import '@/js/lib/preview.js';

// 确保mixins对象包含preview.js中定义的preview属性
const mixins = window.mixins || {};

export default {
    mixins: Object.values(mixins),
    components: {
        BackToTop,
        TableOfContents,
        githubButton
    },
    setup() {
        const store = useAppStore();
        const { renderers } = storeToRefs(store);
        return {
            renderers,
            store
        };
    },
    data() {
        return {
            headings: [],
            activeId: '',
            blogPage: {
                blogId: 0,
                blogPic: '',
                blogDate: '',
                title: '',
                blogOverview: '',
                tags: '',
                blogStatus: 0,
                content: '',
                githubUrl: '',
                blogText: []
            },
            id: this.$route.query.id,
        }
    },
    mounted() {
        this.getBlogPage();
    },
    unmounted() {
        window.removeEventListener('scroll', this.updateActiveHeading);
        this.headings = []; // 清理目录数据
        this.activeId = '';  // 重置激活状态
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        initTableOfContents() {
            // 初始化目录
            this.headings = [
                { id: 'heading', text: this.blogPage.title },
                { id: 'heading0', text: '概述' },
            ];
            // 在数据加载后再添加其他标题
            if (this.blogPage.blogText && this.blogPage.blogText.length > 0) {
                this.blogPage.blogText.forEach((item, index) => {
                    if (item.subTitle != '') {
                        this.headings.push({
                            id: 'heading' + (index + 1),
                            text: item.subTitle
                        });
                    }
                    if (item.blogContent != '') {
                        // 替换掉换行符
                        item.blogContent = item.blogContent.replace(/\n/g, '<br>');
                        // 替换空格符
                        item.blogContent = item.blogContent.replace(/\s/g, '&nbsp;');
                    }
                });
            }
            // 目录更新后，等待 DOM 渲染完成再更新激活项
            this.$nextTick(() => {
                this.updateActiveHeading();
            });
        },
        async getBlogPage() {
            try {
                const responseData = await getBlogPage(this.id);
                if (responseData.code === 1){
                    Object.assign(this.blogPage, responseData.data);
                    // 添加双重DOM更新保障
                    await this.$nextTick();
                    this.initTableOfContents();
                    await this.$nextTick();
                    this.render();

                    // 确保渲染完成后再绑定事件
                    window.requestAnimationFrame(() => {
                        window.addEventListener('scroll', this.updateActiveHeading);
                    });
                } 
                else {
                    this.headings = []; // 失败时清空目录
                }
            } catch (error) {
                this.headings = []; // 失败时清空目录
            }
        },
        updateActiveHeading() {
            if (!this.$el || !document.body.contains(this.$el)) return; // 增加组件挂载状态检查

            // 获取视口高度
            const viewportHeight = window.innerHeight;
            // 定义标题需要进入视口的区域（视口顶部的20%区域）
            const activeZoneHeight = viewportHeight * 0.4;

            // 查找当前在活跃区域内的标题
            let activeHeading = null;

            // 首先检查是否有标题在活跃区域内
            for (let i = 0; i < this.headings.length; i++) {
                const heading = this.headings[i];
                const element = document.getElementById(heading.id);

                if (element && element.isConnected && element.offsetParent) {
                    const rect = element.getBoundingClientRect();

                    // 检查标题是否在视口顶部的活跃区域内
                    if (rect.top >= 0 && rect.top <= activeZoneHeight) {
                        activeHeading = heading;
                        break; // 找到第一个在活跃区域内的标题就停止
                    }
                }
            }

            // 如果没有找到在活跃区域内的标题，则查找最后一个已经过去的标题
            if (!activeHeading) {
                let lastPassedHeading = null;

                for (let i = 0; i < this.headings.length; i++) {
                    const heading = this.headings[i];
                    const element = document.getElementById(heading.id);

                    if (element && element.isConnected && element.offsetParent) {
                        const rect = element.getBoundingClientRect();

                        // 标题已经过去（顶部在视口上方）
                        if (rect.top < 0) {
                            lastPassedHeading = heading;
                        } else {
                            // 一旦找到一个未过去的标题，就停止查找
                            break;
                        }
                    }
                }

                if (lastPassedHeading) {
                    activeHeading = lastPassedHeading;
                }
            }

            // 如果页面已经滚动到底部，则激活最后一个标题
            if (!activeHeading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                const lastValidHeading = [...this.headings].reverse().find(heading => {
                    const element = document.getElementById(heading.id);
                    return element && element.isConnected && element.offsetParent;
                });

                if (lastValidHeading) {
                    activeHeading = lastValidHeading;
                }
            }

            // 更新活跃标题ID
            this.activeId = activeHeading ? activeHeading.id : '';
        },
    }
}
</script>

<template>
    <div>
        <TableOfContents :headings="headings" :activeId="activeId" />
        <div class="article">
            <div class="cover-image" id="heading">
                <img :src="blogPage.blogPic" alt="封面图片" class="blog-img-animation" />
                <div class="image-overlay">
                    <div class="title-container blog-title-animation">
                        <h1>
                            {{ blogPage.title }}
                        </h1>
                    </div>
                    <div class="info blog-date-animation">
                        <span class="date">
                            <span class="icon" style="color: #03a9f4;">
                                <i class="fa-solid fa-calendar fa-fw"></i>
                            </span>
                            {{ blogPage.blogDate }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="overview blog-overview-animation" id="heading0">
                <h2>概述 <i class="fa-solid fa-pen" style="color: #ffa2c4;"></i></h2>
                <p>
                    <i class="fa-solid fa-quote-left fa-fw" style="color: #03a9f4;font-size: 32px;"></i>
                    {{ blogPage.blogOverview }}
                    <i class="fa-solid fa-quote-right fa-fw" style="color: #03a9f4;font-size: 32px;"></i>
                </p>
            </div>
            <div class="content" v-for="(item, index) in blogPage.blogText" :key="index" :id="'heading' + (index + 1)">
                <h2 v-if="item.subTitle !== ''">
                    {{ item.subTitle }}<i class="fa-solid fa-paragraph fa-fw" style="color: #ff7d73;"></i>
                </h2>
                <p v-if="item.blogContent !== ''" v-html="item.blogContent"></p>
                <img v-if="item.pic !== ''" v-lazy="item.pic" />
                <pre v-if="item.codeText !== ''"
                    :class="item.codeType ? item.codeType : 'cpp'">{{ item.codeText }}</pre>
            </div>

            <BackToTop />
        </div>
        <a v-if="blogPage.githubUrl != ''" :href="blogPage.githubUrl">
            <githubButton />
        </a>
        <transition name="fade">
            <div id="preview" ref="preview" v-show="previewShow">
                <img id="preview-content" ref="previewContent" />
            </div>
        </transition>
        <!-- 公式使用 -->
        <!-- 行内公式：使用`$公式$` 或`\(公式\)`
    行间公式：使用`$$公式$$` 或`\[公式\]` -->
    </div>
</template>
