<script>
export default {
    data() {
        return {
            showBackTop: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.showBackTop = window.scrollY > 100;
        },
        backToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

}
</script>

<template>
    <transition name="fade">
        <div class="back-to-top" v-show="showBackTop" @click="backToTop">
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
            </svg>
        </div>
    </transition>
</template>

<style scoped>
.back-to-top {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(13, 172, 244, 0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
}

.back-to-top:hover {
    background-color: rgba(13, 172, 244, 0.8);
    transform: translateY(-3px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>