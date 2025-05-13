<script>
import IntersectionObserver from '@/js/utils/intersectionObserver';
import img from '@/images/avatar.jpg';

export default {
    data() {
        return {
            isVisible: false,
            observer: null,
            imgUrl: img
        }
    },
    mounted() {
        // 创建交叉观察器
        this.observer = IntersectionObserver.createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                }
            });
        }, { threshold: 0.1 });

        // 在下一个渲染周期中观察卡片
        this.$nextTick(() => {
            if (this.$refs.cardStyle) {
                IntersectionObserver.observe(this.$refs.cardStyle, this.observer);
            }
        });
    },
    beforeUnmount() {
        // 组件卸载前断开观察器
        if (this.observer) {
            IntersectionObserver.disconnect(this.observer);
        }
    }
}
</script>
<template>
    <div id="card-style" :class="{'fade-in-scale': true, 'visible': isVisible}" ref="cardStyle">
    <div id="card-div">
        <div class="avatar" :class="{'fade-in-scale': true, 'visible': isVisible, 'delay-100': true}">
            <img :src="imgUrl" alt="avatar" />
        </div>
        <div class="name" :class="{'fade-in-up': true, 'visible': isVisible, 'delay-200': true}">Asuka</div>
        <div class="description" :class="{'fade-in-up': true, 'visible': isVisible, 'delay-300': true}">
            Show some projects <br> Record some interesting things
        </div>
        <div class="icon-links" :class="{'fade-in-up': true, 'visible': isVisible, 'delay-400': true}">
            <span class="icon-link">
                <a href="https://space.bilibili.com/146781932?spm_id_from=333.1007.0.0">
                    <i
                        class="fa-brands fa-bilibili fa-fw"
                    ></i>
                </a>
            </span>
            <span class="icon-link">
                <a href="https://github.com/kogot39">
                    <i
                        class="fa-brands fa-github fa-fw"
                    ></i>
                </a>
            </span>
        </div>
        <!-- 添加友链 -->
        <!-- <div class="friend-links">
            <div class="friend-link">
                <a href="<%- url_for(value) %>"><%= key %></a>
            </div>
        </div> -->
    </div>
</div>
</template>

