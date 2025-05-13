<template>
    <div class="social-button-container">
        <div class="social-button social-button--github">
            <i class="fa-brands fa-github"></i>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@use "sass:math";

$social-button-size: 42px;
$social-button-icon-size: 0.4;
$social-button-background: rgba(13,172,244,0.6);
$social-button-active-color: rgba(13,172,244,1);
$social-button-transition-time: 0.3s;

$social-button-colors: (
    'github': #FFF
);

@keyframes slideFromTop {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.social-button-container {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 40px;
    height: 100px;
    animation: slideFromTop 0.8s ease-out forwards;
}

.social-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: $social-button-size;
    height: $social-button-size;
    text-decoration: none;
    border-radius: 50%;
    background: $social-button-background;
    text-align: center;

    &::after {
        content: '';
        position: absolute;
        top: -1px;
        left: 50%;
        display: block;
        width: 0;
        height: 0;
        border-radius: 100%;
        transition: $social-button-transition-time;
    }

    &:focus,
    &:hover {
        color: $social-button-active-color;

        &::after {
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            margin-left: calc(-50% - 1px);
        }
    }

    i,
    svg {
        position: relative;
        z-index: 1;
        transition: $social-button-transition-time;
    }

    i {
        font-size: $social-button-size * $social-button-icon-size;
    }

    svg {
        height: math.percentage($social-button-icon-size);
        width: math.percentage($social-button-icon-size);
    }

    @each $name, $color in $social-button-colors {
        &--#{$name} {
            color: $color;

            &::after {
                background: $color;
            }
        }
    }
}
</style>