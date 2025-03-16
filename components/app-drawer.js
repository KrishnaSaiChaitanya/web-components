let SidebarAppSwitcher = null;

(function () {
    let sidebarAppSwitcherTemplate = document.createElement("template");
    sidebarAppSwitcherTemplate.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .sidebar-switcher-container {
            position: relative;
            display: inline-block;
        }
        
        .sidebar-switcher-button {
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
        
        .sidebar-switcher-button:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .sidebar-switcher-button i {
            font-size: 24px;
            color: #333;
        }
        
        .sidebar-panel {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 280px;
            background-color: white;
            box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        
        .sidebar-panel.open {
            transform: translateX(0);
        }
        
        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border-bottom: 1px solid #eee;
            position: sticky;
            top: 0;
            gap: 20px;
            background-color: white;
            z-index: 2;
        }
        
        .panel-header h3 {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            flex-grow: 1;
        }
        
        .close-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            margin-right: 20px
            border-radius: 6px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .close-button:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .close-button i {
            font-size: 20px;
            color: #555;
        }
        
        .apps-list {
            display: flex;
            flex-direction: column;
            padding: 8px;
            flex-grow: 1;
        }
        
        .app-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
            text-decoration: none;
            margin-bottom: 4px;
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
            width: 36px;
            height: 36px;
            border-radius: 8px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .app-icon i {
            font-size: 18px;
            color: white;
        }
        
        .app-name {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
        
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out;
        }
        
        .backdrop.open {
            opacity: 1;
            visibility: visible;
        }
        
        .grid-icon {
            background-image: url('../icons/grid-icon.svg');
            height: 32px;
            width: 32px;
        }
        
        /* Small screen adjustments */
        @media (max-width: 480px) {
            .sidebar-panel {
                width: 240px;
            }
        }
    </style>
    
    <div class="sidebar-switcher-container">
        <button class="sidebar-switcher-button" aria-label="Open app sidebar">
          <span class="grid-icon"></span>
        </button>
        <div class="backdrop"></div>
        <div class="sidebar-panel" role="dialog" aria-labelledby="sidebar-title">
            <div class="panel-header">
               
                <button class="close-button" aria-label="Close sidebar">
                   <span class="grid-icon"></span>
                </button>
                 <h3 id="sidebar-title">Applications</h3>
            </div>
            <div class="apps-list"></div>
        </div>
    </div>
    `;
    
    class SidebarAppSwitcher extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(sidebarAppSwitcherTemplate.content.cloneNode(true));
        
            this.appData = JSON.parse(this.getAttribute("appData") || "[]");
            this.activeAppId = this.getAttribute('activeAppId') || null;
            this.headerTitle = this.getAttribute('headerTitle') || 'Applications';
            
            
            this.button = this.shadowRoot.querySelector('.sidebar-switcher-button');
            this.panel = this.shadowRoot.querySelector('.sidebar-panel');
            this.backdrop = this.shadowRoot.querySelector('.backdrop');
            this.closeButton = this.shadowRoot.querySelector('.close-button');
            this.appsList = this.shadowRoot.querySelector('.apps-list');
            this.panelHeader = this.shadowRoot.querySelector('#sidebar-title');
            
           
            this.openPanel = this.openPanel.bind(this);
            this.closePanel = this.closePanel.bind(this);
            this.handleKeyDown = this.handleKeyDown.bind(this);
            this.handleBackdropClick = this.handleBackdropClick.bind(this);
            
            
            this.focusableElements = [];
        }
        
        connectedCallback() {
            
            this.panelHeader.textContent = this.headerTitle;
            
            
            this.renderApps();
            
            
            this.button.addEventListener('click', this.openPanel);
            this.closeButton.addEventListener('click', this.closePanel);
            this.backdrop.addEventListener('click', this.handleBackdropClick);
            document.addEventListener('keydown', this.handleKeyDown);
            
            
            this.panel.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });
        }
        
        disconnectedCallback() {
            
            this.button.removeEventListener('click', this.openPanel);
            this.closeButton.removeEventListener('click', this.closePanel);
            this.backdrop.removeEventListener('click', this.handleBackdropClick);
            document.removeEventListener('keydown', this.handleKeyDown);
        }
        
        openPanel() {
            this.panel.classList.add('open');
            this.backdrop.classList.add('open');
            
            
            document.body.style.overflow = 'hidden';
            this.updateFocusableElements();
            
            
            if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
            
            this.dispatchEvent(new CustomEvent('panelOpened'));
        }
        
        closePanel() {
            this.panel.classList.remove('open');
            this.backdrop.classList.remove('open');
            document.body.style.overflow = '';
            this.button.focus();
            this.dispatchEvent(new CustomEvent('panelClosed'));
        }
        
        handleKeyDown(event) {
            if (!this.panel.classList.contains('open')) return;
            
            if (event.key === 'Escape') {
                event.preventDefault();
                this.closePanel();
                return;
            }
            
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
        
        handleBackdropClick() {
            this.closePanel();
        }
        
        updateFocusableElements() {
            this.focusableElements = Array.from(
                this.shadowRoot.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
        }
        
        renderApps() {
            this.appsList.innerHTML = '';
            
            this.appData.forEach(app => {
                const appElement = document.createElement('a');
                appElement.href = app.url || '#';
                appElement.className = 'app-item';
                appElement.setAttribute('tabindex', '0');
                
                if (app.id === this.activeAppId) {
                    appElement.classList.add('active');
                    appElement.setAttribute('aria-current', 'page');
                    appElement.addEventListener('click', (e) => {
                        e.preventDefault();
                    });
                }
                
                const iconElement = document.createElement('div');
                iconElement.className = 'app-icon';
                iconElement.style.backgroundColor = app?.iconBgColor || 'white';
                
                const iconInner = document.createElement('img');
                iconInner.src = app.iconClass;
                iconInner.style.width = '32px';
                iconInner.style.height = '32px';
                iconElement.appendChild(iconInner);
                const nameElement = document.createElement('span');
                nameElement.className = 'app-name';
                nameElement.textContent = app.name;
                
                // Append elements
                appElement.appendChild(iconElement);
                appElement.appendChild(nameElement);
                
                
                if (app.id !== this.activeAppId) {
                    appElement.addEventListener('click', (e) => {
                       
                        if (app.url && app.url !== '#') {
                            window.location.href = app.url;
                        }
                        
                        this.closePanel();
                        
                        
                        this.dispatchEvent(new CustomEvent('appSelected', {
                            detail: {
                                appId: app.id,
                                appName: app.name,
                                appUrl: app.url
                            }
                        }));
                    });
                }
                
                this.appsList.appendChild(appElement);
            });
        }
        
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
    
    // customElements.define("sidebar-app-switcher", SidebarAppSwitcher);
    if (!customElements.get("sidebar-app-switcher")) {
  customElements.define("sidebar-app-switcher", SidebarAppSwitcher);
}
    SidebarAppSwitcher = SidebarAppSwitcher;
    
})();

export { SidebarAppSwitcher };