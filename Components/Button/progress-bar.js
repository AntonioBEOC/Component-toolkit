class ProgressBar extends HTMLElement {
    constructor() {
      super();
  
      // Get the value of the steps attribute.
      this.steps = this.getAttribute("steps")
        ? this.getAttribute("steps").split(",")
        : console.error("Must define the steps attribute.");
      this._progress = 0;
      this._stepSize = 100 / this.steps.length;
  
      // Create a template for the numerated circles
      let circles = "";
      for (let i = 1; i <= this.steps.length; i++) {
        circles += `<div class="progress-step"><div class="progress-bar-circle inactive">${i}</div><p class="step-label inactive">${
          this.steps[i - 1]
        }</p></div>`;
      }
  
      // HTML template for the style and main elements.
      const template = document.createElement("template");
      template.innerHTML = `
        <style>
          .progress-bar {
            width: 0%;
            height: 4px;
            overflow: hidden;
            background: linear-gradient(to left, #30CFD0, #330867);
          }
  
          .progress-step {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;
            font-family: 'Roboto Mono', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 14px;
          }
  
          .progress-bar-circle {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
            color: #000;
            font-family: 'Roboto Mono', sans-serif;
            font-weight: 700;
            font-size: 18px;
            line-height: 14px;
            border-radius: 50%;
            margin-right: 10px;
            font-family: sans-serif;
            background: linear-gradient(white, white) padding-box,
            linear-gradient(to right, #30CFD0, #330867) border-box
          }
  
          .progress-bar-circle.active {
            background: linear-gradient(90deg, #30CFD0 0%, #330867 100%);
            color: #fff;
            border:none;
          }
  
          .progress-bar-circle.inactive {
            background: #DCDCDC;
            color: #FFFFFF;
          }
          .step-label.inactive {
            color: #DCDCDC;
          }
  
          .progress-bar-circles {
            display:flex;
            justify-content: space-between;
          }
        </style>
        <div class="progress-bar-circles">
        ${circles}
        </div>
        <div class="progress-bar">
        </div>
      `;
  
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._fill = this._shadowRoot.querySelector(".progress-bar");
      this._circles = this._shadowRoot.querySelectorAll(".progress-bar-circle");
      this._label = this._shadowRoot.querySelectorAll(".step-label");
      this._setProgressLabel();
    }
  
    addProgress() {
      //set the progress of the bar
      const newProgress = this._progress + this._stepSize;
      this._progress = newProgress > 100 ? 100: newProgress;
      this._setProgressBar(this._progress);
    }
  
    decreaseProgress() {
      //Deacrese the progress of the bar
      const newProgress = this._progress - this._stepSize;
      this._progress = newProgress < 0 ? 0: newProgress;
      this._setProgressBar(this._progress);
    }
    
    _setProgressBar(valueProgress) {
      if (valueProgress > 0) {
        console.log("the progress decreased", valueProgress);
        this._fill.style.width = valueProgress + "%";
      } else {
        console.log("Progress reached zero percent");
      }
      this._setProgressLabel();
    }
  
    _setProgressLabel() {
      // change the_ circles style to active or done;
      const activeCircles =
        Math.floor((this._circles.length -1) * this._progress / 100);
      this._circles.forEach((circle, index) => {
        if (index === activeCircles) {
          circle.classList.remove("inactive");
          this._label[index].classList.remove("inactive");
        } else if (index < activeCircles) {
          circle.classList.add("active");
          circle.innerHTML = "✔";
        } else if (index >= activeCircles) {
          circle.classList.remove("active");
          circle.classList.add("inactive");
        }
      });
    }
  }
  
  customElements.define("progress-bar", ProgressBar);
  