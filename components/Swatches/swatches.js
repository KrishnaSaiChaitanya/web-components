let Swatches = null;
 
(function () {
    let swatchesTemplate = document.createElement("template");
    swatchesTemplate.innerHTML = `
    <style>
        .swatches {
            width: 85%;
            margin: 0 auto;
            padding: 25px 0 50px;
            display: grid;
            grid-template-columns: repeat(11, 24px);
            gap: 10px;
        }
 
        .swatch {
            position: relative;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            background-color: var(--palette-gray-200);
            box-sizing: border-box;
            transition: border 0.2s;
        }
 
        .swatch.light {
            border: 2px solid #d3d3d3;
        }
 
        .swatch:hover, .swatch input[type="radio"]:checked + .swatch {
            border: 2px solid black;
        }
 
        .tooltip {
            visibility: hidden;
            width: auto;
            background-color: black;
            color: white;
            text-align: center;
            border-radius: 4px;
            padding: 4px;
            position: absolute;
            bottom: 30px; /* Adjusted to appear above the swatch */
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size: 12px;
            z-index: 10;
        }
 
        .swatch:hover .tooltip {
            visibility: visible;
        }
 
        .swatch input[type="radio"] {
            display: none;
        }
    </style>
 
    <div class="swatches"></div>
    `;
 
    class Swatches extends HTMLElement {
        constructor() {
            super();
            const template = swatchesTemplate;
            this.shadowroot = this.attachShadow({ mode: "open" });
            this.shadowroot.appendChild(template.content.cloneNode(true));
 
            // Colors object, parsed from `colorData` attribute
            this.colors = JSON.parse(this.getAttribute('colorData') || '{}');
 
            // Selected swatch color
            this.selectedSwatch = this.getAttribute('selectedSwatch') || null;
        }
 
        connectedCallback() {
            this.render();
            this.shadowroot.addEventListener('change', this.onSwatchChange.bind(this));
        }
 
        onSwatchChange(event) {
            if (event.target.name === 'swatch') {
                this.selectedSwatch = event.target.value;
                this.render();
                this.dispatchEvent(new CustomEvent('swatchChange', { detail: this.selectedSwatch }));
            }
        }
 
        render() {
            const swatchesContainer = this.shadowroot.querySelector('.swatches');
            swatchesContainer.innerHTML = '';
 
            // Iterate through nested object keys
            for (const groupName in this.colors) {
                const group = this.colors[groupName];
 
                group.forEach(({ color, text }) => {
                    const swatchLabel = document.createElement('label');
                    swatchLabel.classList.add('swatch');
                    swatchLabel.style.backgroundColor = color;
 
                    // Add "light" class for very light colors
                    if (['#ffffff', '#e1d1fe', '#ffbbea', '#ffc9ba', '#ffd1ff'].includes(color)) {
                        swatchLabel.classList.add('light');
                    }
 
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'swatch';
                    radioInput.value = color;
                    radioInput.checked = color === this.selectedSwatch;
 
                    // Tooltip element
                    const tooltip = document.createElement('span');
                    tooltip.className = 'tooltip';
                    tooltip.innerText = text || "Color";
 
                    swatchLabel.appendChild(radioInput);
                    swatchLabel.appendChild(tooltip); // Append tooltip to swatch label
                    swatchesContainer.appendChild(swatchLabel);
                });
            }
        }
 
        disconnectedCallback() {
            this.shadowroot.removeEventListener('change', this.onSwatchChange.bind(this));
        }
    }
 
    customElements.define('agno-swatches', Swatches);
    Swatches = Swatches;
 
})();
export { Swatches };