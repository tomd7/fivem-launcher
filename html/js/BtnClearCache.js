const { ipcRenderer } = require('electron');

class BtnClearCache {
    constructor(buttonElement) {
        this.elem = buttonElement;
        this.panel = undefined;
        this.isPanelOpened = false;

        this.elem.addEventListener('click', e => {
            e.preventDefault();
            if (!this.isPanelOpened) {
                const panel = this.renderConfirmPanel();
                document.body.append(panel);
                this.isPanelOpened = true;
            }
        });

        ipcRenderer.on('cache:clear', message => {
            this.panel.remove();
            this.isPanelOpened = false;
        });
    }

    clearCache() {
        ipcRenderer.send('cache:clear');
    }

    renderConfirmPanel() {
        // Create panel element
        this.panel = document.createElement('div');
        this.panel.className = 'confirm-panel';

        const message = document.createElement('p');
        message.classList = "message";
        message.innerText = 'Voulez-vous vraiment vider le cache de FiveM ?';

        // Create buttons container
        const btnGroup = document.createElement('div');
        btnGroup.className = "btn-group";

        // Create button "Confirm"
        const btnConfirm = document.createElement('button');
        btnConfirm.className = 'btn btn-confirm';
        btnConfirm.innerText = 'Confirmer';

        // Create loader
        const loader = document.createElement('div');
        loader.className = 'loader';

        // Create button "Deny"
        const btnDeny = document.createElement('button');
        btnDeny.className = 'btn btn-deny';
        btnDeny.innerText = 'Annuler';

        // Add elements to the panel
        this.panel.append(message);
        btnConfirm.append(loader);
        btnGroup.append(btnConfirm);
        btnGroup.append(btnDeny);
        this.panel.append(btnGroup);

        // Add event listeners on buttons
        btnConfirm.addEventListener('click', e => {
            this.clearCache();
            btnConfirm.classList.add('loading');
        });
        btnDeny.addEventListener('click', e => {
            this.panel.remove();
            this.isPanelOpened = false;
        });

        return this.panel;
    }
}
