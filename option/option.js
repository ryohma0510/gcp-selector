const storageKeyProjectIDs = 'storageKeyProjectIDs';
const htmlKeyNewProjectID = 'htmlKeyNewProjectID';
const htmlKeySaveButton = 'htmlKeySaveButton';
const htmlKeyProjectsTable = 'htmlKeyProjectsTable';

// Saves options to chrome.storage
function save_options() {
    var newProjectID = document.getElementById(htmlKeyNewProjectID).value;
    if (!newProjectID) {
        return;
    }

    chrome.storage.local.get(storageKeyProjectIDs, function (data) {
        let projectIDs = data[storageKeyProjectIDs] || [];

        if (!projectIDs.includes(newProjectID)) {
            projectIDs.push(newProjectID);
        }

        chrome.storage.local.set({
            [storageKeyProjectIDs]: projectIDs.sort()
        }, function () {
            restore_options();
            document.getElementById(htmlKeyNewProjectID).value = '';
        });
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.local.get({
        [storageKeyProjectIDs]: [],
    }, function (items) {
        let projectsTable = document.getElementById(htmlKeyProjectsTable);
        projectsTable.innerHTML = ''; // Clear the table

        for (let i = 0; i < items[storageKeyProjectIDs].length; i++) {
            const projectID = items[storageKeyProjectIDs][i];

            // Create a new table row and two cells
            let row = document.createElement('tr');
            let idCell = document.createElement('td');
            let actionCell = document.createElement('td');

            // Set the text of the ID cell
            idCell.textContent = projectID;

            // Create a new button
            let button = document.createElement('button');
            button.className = 'bg-red';
            button.textContent = "Delete";

            // Add a click event listener to the button
            button.addEventListener('click', function() {
                deleteProject(projectID);
            });

            // Add the button to the action cell
            actionCell.appendChild(button);

            // Add the cells to the row
            row.appendChild(idCell);
            row.appendChild(actionCell);

            // Add the row to the table
            projectsTable.appendChild(row);
        }
    });
}

function deleteProject(deleteProjectID) {
    chrome.storage.local.get(storageKeyProjectIDs, function (data) {
        let projectIDs = data[storageKeyProjectIDs] || [];
        projectIDs = projectIDs.filter(function (value, _index, _arr) {
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
