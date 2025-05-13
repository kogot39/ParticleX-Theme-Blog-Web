<script setup>
import { RouterLink } from 'vue-router';
import { useAppStore } from '@/js/stores/app';
import { storeToRefs } from 'pinia';

const store = useAppStore();
const { hiddenMenu, menuColor, showMenuItems } = storeToRefs(store);

const toggleMenu = () => {
    store.setShowMenuItems(!showMenuItems.value);
};
</script>

<template>
    <div id="menu" :class="{ hidden: hiddenMenu, 'menu-color': menuColor }">
        <nav id="desktop-menu">
            <RouterLink to="/" class="title">
                <span>Asuka's blog</span>
            </RouterLink>
            <!-- 在此处添加菜单项，每个菜单项格式如下：
        <RouterLink to=="链接地址">
            <i class="fa-{主题} fa-{图标名称} fa-fw"></i>
            <span>&ensp;菜单文本</span>
        </RouterLink>
        -->
            <RouterLink to="/home">
                <i class="fa-solid fa-house fa-fw"></i>
                <span>&emsp;Home</span>
            </RouterLink>

            <RouterLink to="/blog">
                <i class="fa-solid fa-blog fa-fw"></i>
                <span>&emsp;Blog</span>
            </RouterLink>

            <RouterLink to="/tool">
                <i class="fa-solid fa-toolbox fa-fw"></i>
                <span>&emsp;Tool</span>
            </RouterLink>

        </nav>
        <nav id="mobile-menu">
            <div class="title" @click="toggleMenu">
                <i class="fa-solid fa-bars fa-fw"></i>
                <span>&emsp;Asuka's blog</span>
            </div>
            <transition name="slide">
                <div class="items" v-show="showMenuItems">
                    <!-- 在此处添加移动端菜单项，每个菜单项格式如下：
                <RouterLink to="链接地址">
                    <div class="item">
                        <div style="min-width: 20px; max-width: 50px; width: 10%">
                            <i class="fa-{主题} fa-{图标名称} fa-fw"></i>
                        </div>
                        <div style="min-width: 100px; max-width: 150%; width: 20%">菜单文本</div>
                    </div>
                </RouterLink>
                -->
                    <RouterLink to="/home">
                        <div class="item">
                            <div style="min-width: 20px; max-width: 50px; width: 10%">
                                <i class="fa-solid fa-house fa-fw"></i>
                            </div>
                            <div style="min-width: 100px; max-width: 150%; width: 20%">Home</div>
                        </div>
                    </RouterLink>

                    <RouterLink to="/blog">
                        <div class="item">
                            <div style="min-width: 20px; max-width: 50px; width: 10%">
                                <i class="fa-solid fa-blog fa-fw"></i>
                            </div>
                            <div style="min-width: 100px; max-width: 150%; width: 20%">Blog</div>
                        </div>
                    </RouterLink>
                    
                    <RouterLink to="/tool">
                        <div class="item">
                            <div style="min-width: 20px; max-width: 50px; width: 10%">
                                <i class="fa-solid fa-toolbox fa-fw"></i>
                             </div>
                            <div style="min-width: 100px; max-width: 150%; width: 20%">Tool</div>
                        </div>
                    </RouterLink>
                </div>
            </transition>
        </nav>
    </div>
    <transition name="fade">
        <div id="menu-curtain" @click="toggleMenu" v-show="showMenuItems"></div>
    </transition>
</template>