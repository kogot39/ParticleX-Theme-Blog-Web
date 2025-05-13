<script>
import { useAppStore } from '@/js/stores/app';
import profileCard from './profileCard.vue';
import blogCards from './blogCards.vue';
import backtotop from '@/components/utils/backtotop.vue';
import img from '@/images/background.png';

export default {
    setup() {
        const store = useAppStore();
        return { store };
    },
    components: {
        profileCard,
        blogCards,
        backtotop
    },
    data() {
        return {
            imgUrl: img,
        };
    },
    mounted() {
        let background = this.$refs.homeBackground;
        let images = background.dataset.images.split(",");
        let id = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[id]}')`;
        this.store.setMenuColor(true);
        window.addEventListener("scroll", this.handleScroll, true);
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll, true);
        this.store.setMenuColor(false);
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (newScrollTop <= window.innerHeight - 100) {
                this.store.setMenuColor(true);
            } else {
                this.store.setMenuColor(false);
            }
            if (wrap) {
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.store.setScrollTop(newScrollTop);
            this.showBackTop = newScrollTop > window.innerHeight;
        },

    },
}
</script>

<template>
    <div id="home-head">
        <div id="home-background" ref="homeBackground" :data-images="imgUrl"></div>
        <div id="home-info" @click="homeClick">
            <span class="loop"></span>
            <span class="loop"></span>
            <span class="loop"></span>
            <span class="loop"></span>
            <span class="info">
                <div class="wrap">
                    <h1>
                        Asuka's Blog
                    </h1>
                    <h3>
                        Love the life I live , live the life I love...
                    </h3>
                    <h5>
                        <!-- 描述 -->
                    </h5>
                </div>
            </span>
        </div>
    </div>
    <div id="home-posts-wrap" ref="homePostsWrap">
        <div id="home-posts">
            <!-- 展示博客卡片 -->
            <blogCards></blogCards>
        </div>
        <div id="home-card">
            <!-- 个人信息卡片 -->
            <profileCard></profileCard>
        </div>
    </div>
    <backtotop />
</template>