document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop form from trying to submit

    var serviceName = document.getElementById('service').value;
    var projectName = document.getElementById('project').value;

    var url = 'https://console.cloud.google.com/' + serviceName + '?project=' + projectName;

    // Open the URL in a new tab
    window.open(url, '_blank');
});


// List of sample services and projects for autoComplete.js
const services = ["service1", "service2", "service3"];
const projects = ["project1", "project2", "project3"];


const projectAutoCompleteJS = new autoComplete({
    selector: "#project",
    data: {
        src: projects,
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                projectAutoCompleteJS.input.value = selection;
            }
        }
    }
});


const serviceAutoCompleteJS = new autoComplete({
    selector: "#service",
    data: {
        src: services,
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                serviceAutoCompleteJS.input.value = selection;
            }
        }
    }
});
