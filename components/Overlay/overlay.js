let Overlay = null;
(function () {
    let comptemplate = document.createElement("template");
    comptemplate.innerHTML = `            
    <style>
        .overlay-template-container {
            position: relative;
            height: 100%;
            width: 100%;
            background-color: rgba(0,0,0,0.5);
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .overlay-content-wrapper {
            position: relative;
            display:inline-block;
        }
        .close {
            position: absolute;
            top: 25px;
            right: 25px;
            border: 1px grey solid;
            border-radius: 15px;
            height: 25px;
            width: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            cursor: pointer;
        }
        .close_icon {
            height: 15px;
            width: 15px;
        }
        .overlay-content {
            height: 70%;
            overflow: scroll;
            padding: 15px;
            padding-top: 36px;
            background-color: white;
            font-family: "Inter", sans-serif;
            color: #403D3C;
            line-height: 1.75;
            display: flex;
            justify-content: center;
        }
        .default {
            max-width: 750px;
        }
        .small {
            max-width: 500px;
            max-height: 400px;
        }
        .large {
            max-width: 95%;
        }
        .overlay-html {
            width: 90%;
        }

        .hidden {
            display: none;
        }
    </style>
    <section class="overlay-template-container hidden" id="overlay-container" role="region">
        <div id="overlay-content-wrapper" class="overlay-content-wrapper">
            <div id="overlay-content" class="overlay-content default">
                <div class="close" id="close">
                  <img class="close_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAC2gAwAEAAAAAQAAAC0AAAAAtZJoUwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAAw5JREFUWAnVmVmO1DAQQIcZBD/co+Ea/MwN4AgjwQ24L/ywChBiEUu9dF5PyeMspJN0p6RqO97qpVy2k87Vxa3ci+xVKOnlbfHJcqN4aJTFG8hla+UFzvYOfIJR8Df0ceiz0C+hb0Pvh1K+pgj8O4w+CX0eCs+7UOoaeMARgN+EAvkh9Gko8iC0adhcLfuDHewh2IcDHrh2oUjDa/y+iAIa4GHSH6GCP4z8GqId7GI/89y0AA1v9rR39r7t8DPStcAzMHYBlgOuXSjS8DIlguc7/BzldFwDvAas/TzjcB5ClQyLDgHcO/0aecB/teWRXGiA/BzieNjFDva0mx0G3wE48o1QkBeB4N+ivAZ+Z4D9MKN/6V8D1l4G7t0MZhtoAH0RB9U8UJsyPHA5AFhW0742o45/VChmcEOltjh6p64gLj3stua4OSS0XwwxfGnHvDg/RTdiPK/qMeBdwI43C7C3lMH1zMcKuO3sV6bW44BjxinHrV7P4aEMbKjp4f+dsSpkrbALfEws1oDttxiwNzFl1WfgvoNjyi4k12Baetyp9kDI29WjdjRiWGDb5UU3ZhEPgg01ALzmwQx03Q5C2ndjjMN4q0kNnId1tkMeb1+1KdeW55mwf1SvKxrO+7jbGbDu56Q5JOy3Lm2yJsB1lPkCgUeBN5Yppx6x/f7qhL8uOkICr34vUsoR2+2vTvir5zbjaYE3E9MZ2Nh1lzi73WNz+/TmTsTNPXuUHvYA8Wmt7+DIsU87tkT7LfaU1wXs83AfsDtxDdz+i4Bng3r4rN9cMrBTO9VDc8yYM9eZ1oCPjcUucMcdE2qjgD04/F8iDzzljWPKLtQJSgWeyB4WOD/gc2Qjx7xxlB439LSDXe3AQ/uqzDZQdfS7hUc7iAE29a8pwJv7f1pgPsps5ksAqxl5GcoR6ytTPqlcnLRbUrTDIvQg46sWXDet4YZXT5/z163XAbxroRteYhpFqOCObFD9ZEDDBSVvCiVPZm0QBJeHOyrLrFs6xa4RoK0DyyETNeSJF+KH/J82H8lJpJPnH35znTjF9hlRAAAAAElFTkSuQmCC">

                </div>
                <div class="overlay-html">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
    `;

    class Overlay extends HTMLElement {
        constructor() {
            super();
            const template = comptemplate;
            this.shadowDOM = this.attachShadow({ mode: "open" });
            this.shadowDOM.appendChild(template.content.cloneNode(true));
            this.overlay = this.shadowDOM.getElementById('overlay-container');
            this.overlaycontent = this.shadowDOM.getElementById('overlay-content');
            this.overlaycontentwrapper = this.shadowDOM.getElementById('overlay-content-wrapper');
            this.close = this.shadowDOM.getElementById('close');
            this.close.addEventListener('click', this.hide.bind(this))
        }
        hide() {
            this.overlay.classList.add('hidden');
        }
        show() {
            this.overlay.classList.remove('hidden');
        }
        connectedCallback() {
            if (this.getAttribute('type') === 'small') {
                this.overlaycontent.classList.remove('default');
                this.overlaycontent.classList.add('small');
            }
            else if (this.getAttribute('type') === 'large') {
                this.overlaycontent.classList.remove('default');
                this.overlaycontentwrapper.classList.add('large');
            }
        }
    }
    
    if (!customElements.get('agno-overlay')) {
        customElements.define('agno-overlay', Overlay);
    }
    Overlay = Overlay;

})();
export { Overlay };