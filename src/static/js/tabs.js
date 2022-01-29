// Tab component
Vue.component("tab", {
    props: ["name", "active", "key"],

    template: `<div class="Tab" :class="active == 'true' && 'Active'"><p>{{ name }}</p></div>`
});

// Tabs Vue instance
const tabs = new Vue({
    el: '.TabView',

    mounted() {
        //this.tabs.push({ id: this.tabs.length, name: "Welcome" });
    },

    methods: {
        createTab(name, callback) {
            this.tabs.push({ id: this.tabs.length, name });

            let oldElement = document.querySelector(`.TabContent[tabid="${this.tabs.length - 1}"]`);

            const id = setInterval(() => {
                if (oldElement !== null) {
                    callback(document.querySelector(`.TabContent[tabid="${this.tabs.length - 1}"]`), this.tabs.length - 1);
                    clearInterval(id);
                }
                else oldElement = document.querySelector(`.TabContent[tabid="${this.tabs.length - 1}"]`);
            }, 0);
        }
    },

    data() {
        return {
            tabs: [],
            activeTab: 0,
            hello: "bruh"
        }
    }
});

// Testing tab
tabs.createTab("Code", (element, id) => {
    const editorContainer = createElementFromHTML(`<div class="Editor" tabid="${id}"></div>`);
    element.appendChild(editorContainer);

    require.config({ paths: { vs: '../../../node_modules/monaco-editor/min/vs' } });

    require(['vs/editor/editor.main'], function () {
        const editor = monaco.editor.create(editorContainer, {
            value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
            language: 'javascript',
            theme: "vs-dark",
            automaticLayout: true,
            fontFamily: "JBMono",
            fontSize: "16",
            renderWhitespace: "none",
            cursorSmoothCaretAnimation: true,
            cursorBlinking: "phase"
        });

        monaco.editor.defineTheme("geckoplusplus", {
            "base": "vs-dark",
            "inherit": true,
            "rules": [],
            "colors": {
                "editor.background": "#181818"
            }
        });

        monaco.editor.setTheme('geckoplusplus');
    });
});