/**
 * 交叉观察器工具类
 * 用于检测元素是否进入视口，实现滚动到视图时的动画效果
 */

export default {
  /**
   * 创建一个交叉观察器实例
   * @param {Function} callback 当元素进入或离开视口时的回调函数
   * @param {Object} options 配置选项
   * @returns {IntersectionObserver} 交叉观察器实例
   */
  createObserver(callback, options = {}) {
    const defaultOptions = {
      root: null, // 默认使用视口作为根元素
      rootMargin: '0px', // 根元素的边距
      threshold: 0.1 // 元素可见10%时触发回调
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    // 创建并返回交叉观察器实例
    return new IntersectionObserver(callback, mergedOptions);
  },
  
  /**
   * 为元素添加交叉观察
   * @param {Element|NodeList|Array} elements 要观察的元素或元素集合
   * @param {IntersectionObserver} observer 交叉观察器实例
   */
  observe(elements, observer) {
    if (!elements) return;
    
    // 处理单个元素
    if (elements instanceof Element) {
      observer.observe(elements);
      return;
    }
    
    // 处理元素集合
    const elementArray = Array.from(elements);
    elementArray.forEach(element => {
      observer.observe(element);
    });
  },
  
  /**
   * 停止观察元素
   * @param {Element|NodeList|Array} elements 要停止观察的元素或元素集合
   * @param {IntersectionObserver} observer 交叉观察器实例
   */
  unobserve(elements, observer) {
    if (!elements) return;
    
    // 处理单个元素
    if (elements instanceof Element) {
      observer.unobserve(elements);
      return;
    }
    
    // 处理元素集合
    const elementArray = Array.from(elements);
    elementArray.forEach(element => {
      observer.unobserve(element);
    });
  },
  
  /**
   * 完全停止观察并断开连接
   * @param {IntersectionObserver} observer 交叉观察器实例
   */
  disconnect(observer) {
    if (observer) {
      observer.disconnect();
    }
  }
};