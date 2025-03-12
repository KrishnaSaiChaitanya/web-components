let AppSwitcher = null;

(function () {
    let appSwitcherTemplate = document.createElement("template");
    console.log("bhjhvjvg");
    
    appSwitcherTemplate.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .app-switcher-container {
            position: relative;
            display: inline-block;
        }
        
        .app-switcher-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .app-switcher-button:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .app-switcher-button i {
            font-size: 24px;
            color: #333;
        }
        
        .app-switcher-panel {
            position: absolute;
            top: 48px;
            left: 0;
            width: 340px;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease-in-out;
            overflow: hidden;
        }
        
        .app-switcher-panel.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .panel-header {
            padding: 16px;
            border-bottom: 1px solid #eee;
        }
        
        .panel-header h3 {
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        
        .apps-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 16px;
            max-height: 500px;
            overflow-y: auto;
        }
        
        .app-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
            text-decoration: none;
        }
        
        .app-item:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .app-item.active {
            background-color: rgba(0, 0, 0, 0.08);
            cursor: default;
        }
        
        .app-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            margin-bottom: 8px;
        }
        
        .app-icon i {
            font-size: 24px;
            color: white;
        }
        
        .app-name {
            font-size: 12px;
            color: #333;
            text-align: center;
            font-weight: 500;
        }
        
        /* Responsive styles */
        @media (max-width: 480px) {
            .app-switcher-panel {
                width: 280px;
            }
            
            .apps-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
    
    <div class="app-switcher-container">
        <button class="app-switcher-button" aria-label="Open app switcher">
            <i class="ri-layout-grid-2-fill"></i>
        </button>
        <div class="app-switcher-panel" role="dialog" aria-labelledby="app-switcher-title">
            <div class="panel-header">
                <h3 id="app-switcher-title">Applications</h3>
            </div>
            <div class="apps-container"></div>
        </div>
    </div>
    `;
    
    class AppSwitcher extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(appSwitcherTemplate.content.cloneNode(true));
            
            // Parse app data from attribute or use default empty object
            this.appData = JSON.parse(this.getAttribute('appData') || '[]');
            this.activeAppId = this.getAttribute('activeAppId') || null;
            this.headerTitle = this.getAttribute('headerTitle') || 'Applications';
            
            // Elements
            this.button = this.shadowRoot.querySelector('.app-switcher-button');
            this.panel = this.shadowRoot.querySelector('.app-switcher-panel');
            this.appsContainer = this.shadowRoot.querySelector('.apps-container');
            this.panelHeader = this.shadowRoot.querySelector('#app-switcher-title');
            
            // Bind methods
            this.togglePanel = this.togglePanel.bind(this);
            this.closePanel = this.closePanel.bind(this);
            this.handleKeyDown = this.handleKeyDown.bind(this);
            this.handleClickOutside = this.handleClickOutside.bind(this);
            
            // Focus trap elements
            this.focusableElements = [];
        }
        
        connectedCallback() {
            // Set header title
            this.panelHeader.textContent = this.headerTitle;
            
            // Render apps
            this.renderApps();
            
            // Add event listeners
            this.button.addEventListener('click', this.togglePanel);
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('click', this.handleClickOutside);
        }
        
        disconnectedCallback() {
            // Clean up event listeners
            this.button.removeEventListener('click', this.togglePanel);
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('click', this.handleClickOutside);
        }
        
        togglePanel() {
            if (this.panel.classList.contains('open')) {
                this.closePanel();
            } else {
                this.openPanel();
            }
        }
        
        openPanel() {
            this.panel.classList.add('open');
            // Update focusable elements
            this.updateFocusableElements();
            // Set focus to first element
            if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
            
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('panelOpened'));
        }
        
        closePanel() {
            this.panel.classList.remove('open');
            // Return focus to button
            this.button.focus();
            
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('panelClosed'));
        }
        
        handleKeyDown(event) {
            if (!this.panel.classList.contains('open')) return;
            
            // Close on Escape
            if (event.key === 'Escape') {
                event.preventDefault();
                this.closePanel();
                return;
            }
            
            // Handle tab key for focus trap
            if (event.key === 'Tab') {
                if (this.focusableElements.length === 0) return;
                
                const firstElement = this.focusableElements[0];
                const lastElement = this.focusableElements[this.focusableElements.length - 1];
                
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        handleClickOutside(event) {
            const isClickInside = this.contains(event.target) || this.shadowRoot.contains(event.target);
            
            if (this.panel.classList.contains('open') && !isClickInside) {
                this.closePanel();
            }
        }
        
        updateFocusableElements() {
            // Get all focusable elements inside the panel
            this.focusableElements = Array.from(
                this.shadowRoot.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
        }
        
        renderApps() {
            this.appsContainer.innerHTML = '';
            
            this.appData.forEach(app => {
                const appElement = document.createElement('a');
                appElement.href = app.url || '#';
                appElement.className = 'app-item';
                appElement.setAttribute('tabindex', '0');
                
                // Mark as active if it matches the active app ID
                if (app.id === this.activeAppId) {
                    appElement.classList.add('active');
                    appElement.setAttribute('aria-current', 'page');
                    
                    // Prevent navigation for active app
                    appElement.addEventListener('click', (e) => {
                        e.preventDefault();
                    });
                }
                
                // Create icon element
                const iconElement = document.createElement('div');
                iconElement.className = 'app-icon';
                iconElement.style.backgroundColor = app.iconBgColor || '#6366F1';
                
                const iconInner = document.createElement('i');
                iconInner.className = app.iconClass;
                iconElement.appendChild(iconInner);
                
                // Create app name element
                const nameElement = document.createElement('span');
                nameElement.className = 'app-name';
                nameElement.textContent = app.name;
                
                // Append elements
                appElement.appendChild(iconElement);
                appElement.appendChild(nameElement);
                
                // Add click event if not active
                if (app.id !== this.activeAppId) {
                    appElement.addEventListener('click', (e) => {
                        // Navigate to the app URL
                        // For demo purposes, we'll just console log and close panel
                        if (app.url && app.url !== '#') {
                            window.location.href = app.url;
                        }
                        
                        this.closePanel();
                        
                        // Dispatch custom event with selected app
                        this.dispatchEvent(new CustomEvent('appSelected', {
                            detail: {
                                appId: app.id,
                                appName: app.name,
                                appUrl: app.url
                            }
                        }));
                    });
                }
                
                this.appsContainer.appendChild(appElement);
            });
        }
        
        // Allow dynamic updating of app data
        static get observedAttributes() {
            return ['appdata', 'activeappid', 'headertitle'];
        }
        
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'appdata' && oldValue !== newValue) {
                try {
                    this.appData = JSON.parse(newValue);
                    this.renderApps();
                } catch (e) {
                    console.error('Invalid app data format:', e);
                }
            }
            
            if (name === 'activeappid' && oldValue !== newValue) {
                this.activeAppId = newValue;
                this.renderApps();
            }
            
            if (name === 'headertitle' && oldValue !== newValue) {
                this.headerTitle = newValue;
                this.panelHeader.textContent = this.headerTitle;
            }
        }
    }
    
    customElements.define('app-switcher', AppSwitcher);
    AppSwitcher = AppSwitcher;
    
})();

export { AppSwitcher };