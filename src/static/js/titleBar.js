window.menu.setMenu([
    {
        label: "File",
        role: "filemenu",
        submenu: [
            { label: "New" },
            { label: "Open" },
            { label: "Save" },
            { label: "Save As" },
            { type: "separator" },
            {
                label: "Toggle Developer Tools",
                click: () => window.actions.devTools(),
                accelerator: (window.menu.platform == "darwin") ? "Alt+Cmd+J" : "Ctrl+Shift+I"
            },
            { type: "separator" },
            {
                label: "Reload",
                click: () => window.location.reload(),
                accelerator: (window.menu.platform == "darwin") ? "Cmd+R" : "Ctrl+R"
            },
            { label: "Exit", click: () => window.actions.close() }
        ]
    }
]);

const titleBar = new Vue({
    el: '.TitleBar',

    mounted() {
        let oldTitle = document.title;

        setInterval(() => {
            if (oldTitle !== document.title) {
                this.title = document.title;
                oldTitle = document.title;
            }
        }, 0);
    },

    data() {
        return {
            title: document.title,
            menu: window.menu.getMenu()
        }
    },

    methods: {
        close() {
            window.actions.close();
        },

        maximize() {
            window.actions.maximize();
        },

        minimize() {
            window.actions.minimize();
        }
    }
});