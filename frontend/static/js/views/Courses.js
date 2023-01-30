import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Courses");
    }

    async getHtml() {
        return `
        <section class="container">
        <h1>Courses</h1>
        <section class="jumbotron">
            <h3>Add New Course:</h3>
            <form id="courseform">
                <div class="form-group py-2">
                    <label for="courseName">Course Name</label>
                    <input type="text" class="form-control" name="courseName" id="courseName" placeholder="Insert course name" required>
                </div>
                <button id="courseformbtn" type="submit" class="btn btn-primary my-2">Add a new course</button>
            </form>
        </section>
        <section class="row mt-5">
            <div class="col-lg-12">
            <table class="table" id="courseList">

            </table>
            </div>
        </section>
    </section>

            
            
        `;
    }

}
