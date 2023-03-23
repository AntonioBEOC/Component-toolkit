class button extends HTMLElement {
    constructor() {
        super();
        console.log('component mounted');

        this.attachShadow({mode: 'open'});
    };

    connectedCallback() {    
        //styles
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'styles.css');
    
        this.shadowRoot.append(style);
        
        //icon 

        const button = document.createElement('button');

        let classes  ='';

        //label or no label-----------------------------------------------------------
        if(this.hasAttribute('label')){
            
            button.textContent = this.getAttribute('label')
            classes = classes + ' label';
        }

        //icon or no icon;
        if (this.hasAttribute('icon')){

            const icon = document.createElement('img');
            icon.setAttribute('src', this.getAttribute('icon'));
            button.appendChild(icon);
        }

        //alternative button
        if(this.hasAttribute('secondary')){
            classes = classes + ' secondary';
        }else if(this.hasAttribute('tertiary')){
            classes = classes + ' tertiary';
        } else {
            classes = classes + ' main';
        }

        //disabled state
        if(this.hasAttribute('disabled')){
            classes = classes + ' disabled';
        }

        button.setAttribute('class', classes)

        button.addEventListener('click', this._press.bind(this));
        this.shadowRoot.appendChild(button);
        this.style.position = 'relative';
    }

    _press() {
        console.log(this);
    }




};

customElements.define('toolkit-button', button);