//Import the views 

import Home from "./views/Home.js";
import Students from "./views/Students.js";
import Courses from "./views/Courses.js";
import Results from "./views/Results.js";

//Use history api to prevent page reload for SPA
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

//Router to set views and work within each view
const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/students", view: Students },
        { path: "/courses", view: Courses },
        { path: "/results", view: Results}
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    
    //If no match found, return user to homepage
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    //Create new instance of view and put into app element
    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();

    //Working within students view
    if (match.route.path === '/students'){

        fetch("http://localhost:3000/studentdata")
        .then(res => res.json())
        .then(data => {

            document.getElementById('studentList').innerHTML +=
            "<tr>" +
            "<th>First Name</th>" +
            "<th>Family Name</th>" +
            "<th>Date of Birth (yyyy-mm-dd)</th>" +
            "</tr>" 
            
            for (let i = 0; i < data.length; i++){
                let firstN = data[i].firstN;
                let familyN = data[i].familyN;
                let dob = data[i].dob;
            
            document.getElementById('studentList').innerHTML +=
            "<tr>" +
            "<td>" + firstN + "</td>" +
            "<td>" + familyN + "</td>" +
            "<td>" + dob + "</td>" +
            "</tr>" ;
            }
        })
        .catch(err => {
            console.log('Error', err)
        });

        document.getElementById('studentformbtn').addEventListener("click", (e) => {
            //Pull values from form
            let firstN = document.getElementById('firstName').value;
            let familyN = document.getElementById('familyName').value;
            let dob = document.getElementById('dob').value

            //Get date to restrict for age
            let today = new Date();
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let dd = String(today.getDate()).padStart(2, '0');
            let yyyy = today.getFullYear() - 10;
            
            today = yyyy + '-' + mm + '-' + dd;
            let studentAge = document.getElementById('dob').value;

            if (studentAge > today){
                e.preventDefault();
                alert("Student must be 10 years of age or older.")
            } else if (firstN === "" || familyN === ""){
                e.preventDefault();
                alert("Please make sure all fields are filled out.")
            } else {
            e.preventDefault();
            alert('Student added!');

            document.getElementById('studentList').innerHTML +=
            "<tr>" +
            "<td>" + firstN + "</td>" +
            "<td>" + familyN + "</td>" +
            "<td>" + dob + "</td>" +
            "</tr>" ;

            //Fetch to post student data to db
            fetch('/poststudent', {
                method: 'POST',
                body: JSON.stringify({
                    firstN,
                    familyN,
                    dob
                }),
                headers: { 
                    'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'}
            }).then( res => res.json())
            .then( res => console.log(res))
            
            //Timeout to allow for submission to db
            setTimeout( () => {
            document.getElementById('studentform').reset();
            }, 1000);
        }
        })
    }

    //Working within courses view
    if (match.route.path === '/courses'){

        fetch("http://localhost:3000/coursedata")
        .then(res => res.json())
        .then(data => {

            document.getElementById('courseList').innerHTML +=
            "<tr>" +
            "<th>Course Name</th>" +
            "</tr>" 
            
            for (let i = 0; i < data.length; i++){
                let courseName = data[i].courseName;
            
            document.getElementById('courseList').innerHTML +=
            "<tr>" +
            "<td>" + courseName + "</td>" +
            "</tr>" ;
            }
        })
        .catch(err => {
            console.log('Error', err)
        });

        document.getElementById('courseformbtn').addEventListener("click", (e) => {
            //Pull values from form
            let courseName = document.getElementById('courseName').value;

            if (courseName === ""){
                e.preventDefault();
                alert("Please make sure all fields are filled out.")
            } else {

            e.preventDefault();
            alert('Course added!');

            document.getElementById('courseList').innerHTML +=
            "<tr>" +
            "<td>" + courseName + "</td>" +
            "</tr>" ;

            //Fetch to post new course data to db
            fetch('/postcourse', {
                method: 'POST',
                body: JSON.stringify({
                    courseName
                }),
                headers: { 
                    'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'}
            }).then( res => res.json())
            .then( res => console.log(res))
            
            setTimeout( () => {
            document.getElementById('courseform').reset();
            }, 1000);
        }
        })
    }

    //Working within results view
    if (match.route.path === '/results'){

        document.getElementById('resultsList').innerHTML +=
        "<tr>" +
        "<th>Course</th>" +
        "<th>Student</th>" +
        "<th>Score</th>" +
        "</tr>" ;

        //Fetch data to populate list at bottom
        fetch("http://localhost:3000/resultsdata")
        .then(res => res.json())
        .then(data => {
            
            for (let i = 0; i < data.length; i++){
                let course = data[i].course;
                let student = data[i].student;
                let score = data[i].score;
            
            document.getElementById('resultsList').innerHTML +=
            "<tr>" +
            "<td>" + course + "</td>" +
            "<td>" + student + "</td>" +
            "<td>" + score + "</td>" +
            "</tr>" ;
            }
        })
        .catch(err => {
            console.log('Error', err)
        });

        //Fetch data to populate course options
        fetch("http://localhost:3000/coursedata")
        .then(res => res.json())
        .then(data => {
            
            document.getElementById('courseOption').innerHTML +=
                "<option value=''> Choose a course </option>" ;

            for (let i = 0; i < data.length; i++){
                let courseName = data[i].courseName;
            
                document.getElementById('courseOption').innerHTML +=
                "<option>" + courseName + "</option>" ;
            }
        })
        .catch(err => {
            console.log('Error', err)
        });

        //Fetch data to populate student options
        fetch("http://localhost:3000/studentdata")
        .then(res => res.json())
        .then(data => {
            
            document.getElementById('studentOption').innerHTML +=
                "<option value=''> Choose a student </option>" ;

            for (let i = 0; i < data.length; i++){
                let studentName = data[i].firstN + ' ' + data[i].familyN;
                console.log(studentName)
            
                document.getElementById('studentOption').innerHTML +=
                "<option>" + studentName + "</option>" ;
            }
        })
        .catch(err => {
            console.log('Error', err)
        });

        document.getElementById('resultsformbtn').addEventListener("click", (e) => {
            //Pull values from form
            let course = document.getElementById('courseOption').value;
            let student = document.getElementById('studentOption').value;
            let score = document.getElementById('courseGrade').value

            if (course === "" || student === "" || score === ""){
                e.preventDefault();
                alert("Please pick an option for every field.")
            } else {
            e.preventDefault();
            alert('Results added!');

            document.getElementById('resultsList').innerHTML +=
            "<tr>" +
            "<td>" + course + "</td>" +
            "<td>" + student + "</td>" +
            "<td>" + score + "</td>" +
            "</tr>" ;

            //Fetch to post new results to db
            fetch('/postresults', {
                method: 'POST',
                body: JSON.stringify({
                    course,
                    student,
                    score
                }),
                headers: { 
                    'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'}
            }).then( res => res.json())
            .then( res => console.log(res))
            
            setTimeout( () => {
            document.getElementById('resultsform').reset();
            }, 1000);
        }
        })
    }
};

//Event listener to listen for user clicking back and forward arrows
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
