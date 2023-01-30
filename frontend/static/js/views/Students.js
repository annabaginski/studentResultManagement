import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Students");
    }

    async getHtml() {
        return `
        <section class="container">
        <h1>Students</h1>
        <section class="jumbotron">
            <h3>Add New Student:</h3>
            <form id="studentform">
                <div class="form-group py-2">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" required placeholder="Insert student's first name">
                </div>
                <div class="form-group py-2">
                    <label for="familyName">Family Name</label>
                    <input type="text" class="form-control" name="familyName" id="familyName" required placeholder="Insert student's last name">
                </div>
                <div class="form-group py-2">
                    <label for="dob">Date of Birth</label>
                    <input type="date" class="form-control" name="dob" id="dob" required>
                </div>
                <button id="studentformbtn" type="submit" class="btn btn-primary my-2">Add a new student</button>
            </form>
        </section>
        <section class="row mt-5">
            <div class="col-lg-12">
            <table class="table" id="studentList">

            </table>
            </div>
        </section>
    </section>

            
            
        `;
    }

}


{/* <h1>Students</h1>
<p>You are viewing the students!</p>

<form id="studentform" action="/students" method="POST">
    <label for="firstName">First Name:</label>
    <input type="text" name="firstName" id="firstName" required>

    <label for="familyName">Family Name:</label>
    <input type="text" name="familyName" id="familyName" required>

    <label for="dob">Date of Birth:</label>
    <input type="date" name="dob" id="dob" required>

    <button id="studentformbtn" type="submit">Submit</button>
</form>

<table id="studentList">

</table> */}