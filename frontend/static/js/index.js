//Import the views 

import Home from "./views/Home.js";
import Students from "./views/Students.js";
import Courses from "./views/Courses.js";

//Use history api to prevent page reload for SPA

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

function checkAge() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    //Add a zero if one Digit (eg: 05,09)
    if (dd < 10) {
        dd = "0" + dd;
    }

    //Add a zero if one Digit (eg: 05,09)
    if (mm < 10) {
        mm = "0" + mm;
    }

    // let minYear = yyyy - 80; //Calculate Minimun Age (<80)
    let minYear = yyyy - 10; //Calculate Maximum Age (>18)

    let min = minYear + "-" + mm + "-" + dd;
    let max = maxYear + "-" + mm + "-" + dd;

    return min;

    // document.getElementById("dob").setAttribute("min", min);
    // document.getElementById("dob").setAttribute("max", max);
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/students", view: Students },
        { path: "/courses", view: Courses }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    
    console.log('this is match', match, match.route.path)
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

        fetch("http://localhost:3000/data")
        .then(res => res.json())
        .then(data => {
            console.log(data.length)
            console.log(data)

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

        console.log("RESET");
        console.log(document.getElementById('studentform'))
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

            console.log(document.getElementById('dob').value < today)

            if (studentAge > today){
                e.preventDefault();
                alert("Student must be 10 years of age or older.")
            } else if (firstN === "" || familyN === ""){
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

            console.log('time to post fetch');

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
            

            setTimeout( () => {
            document.getElementById('studentform').reset();
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