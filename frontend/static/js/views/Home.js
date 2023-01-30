import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <h1>Welcome to your Student Result Management System</h1>
            <p>
                Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
            </p>
            <p>
                <a href="/students" data-link>View students</a>.
            </p>
        `;
    }
}