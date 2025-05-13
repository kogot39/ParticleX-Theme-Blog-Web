/**
 * 图片懒加载指令
 * 使用方法：v-lazy="图片路径"
 */

import IntersectionObserver from './intersectionObserver';

export default {
  install(app) {
    // 创建一个交叉观察器实例
    const observer = IntersectionObserver.createObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgElement = entry.target;
          const imgSrc = imgElement.dataset.src;
          
          // 设置图片src属性，触发图片加载
          if (imgSrc) {
            // 创建一个新的图片对象来预加载
            const img = new Image();
            img.onload = () => {
              imgElement.src = imgSrc;
              imgElement.classList.add('lazy-loaded');
            };
            img.onerror = () => {
              console.error('图片加载失败:', imgSrc);
            };
            img.src = imgSrc;
            
            // 图片加载后，停止观察该元素
            observer.unobserve(imgElement);
            
            // 移除data-src属性
            delete imgElement.dataset.src;
          }
        }
      });
    }, {
      threshold: 0.1 // 只要有10%的元素可见就触发
    });

    // 注册全局指令
    app.directive('lazy', {
      mounted(el, binding) {
        // 将真实的图片路径存储在data-src属性中
        el.dataset.src = binding.value;
        
        // 设置默认的占位图或模糊效果
        el.classList.add('lazy-image');
        
        // 开始观察元素
        observer.observe(el);
      },
      updated(el, binding) {
        // 如果指令的值发生变化，更新data-src
        if (binding.value !== binding.oldValue) {
          el.dataset.src = binding.value;
          
          // 如果元素已经加载过图片，则重新观察
          if (el.classList.contains('lazy-loaded')) {
            el.classList.remove('lazy-loaded');
            observer.observe(el);
          }
        }
      },
      unmounted(el) {
        // 组件卸载时，停止观察元素
        observer.unobserve(el);
      }
    });
  }
};