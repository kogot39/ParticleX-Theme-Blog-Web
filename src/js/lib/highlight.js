mixins.highlight = {
    data() {
        return { copying: false };
    },
    created() {
        hljs.configure({ ignoreUnescapedHTML: true });
        this.renderers.push(this.highlight);
    },
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        highlight() {
            let codes = document.querySelectorAll("pre");
            for (let i of codes) {
                let code = i.textContent;
                let firstChildClasses = [];
                if (i.firstChild && i.firstChild.classList) {
                    try {
                        firstChildClasses = [...i.firstChild.classList];
                    } catch (e) {
                        // classList可能不是可迭代对象
                        console.warn('classList is not iterable', e);
                    }
                }
                let language = [...i.classList, ...firstChildClasses][0] || "plaintext";
                let highlighted;
                try {
                    highlighted = hljs.highlight(code, { language }).value;
                } catch {
                    highlighted = code;
                }
                i.innerHTML = `
                <div class="code-content hljs">${highlighted}</div>
                <div class="language">${language}</div>
                <div class="copycode">
                    <i class="fa-solid fa-copy fa-fw"></i>
                    <i class="fa-solid fa-check fa-fw"></i>
                </div>
                `;
                let content = i.querySelector(".code-content");
                hljs.lineNumbersBlock(content, { singleLine: true });
                let copycode = i.querySelector(".copycode");
                copycode.addEventListener("click", async () => {
                    if (this.copying) return;
                    this.copying = true;
                    copycode.classList.add("copied");
                    await navigator.clipboard.writeText(code);
                    await this.sleep(1000);
                    copycode.classList.remove("copied");
                    this.copying = false;
                });
            }
        },
    },
};
