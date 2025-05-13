<script>
export default {
    props: {
        headings: {
            type: Array,
            default: () => [] 
        },
        activeId: {
            type: String,
            default: ''
        }
    },
    methods: {
        scrollToHeading(id) {
            this.$nextTick(() => {
                const element = document.getElementById(id);
                // 添加元素存在性检查和可见性验证
                if (element && element.offsetParent !== null) {
                    window.scrollTo({
                        top: element.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}
</script>

<template>
    <div class="table-of-contents">
        <div class="toc-title">
            <i class="fa-solid fa-list fa-fw" style="color: #03a9f4;"></i> 目录
        </div>
        <ul class="toc-list">
            <li v-for="heading in headings" :key="heading.id" 
                :class="{ 'active': activeId === heading.id }">
                <a href="javascript:void(0)" @click="scrollToHeading(heading.id)">
                    {{ heading.text }}
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
@keyframes fadeInScale {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
.table-of-contents {
    position: fixed;
    left: 10px;
    top: 20%;
    width: 10%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
    max-height: 70vh;
    overflow-y: auto;
    z-index: 100;
    transition: all 1s ease;
    animation: fadeInScale 1s ease-out forwards;
}

.toc-title {
    font-weight: bold;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    color: #5c6b72;
    font-size: 18px;
}

.toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.toc-list li {
    margin: 8px 0;
    padding: 5px 0;
    transition: all 0.2s ease;
}

.toc-list li a {
    color: #5c6b72;
    text-decoration: none;
    display: block;
    transition: all 0.2s ease;
    font-size: 16px;
}

.toc-list li.active a {
    color: #03a9f4;
    font-weight: bold;
}

.toc-list li:hover a {
    color: #66afef;
    transform: translateX(5px);
}

@media (max-width: 1200px) {
    .table-of-contents {
        position: static;
        width: 100%;
        margin-bottom: 20px;
        max-height: none;
    }
}
</style>