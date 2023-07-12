// Saves options to chrome.storage
async function save_options() {
    var newProjectID = document.getElementById('project-id').value;

    let projectIDs = await chrome.storate.get('projectIDs')
    projectIDs.push(newProjectID)

    chrome.storage.sync.set({
        projectIDs: projectIDs
    }, function () {
        restore_options();
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        favoriteColor: 'red',
    }, function (items) {
        let projects = []

        // itemsの中身をliタグに入れた配列を作りたい
        for (let i = 0; i < items.length; i++) {
            const element = array[i];

            projects.push(`<li>${element}</li>`)
        }

        document.getElementById('projects').innerHTML = projects.join('')
    });
}

document.getElementById('save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
