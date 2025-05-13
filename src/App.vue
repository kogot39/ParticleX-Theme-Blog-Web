<script>
import { RouterView } from 'vue-router';
import Menu from './components/menu/menu.vue';
import Footer from './components/footer/footer.vue';
import { useAppStore } from './js/stores/app';
import { storeToRefs } from 'pinia';

export default {
    components: {
        RouterView,
        Menu,
        Footer,
    },
    mixins: Object.values(mixins),
    setup() {
        const store = useAppStore();
        const { loading, hiddenMenu, showMenuItems, menuColor, scrollTop, renderers } = storeToRefs(store);
        return {
            loading,
            hiddenMenu,
            showMenuItems,
            menuColor,
            scrollTop,
            renderers,
            store
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.store.setLoading(false);
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.store.setHiddenMenu(true);
                this.store.setShowMenuItems(false);
            } else this.store.setHiddenMenu(false);
            this.store.setScrollTop(newScrollTop);
        },
    },
};
</script>

<template>
    <transition name="fade">
        <div id="loading" v-show="loading">
            <div id="loading-circle">
                <h2>LOADING . . .</h2>
                <img src="./images/loading.gif" />
            </div>
        </div>
    </transition>
    <Menu />
    <div id="main" :class="loading ? 'into-enter-from' : 'into-enter-active'">
        <!-- 在此处插入页面内容 -->
        <RouterView />
        <!-- 在此处插入页脚内容 -->
        <Footer />
    </div>
    <!-- 预览功能，根据需要启用 需要修改-->
    <!-- <transition name="fade">
        <div id="preview" ref="preview" v-show="previewShow">
            <img id="preview-content" ref="previewContent" />
        </div>
    </transition> -->
</template>
