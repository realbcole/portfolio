// Shadow DOM
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    crossorigin="anonymous" referrerpolicy="no-referrer">
    <div class="footer has-background-info has-text-centered has-text-light p-1"></div>
`;

// Custom footer class
class MyFooter extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor() {
        super();
        this._year = "";
        this._name = "";
        // Attatch shadow DOM
        this.attachShadow({ mode: "open" });
        // Clone template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
        return ["data-year", "data-name"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback() {
        this.render();
    }

    // Invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue);
        if (oldValue === newValue) return;
        if (attributeName == 'data-year') this._year = newValue;
        if (attributeName == 'data-name') this._name = newValue;
        this.render();
    }

    // helper method
    render() {
        // Check if template is loaded
        let div = this.shadowRoot.querySelector("div");
        if (div) {
            // If so, update DOM
            div.innerHTML = `&copy; ${this._year} ${this._name}`
        }
    }
}

customElements.define('my-footer', MyFooter);

export { MyFooter };