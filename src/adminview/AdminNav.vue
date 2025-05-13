<template>
    <div class="aside_nav">
        <nav>
            <ul>
                <li>
                    <router-link to="/admin/statistics">
                        <p class="nav-li" id="adminStatistics">
                            <i class="fa-solid fa-chart-simple icon"> </i>数据统计
                        </p>
                    </router-link>
                </li>
            </ul>
        </nav>
        <ExitButton class="ExitButton" @click="exitAdmin" />
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useRoute,useRouter } from 'vue-router';
import { onMounted } from 'vue';
import ExitButton from './ExitButton.vue'


const router = useRouter();
const route = useRoute();

onMounted(() => {
    const el = document.querySelector(`#${route.name}`);
    if (el) {
        el.classList.add('is-active');
    }
})

const exitAdmin = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');

.aside_nav {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

nav {
    padding: 20px 0;
    box-sizing: border-box;
}

nav ul {
    padding-inline-start: 0;
    list-style-type: none;
    margin: 0;
}

nav ul li {
    border-bottom: 1px solid rgb(230, 230, 230);
    transition: background-color 0.3s;
}

nav ul li:hover {
    background-color: rgba(67, 134, 204, 0.08);
}

.icon {
    margin-right: 15px;
    font-size: 20px;
    color: #4386cc;
}

.nav-li {
    padding: 12px 20px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    letter-spacing: 0.3em;
    display: flex;
    align-items: center;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    color: #5a6978;
}

.nav-li:hover {
    color: #4386cc;
}

.is-active {
    color: #4386cc;
    background-color: rgba(67, 134, 204, 0.08);
}

.ExitButton {
    margin: 15px;
    display: flex;
    justify-content: center;
}
</style>