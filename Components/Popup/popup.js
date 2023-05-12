export class Popup extends HTMLElement {
  constructor() {
    super();
    this.openedPopup = false;
    this.error = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --close-color: #000000;
          --background: transparent;
        }

        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        :host([opened]) {
          pointer-events: all;
        }

        ::slotted(div) {
          padding: 1em;
        }
        
        #popup {
          display: flex;
          width: 100%;
          height: 100%;
        }

        #popup-container {
          background: var(--background);
          box-shadow: 0px 4px 30px rgba(96, 109, 126, 0.1);
          border-radius: 16px;
          width: 90%;
          height: 100%;
          max-height: 80%;
          margin: auto;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: translateY(-30px);
          opacity: 0;
          overflow: hidden;
        }

        #popup.show #popup-overlay {
          opacity: 1;
        }

        #popup.show #popup-container {
          transform: translateY(0);
          opacity: 1;
        }

        #popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #dcd9d980;
          opacity: 0;
          transition: opacity 0.3s;
        }

        #close-popup {
          position: relative;
          cursor: pointer;
        }

        #close-popup svg, #close-popup img {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.3rem;
          fill: var(--close-color);
        }

        img#popup-image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          object-fit: cover;
        }

        @media (orientation: portrait) {
          @media (min-width: 768px) {
            #popup-container {
              width: 70%;
              height: 100%;
              max-height: 60%
            }
          }

          @media (min-width: 992px) {
            #popup-container {
              width: 50%;
            }
          }
        }

        @media (orientation: landscape) {
          @media (min-width: 768px) {
            #popup-container {
              height: 100%;
              max-height: 60%;
              width: 70%;
            }
          }

          @media (min-width: 992px) {
            #popup-container {
              height: 100%;
              max-height: 50%;
              width: 60%;
            }
          }

          @media (min-width: 1400px) {
            #popup-container {
              height: 100%;
              width: 60%;
              font-size: calc(50% + 1rem);
              max-width: 70rem;
            }
          }
        }
      </style>

      <div id="popup"> 
        <div id="popup-overlay"></div>
          <div id="popup-container">
            <img id="popup-image" src="" />
            <div id="close-popup"></div>
            <slot>Popup content</slot>
          </div>
        </div>
      </div>
    `;

    const overlay = this.shadowRoot.querySelector("#popup-overlay");
    const closePopup = this.shadowRoot.querySelector("#close-popup");

    overlay.addEventListener("click", this.close.bind(this));
    closePopup.addEventListener("click", this.close.bind(this));

    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", () => {
      const empty = slot.assignedElements().length === 0;
      if (empty) {
        this.error = true;
        this.errorMessage = "toolkit-popup is empty, expected: HTML element";

        throw new Error(this.errorMessage);
      }
    });
  }

  connectedCallback() {
    if (!this.getAttribute("close-icon")) {
      let closeIcon = this.shadowRoot.querySelector("#close-popup");
      let svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
      `;
      closeIcon.insertAdjacentHTML("afterbegin", svg);
    }
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName == "background") {
      let image = this.shadowRoot.querySelector("img#popup-image");

      if (newValue.substr(0, 1) == "#") {
        let container = this.shadowRoot.querySelector("#popup-container");
        container.style.setProperty("--background", this.getAttribute("background"));
        image.style.display = "none";
      } else {
        image.src = newValue;
        image.style.display = "block";
      }
    }

    if (attributeName == "close-color") {
      if (this.hasAttribute("close-color")) {
        let closeIcon = this.shadowRoot.querySelector("#popup-container");
        closeIcon.style.setProperty("--close-color", this.getAttribute("close-color"));
      }
    }

    if (attributeName == "close-icon") {
      console.log("close-icon");
      let closeIcon = this.shadowRoot.querySelector("#close-popup");
      if (this.hasAttribute("close-icon")) {
        closeIcon.insertAdjacentHTML("afterbegin", `<img id="close-icon" src="${this.getAttribute("close-icon")}" />`);
      }
    }

    if (attributeName == "opened") {
      if (this.hasAttribute("opened")) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  static get observedAttributes() {
    return ["background", "close-color", "close-icon", "opened"];
  }

  open() {
    if (this.error) {
      throw new Error(this.errorMessage);
    }

    if (!this.hasAttribute("opened")) {
      this.openedPopup = true;
      this.setAttribute("opened", "");
      let popup = this.shadowRoot.querySelector("#popup");
      popup.classList.toggle("show");
    }
  }

  close() {
    if (this.error) {
      throw new Error(this.errorMessage);
    }

    if (this.hasAttribute("opened")) {
      this.openedPopup = false;
      this.removeAttribute("opened");
      let popup = this.shadowRoot.querySelector("#popup");
      popup.classList.toggle("show");
    }
  }
}

customElements.define("toolkit-popup", Popup);
