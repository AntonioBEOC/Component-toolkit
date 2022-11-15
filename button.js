class button extends HTMLElement {
    constructor() {
        super();
        console.log('component mounted');
    };

    connectedCallback() {
        const button = document.createElement('span');
        button.textContent = 'aceptar';
        this.appendChild(button);
    }
};

customElements.define('toolkit-button', button); 