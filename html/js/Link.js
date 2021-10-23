class Link {
    constructor(linkElement) {
        this.elem = linkElement;
        this.elem.addEventListener('click', e => {
            e.preventDefault();
            this.open(this.elem.href);
        });
    }

    open(url) {
        ipcRenderer.send('url:open', url);
    }
}