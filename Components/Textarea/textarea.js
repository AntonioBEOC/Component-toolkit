export class Textarea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._textarea;
        this._label;
        this._helperText;
        this._textareaRows = 2;
        this._textareaCols = 20;
        this._textareaLabel = '';
        this._textareaHelperText = '';
        this.isDisabled = false;
        this.shadowRoot.innerHTML = `
        <style>
            :root {
                --toolkit-bg-color: '#ffffff';
                --toolkit-primary-color: linear-gradient(90deg, #30CFD0, #330867);
                --toolkit-black-color: '#000000'
            }
            * {
                box-sizing: border-box;
            }
            :host {
                display: inline-block;
            }
            :host([label]) .toolkit-textarea-container label, :host([label]) .toolkit-textarea-container label:after {
                opacity: 1;
            }
            .toolkit-textarea-container {
                position: relative;
                margin-bottom: 1rem;
            }
            .toolkit-textarea-container:before {
                content: '';
                position: absolute;
                top: 4px;
                width: 90%;
                display: block;
                height: 0.5rem;
                background-color: #ffffff;
                align-self: center;
                left: 1rem;
            }
            .toolkit-textarea-container label {
                font-family: monospace;
            }
            .toolkit-textarea-container label.toolkit-textarea-label {
                background-color: transparent;
                font-size: 14px;
                font-weight: 300;
                line-height: 11px;
                left: 1rem;
                margin-bottom: 0.5rem;
                opacity: 0;
                position: absolute;
                top: -0.5rem;
                z-index: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 4px;
                gap: 8px;
            }
            .toolkit-textarea-container label.toolkit-textarea-helpertext {
                background-color: transparent;
                font-size: 14px;
                font-weight: 300;
                line-height: 11px;
                left: 1rem;
                bottom: -1rem;
                z-index: 1;
                padding: 4px;
                position: absolute;
            }
            .toolkit-textarea-container label.toolkit-textarea-label:after {
                content: " ";
                background-color: #fff;
                width: 100%;
                height: 13px;
                position: absolute;
                left: 0;
                bottom: 1px;
                z-index: -1;
                opacity: 0;
            }
            textarea {
                border-radius: 16px;
                border-color: transparent;
                border-style: solid;
                border-width: 4px;
                box-shadow: none;
                font-size: 16px;
                font-weight: 400;
                line-height: 18px;
                padding: 16px;
                box-shadow: 0 0 0 1px #000;
                resize: none;
            }
            textarea:focus {
                background: linear-gradient(white, white) padding-box, linear-gradient(90deg, #30CFD0, #330867) border-box;
                border-color: transparent;
                border-style: solid;
                border-width: 4px;
                box-shadow: none;
                outline: 0;
            }
            /* Works on Firefox */
            textarea {
                scrollbar-width: thin;
                scrollbar-color: #DCDCDC transparent;
            }
            /* Works on Chrome, Edge, and Safari */
            textarea::-webkit-scrollbar {
                width: 3px;
            }
            textarea::-webkit-scrollbar-track {
                background: transparent;
                margin: 10px 0;
            }
            textarea::-webkit-scrollbar-thumb {
                background-color: #DCDCDC;
                border-radius: 20px;
            }
        </style>
        <div class='toolkit-textarea-container'>
            <label class='toolkit-textarea-label'></label>
            <textarea></textarea>
            <label class='toolkit-textarea-helpertext'></label>
        </div>
        <slot></slot>
    `;
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        }

        if (name === 'disabled') {
            this.isDisabled = this.hasAttribute('disabled');
            this.isDisabled ? this.disable() : this.enable();
        }

        if (name === 'label') {
            this._setLabel(this.getAttribute('label'));
        }

        if (name === 'helpertext') {
            this._setLabel(this.getAttribute('helpertextbel'));
        }
    }

    connectedCallback() {
        this._textarea = this.shadowRoot.querySelector('textarea');
        this._label = this.shadowRoot.querySelector('.toolkit-textarea-label');
        this._helperText = this.shadowRoot.querySelector('.toolkit-textarea-helpertext');
        
        if (this.hasAttribute('rows')) {
            this._setRows(this.getAttribute('rows'));
        }

        if (this.hasAttribute('cols')) {
            this._setCols(this.getAttribute('cols'));
        }

        if (this.hasAttribute('label')) {
            this._setLabel(this.getAttribute('label'));
        }

        if (this.hasAttribute('helpertext')) {
            this._setHelperText(this.getAttribute('helpertext'));
        }
    }
    
    enable() {
        this.removeAttribute('disabled');
        this._textarea.removeAttribute('disabled');
    }

    disable() {
        this.setAttribute('disabled', '');
        this._textarea.setAttribute('disabled', '');
    }

    getText() {
        return this._textarea.value;
    }

    setText(value) {
        this._textarea.value = value;
    }

    _setRows(rows) {
        this.setAttribute('rows', `${rows}`);
        this._textareaRows = rows;
        this._textarea.rows = rows;
    }

    _setCols(cols) {
        this.setAttribute('cols', `${cols}`);
        this._textareaCols = cols;
        this._textarea.cols = cols;
    }

    _setLabel(value) {
        this.setAttribute('label', `${value}`);
        this._textareaLabel = value;
        this._label.innerHTML = value;
    }

    _setHelperText(value) {
        this.setAttribute('helpertext', `${value}`);
        this._textareaHelperText = value;
        this._helperText.innerHTML = value;
    }
}

customElements.define('toolkit-textarea', Textarea);