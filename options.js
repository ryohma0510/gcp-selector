// Saves options to chrome.storage
function save_options() {
    var newProjectID = document.getElementById('project-id').value;

    chrome.storage.local.get('projectIDs', function(data) {
        let projectIDs = data.projectIDs || [];
        projectIDs.push(newProjectID);

        chrome.storage.local.set({
            projectIDs: projectIDs
        }, function () {
            restore_options();
        });
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        projectIDs: [],
    }, function (items) {
        let projects = []

        // itemsの中身をliタグに入れた配列を作りたい
        for (let i = 0; i < items.projectIDs.length; i++) {
            const element = items.projectIDs[i];
            projects.push(`<li>${element}</li>`)
        }

        document.getElementById('projects').innerHTML = projects.join('')
    });
}

document.getElementById('save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
