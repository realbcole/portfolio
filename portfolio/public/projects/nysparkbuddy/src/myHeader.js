// Shadow DOM
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    crossorigin="anonymous" referrerpolicy="no-referrer">
    <header class="hero is-small is-info is-bold p-2">
    <div class="hero-body">
      <div class="container">
        <h1 class="title"></h1>
        <h2 class="subtitle"></h2>
      </div>
    </div>
  </header>
`;

// Custom header class
class MyHeader extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor() {
        super();
        this._subtitle = 'Ace Coder';
        this._title = 'Title';
        // Attatch shadow DOM
        this.attachShadow({ mode: "open" });
        // Clone template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
        return ["data-subtitle", "data-title"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback() {
        this.render();
    }

    // this method is invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue);
        if (oldValue === newValue) return;
        if (attributeName == 'data-subtitle') {
            this._subtitle = newValue;
        }
        if (attributeName == 'data-title') {
            this._title = newValue;
        }
        this.render();
    }

    // helper method
    render() {
        // Check if template is loaded
        let h1 = this.shadowRoot.querySelector("h1");
        let h2 = this.shadowRoot.querySelector("h2");
        if (h1) {
            // If so, update DOM
            h1.innerHTML = this._title;
            h2.innerHTML = this._subtitle;
        }
    }
}

customElements.define('my-header', MyHeader);

export { MyHeader };