import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Results");
    }

    async getHtml() {
        return `
        <section class="container">
        <h1>Results</h1>
        <section class="jumbotron">
            <h3>Add Results:</h3>
            <form id="resultsform">
                <div class="form-group py-2">
                    <label for="courseOption">Course Options</label>
                    <select class="form-control" name="courseOption" id="courseOption" placeholder="Pick a course" required>

                    </select>
                </div>

                <div class="form-group py-2">
                    <label for="studentOption">Student Options</label>
                    <select class="form-control" name="studentOption" id="studentOption" placeholder="Pick a student" required>

                    </select>
                </div>

                <div class="form-group py-2">
                    <label for="courseOption">Score</label>
                    <select class="form-control" name="courseGrade" id="courseGrade" placeholder="Select a score" required>
                        <option value=""> Select a score </option>
                        <option> A </option>
                        <option> B </option>
                        <option> C </option>
                        <option> D </option>
                        <option> E </option>
                        <option> F </option>
                    </select>
                </div>
                <button id="resultsformbtn" type="submit" class="btn btn-primary my-2">Add results</button>
            </form>
        </section>
        <section class="row mt-5">
            <div class="col-lg-12">
            <table class="table" id="resultsList">

            </table>
            </div>
        </section>
    </section>

            
            
        `;
    }

}
