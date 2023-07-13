const storageKeyProjectIDs = 'storageKeyProjectIDs';
const htmlKeyNewProjectID = 'htmlKeyNewProjectID';
const htmlKeySaveButton = 'htmlKeySaveButton';
const htmlKeyProjectsTable = 'htmlKeyProjectsTable';

// Saves options to chrome.storage
function save_options() {
    var newProjectID = document.getElementById(htmlKeyNewProjectID).value;

    chrome.storage.local.get(storageKeyProjectIDs, function (data) {
        let projectIDs = data[storageKeyProjectIDs] || [];
        projectIDs.push(newProjectID);

        chrome.storage.local.set({
            [storageKeyProjectIDs]: projectIDs
        }, function () {
            restore_options();
        });
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        [storageKeyProjectIDs]: [],
    }, function (items) {
        let projectIDs = []

        for (let i = 0; i < items[storageKeyProjectIDs].length; i++) {
            const projectID = items[storageKeyProjectIDs][i];
            projectIDs.push(`<tr>
<td>${projectID}</td>
<td><button onclick="deleteProject('${projectID}')">Delete</button></td>
</tr>
            `)
        }

        document.getElementById(htmlKeyProjectsTable).innerHTML = projectIDs.join('')
    });
}

function deleteProject(deleteProjectID) {
    chrome.storage.local.get(storageKeyProjectIDs, function (data) {
        let projectIDs = data[storageKeyProjectIDs] || [];
        projectIDs = projectIDs.filter(function (value, _, _) {
            return value != deleteProjectID;
        });

        chrome.storage.local.set({
            [storageKeyProjectIDs]: projectIDs
        }, function () {
            restore_options();
        });
    });
}

document.getElementById(htmlKeySaveButton).addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
