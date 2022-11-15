class button extends HTMLElement {
    constructor() {
        super();
        console.log('component mounted');
    };

    connectedCallback() {

        const button = document.createElement('button');

        if(this.hasAttribute('text')){
            button.textContent = this.getAttribute('text')
        }else{
            button.textContent = 'accept'
        }

        button.addEventListener('mouseover', this._highlight.bind(this));
        this.appendChild(button);
    }

    _highlight() {
        console.log('a');
    }
};

customElements.define('toolkit-button', button);