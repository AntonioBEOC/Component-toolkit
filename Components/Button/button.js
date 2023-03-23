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

        // const style = document.createElement('style');
        // style.innerHTML = ``

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

        //alternative button states
        if(this.hasAttribute('state')){
            classes = classes + `${' ' + this.getAttribute('state')}`;
        }else{
            classes = classes + ' primary';
        }

        //disabled state
        if(this.hasAttribute('disabled')){
            if(this.getAttribute('disabled') == 'true'){
                classes = classes + ' disabled';
            }
        }

        button.setAttribute('class', classes)

        console.log(classes);

        button.addEventListener('click', this._press.bind(this));
        this.shadowRoot.appendChild(button);
        this.style.position = 'relative';
    }

    _press() {
        console.log(this)
    }




};

customElements.define('toolkit-button', button);