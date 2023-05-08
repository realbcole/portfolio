import { refreshFavorites, favoriteIds } from "./main.js";

// Shadow DOM
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
<style>
    p{
        display: inline;
    }
</style>
<b>Address:</b> <p id="address"></p>
<br>
<b>Phone:</b> <p id="phone"></p>
<br>
<b>Website:</b> <a id="website" href="" target="_blank"></a>
<br>
<span id="buttons">
    <button id="btn-favorite" class="button is-success is-small">
        <span class="icon is-small">
            <i class="fas fa-check"></i>
        </span>
        <span>Favorite</span>
    </button>
    <button id="btn-delete" class="button is-warning is-small">
        <span class="icon is-small">
            <i class="fas fa-times"></i>
        </span>
        <span>Delete</span>
    </button>
</span>
`;

// Info class to display info about a park
class MyInfo extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor() {
        super();
        this._address = "";
        this._phone = "";
        this._website = "";
        this._id = "";
        // Attatch shadow DOM
        this.attachShadow({ mode: "open" });
        // Clone template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // tell the component what attributes to "watch"
    static get observedAttributes() {
        return ["data-address", "data-phone", "data-website", "data-id"];
    }

    // ** lifecycle events **

    // called when the component is inserted into the DOM
    connectedCallback() {
        // Display info
        this.shadowRoot.querySelector("#address").innerHTML = this._address;
        this.shadowRoot.querySelector("#phone").innerHTML = this._phone;
        this.shadowRoot.querySelector("#website").innerHTML = this._website;
        this.shadowRoot.querySelector("#website").url = this._website;

        // If favorite is clicked, add to favorites
        this.shadowRoot.querySelector("#btn-favorite").addEventListener("click", () => {
            this.shadowRoot.querySelector("#btn-favorite").disabled = true;
            this.shadowRoot.querySelector("#btn-delete").disabled = false;
            favoriteIds.push(this._id);
            refreshFavorites();
        });

        // If delete is clicked, remove from favorites
        this.shadowRoot.querySelector("#btn-delete").addEventListener("click", () => {
            this.shadowRoot.querySelector("#btn-favorite").disabled = false;
            this.shadowRoot.querySelector("#btn-delete").disabled = true;
            favoriteIds.splice(favoriteIds.indexOf(this._id), 1);
            refreshFavorites();
        });

        // Only show favorite if not already favorited, only show delete if already favorited
        if (favoriteIds.find(favID => favID == this._id)){
            this.shadowRoot.querySelector("#btn-favorite").disabled = true;
            this.shadowRoot.querySelector("#btn-delete").disabled = false;
        }
        else{
            this.shadowRoot.querySelector("#btn-delete").disabled = true;
            this.shadowRoot.querySelector("#btn-favorite").disabled = false;
        }

        this.render();
    }

    // Invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue);
        if (oldValue === newValue) return;
        if (attributeName === "data-address") this._address = newValue;
        if (attributeName === "data-phone") this._phone = newValue;
        if (attributeName === "data-website") this._website = newValue;
        if (attributeName === "data-id") this._id = newValue;
        this.render();
    }

    // Helper method
    render() {
        // Check if template is loaded
        let a = this.shadowRoot.querySelector("a");
        if (a) {
            // If so, update DOM
            a.textContent = this._website;
            a.href = this._website;
        }
    }
}

customElements.define('my-info', MyInfo);

export { MyInfo };