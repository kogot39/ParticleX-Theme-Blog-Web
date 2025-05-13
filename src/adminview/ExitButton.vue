<template>
    <button class="exit-btn">
        <i class="fa-solid fa-door-open"></i>
    </button>
</template>

<style scoped>
.exit-btn {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: transparent;
    border: none;
    padding: 8px 12px;
    color: #4386cc;
    cursor: pointer;
    transition: all 0.3s ease;
}

.exit-btn:hover {
    background: rgba(67, 134, 204, 0.08);
    transform: scale(1.05);
}

.exit-btn i {
    font-size: 24px;
}
</style>