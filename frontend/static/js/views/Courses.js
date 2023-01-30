import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Courses");
    }

    async getHtml() {
        return `
            <h1>Courses</h1>
            <p>You are viewing the courses!</p>
        `;
    }
}