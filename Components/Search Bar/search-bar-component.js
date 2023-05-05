import renderHTML from './search-bar-component-html.js';
import renderCSS from './search-bar-component-css.js';
class SearchBar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._object;
        this._data;
        this._searchParameter;
        this._filterFunction;
    }
    connectedCallback(){
        if(this.hasAttribute("name")) this._object = this.getAttribute("name");
        this.shadowRoot.append(renderHTML({component : this._object}));
        this.shadowRoot.append(renderCSS());  
        const inputElement = this.shadowRoot.querySelector('#searchElement');
        const loopElement = this.shadowRoot.querySelector('#loop');
        inputElement.addEventListener('input',this._searchItem.bind(this));
        inputElement.addEventListener('keypress',this._fireEvent.bind(this));
        loopElement.addEventListener('click',this._fireEvent.bind(this));
    }

    _searchItem(event){
        this._searchParameter = this.shadowRoot.querySelector('#searchElement').value;
    }

    _fireEvent(event){
        if(event.key == "Enter" || event.type == "click"){
            console.log(this._searchParameter);
            this.shadowRoot.querySelector('#searchElement').classList.remove('active');
            const toSearch = new Event('toSearch',{bubbles:true,composed:true});
            toSearch.Search = this._searchParameter != '' ? this._filterFunction(this._data,this._searchParameter) : {};
            this.dispatchEvent(toSearch);
        }
    }
}

customElements.define('search-bar-component',SearchBar);