// 确保全局mixins对象存在
window.mixins = window.mixins || {};

// 将preview添加到全局mixins对象
window.mixins.preview = {
    data() {
        return { previewShow: false };
    },
    created() {
        this.renderers.push(this.preview);
    },
    methods: {
        preview() {
            let preview = this.$refs.preview,
                content = this.$refs.previewContent;
            
            // 确保DOM元素存在后再添加事件监听器
            if (preview && content) {
                let images = document.querySelectorAll("img");
                for (let i of images)
                    i.addEventListener("click", () => {
                        content.alt = i.alt;
                        content.src = i.src;
                        this.previewShow = true;
                    });
                
                preview.addEventListener("click", () => {
                    this.previewShow = false;
                });
                
                window.addEventListener("resize", () => {
                    this.previewShow = false;
                });
            }
        },
    },
};
