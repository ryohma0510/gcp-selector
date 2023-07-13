import { STORAGE_PROJECT_IDS_KEY } from "./storage";

// Saves options to chrome.storage
function save_options() {
    var newProjectID = document.getElementById('project-id').value;

    chrome.storage.local.get(STORAGE_PROJECT_IDS_KEY, function(data) {
        let projectIDs = data[STORAGE_PROJECT_IDS_KEY] || [];
        projectIDs.push(newProjectID);

        chrome.storage.local.set({
            [STORAGE_PROJECT_IDS_KEY]: projectIDs
        }, function () {
            restore_options();
        });
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        [STORAGE_PROJECT_IDS_KEY]: [],
    }, function (items) {
        let projectIDs = []

        // itemsの中身をliタグに入れた配列を作りたい
        for (let i = 0; i < items.projectIDs.length; i++) {
            const projectID = items.projectIDs[i];
            projectIDs.push(`<li>${projectID}</li>`)
        }

        document.getElementById('projects').innerHTML = projectIDs.join('')
    });
}

document.getElementById('save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
