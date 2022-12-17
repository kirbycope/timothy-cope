/** A flag to indicate wheter the changes have been saved.
 * If true, then the onunload event will not prompt when the user navigates away.
 * */
var changesSaved;

//#region Event Listeners

/** Sets the beforeunload event listener for window. */
function beforeUnload() {
    changesSaved = false;
    window.addEventListener('beforeunload', (event) => {
        //event.preventDefault();
        if (unsavedChanges()) {
            promptUnsavedChanges(event);
        }
        //event.returnValue = '';
    });
}

//#endregion

/**
 * Prompts the user they will loose any unsaved changes.
 * @param {Event} event The event that called this function.
 * @returns {string} The confirmation message.
 */
function promptUnsavedChanges(event) {
    var confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

    (event || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}

/** Checks for unsaved changes.
 * @returns {boolean} Returns true if unsaved changes are noticed.
 * */
function unsavedChanges() {
    if (changesSaved !== true) {
        if (document.querySelector('.ql-editor')) {
            if (document.location.href.includes('newBlogPost')) {
                if (document.getElementById('category').value !== '' ||
                    document.querySelector('.ql-editor').innerHTML !== '<p><br></p>' ||
                    document.getElementById('date').value !== "" ||
                    document.getElementById('description').value !== '' ||
                    document.getElementById('slug').value !== '' ||
                    document.getElementById('thumbnail').value !== '' ||
                    document.getElementById('title').value !== ''
                ) {
                    return true;
                }
            }
            else if (document.location.href.includes('/blog/')) {
                return true;
            }
            else if (document.location.href.includes('newReview')) {
                //
            }
            else if (document.location.href.includes('/reviews/')) {
                //
            }
        }
    }
    return false;
}
