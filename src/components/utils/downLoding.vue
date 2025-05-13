<template>
  <div class="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped lang="scss">
@use "sass:math";
@use "sass:list";
$animationDuration: 3s;
$amount: 6;
$particleRadius: 3vmin;

.background span {
  width: $particleRadius * 2;
  height: $particleRadius * 2;
  border-radius: $particleRadius;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-timing-function: cubic-bezier(0.4, 0, 1, 0.8);
  animation-iteration-count: infinite;
  animation-duration: $animationDuration;
  top: calc(50% - #{$particleRadius});
  left: 50%;
  transform-origin: ($particleRadius*-1) center;
  margin-top: 50px;

  $colors: (
    #7dd3fc,  // 中蓝色
    #e0f2fe,  // 浅蓝色
    #0284c7,  // 深蓝色
  );

@for $i from 1 through $amount {
  &:nth-child(#{$i}) {
    background: list.nth($colors, math.random(list.length($colors)));
    animation-delay: math.div($i , $amount) * $animationDuration * -1;
    opacity: 0;
  }
}
}

@keyframes move {
  0% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 1px);
  }

  30% {
    opacity: 1;
  }

  100% {
    z-index: 10;
    transform: scale(0) rotate(360deg) translate3d(0, 0, 1px);
  }
}
</style>