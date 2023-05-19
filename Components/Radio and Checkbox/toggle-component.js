import renderHTML from './toggle-component-html.js';
import renderCSS from './toggle-component-css.js';

class toggleComponent extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._toggleType;
        this._state;
        this._status = false;
    }

    connectedCallback(){
        if(this.hasAttribute('type')) this._toggleType = this.getAttribute('type');
        if(this.hasAttribute('status')) {
            this._status = this.getAttribute('status');
        }
        this._renderHTML();
        const spanElement = this.shadowRoot.querySelector('#main-container');
        spanElement.addEventListener('click',this._changeValue.bind(this));
    }


    //GETTERS N' SETTERS 
    get _getValue(){
        return {value : this._status};
    }

    set _setValue(newValue){
        this._status = newValue;
    }
    _renderHTML(){
        this.shadowRoot.append(renderHTML({type : this._toggleType, status : this._status}));
        this.shadowRoot.append(renderCSS());
    }

    _changeValue(event){
        this._status = !this._status;
        if(this._status){
            if(this._toggleType == 'checkbox'){
                this.shadowRoot.querySelector('#unchecked').classList.add('hide');
                this.shadowRoot.querySelector('#checked').classList.remove('hide');
            }else this.shadowRoot.querySelector('#checked').classList.remove('hide');
        }else{
            if(this._toggleType == 'checkbox'){
                this.shadowRoot.querySelector('#checked').classList.add('hide');
                this.shadowRoot.querySelector('#unchecked').classList.remove('hide');
            }else this.shadowRoot.querySelector('#checked').classList.add('hide');
            
        }  
    }
}

customElements.define('toggle-component',toggleComponent);