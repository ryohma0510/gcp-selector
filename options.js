const storageKeyProjectIDs = 'projectIDs';

// Saves options to chrome.storage
function save_options() {
    var newProjectID = document.getElementById('project-id').value;

    chrome.storage.local.get(storageKeyProjectIDs, function(data) {
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

        // itemsの中身をliタグに入れた配列を作りたい
        for (let i = 0; i < items[storageKeyProjectIDs].length; i++) {
            const projectID = items[storageKeyProjectIDs][i];
            projectIDs.push(`<li>${projectID}</li>`)
        }

        document.getElementById('projects').innerHTML = projectIDs.join('')
    });
}

document.getElementById('save').addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
