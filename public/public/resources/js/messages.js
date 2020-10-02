/**
 * @description This file contains all messaging functionality
 */

const auth = firebase.auth();
const db = firebase.firestore();
const invites = localStorage.getItem('invites');
const projectID = localStorage.getItem('docID');
const projectName = localStorage.getItem('docName');
const ref = db.collection('projects').doc(projectID).collection('messages');
const username = localStorage.getItem('username');

function isValidMessagingInput(input) {
    if (
        input.includes(' poes') ||
        input.includes(' naai') ||
        input.includes(' doos') ||
        input.includes(' fuck') ||
        input.includes(' pussy') ||
        input.includes(' bitch') ||
        input.includes(' shit')
    ) {
        return false;
    } else if (
        input.includes('poes') ||
        input.includes('naai') ||
        input.includes('doos') ||
        input.includes('fuck') ||
        input.includes('pussy') ||
        input.includes('bitch') ||
        input.includes('shit')
    ) {
        return false;
    } else if (input == ' ' || input == '') {
        return false;
    } else {
        return true;
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in

        // Project title setup
        const projectTitle = document.querySelector('#PageHeading');
        let heading = `<p>Project: ${projectName}</p>`;
        projectTitle.innerHTML = heading;

        // // Invite badge setup
        // const inviteBadge = document.querySelector('#inviteBadge');
        // let html = `<span class="badge">${invites}</span> Invites`;
        // inviteBadge.innerHTML = html;

        db.collection('projects')
            .doc(projectID)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    var data = snapshot.data();

                    if (!data.Team.includes(user.email)) {
                        console.log('User is not a member.');
                        window.location.href = 'userHome.html';
                    }

                    //git and links

                    const gitLink = document.querySelector('#gitLink');
                    let link = `${data.repository}`;
                    console.log(link);
                    let git = `<a href="${link}">Git</a>`;

                    gitLink.innerHTML = git;
                    console.log(gitLink.innerHTML);
                } else {
                    console.log('Project does not exist');
                    window.location.href = 'userHome.html';
                }
            });
        // db.collection('users')
        //     .doc(user.uid)
        //     .get()
        //     .then((snapshot) => {
        //         if (snapshot.exists) {
        //             var data = snapshot.data();
        //             // username = data.displayName;
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
        loadMessages(username);
        // console.log(username);
        // console.log(ref.SnapshotOptions);

        // Message form handler
        let messageForm = document.querySelector('#message-form');
        const saveMessage = (e) => {
            e.preventDefault();
            // Get message text
            console.log('Getting data');
            let message = messageForm['message'].value;
            console.log(message);
            // console.log('Timestamp:');
            // console.log(db.Timestamp);
            let data = {
                message: message,
                sender: username,
                time: new Date(),
            };
            if (isValidMessagingInput(data.message) == true) {
                // console.log(ref);
                // console.log(data.time);
                ref.add(data)
                    .then((doc) => {
                        // alert user of success
                        console.log('Sent');
                        console.log(doc);
                        toast('Message sent');
                        messageForm.reset();
                    })
                    .catch((err) => {
                        console.log('Error');
                        console.log(err);
                        toastError('Error sending message: ' + err.message);
                    });
            } else {
                toast('No curse words allowed in the chat!');
            }
        };
        messageForm.addEventListener('submit', saveMessage);

        db.collection('Invites')
            .where('inviteToID', '==', user.uid)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    let html = `<span class="badge">${snapshot.docs.length}</span> Invites`;
                    inviteBadge.innerHTML = html;
                    localStorage.setItem('invites', snapshot.docs.length);
                } else {
                    console.log('invites do not exist');
                    let html2 = '<span class="badge">0</span> Invites';
                    inviteBadge.innerHTML = html2;
                }
            });
    } else {
        // User is not logged in
        console.log('user logged out');
        window.location.href = 'index.html';
    }
});

/**
 * Returns text that will be used as the innerHTML of a message div
 * @param {String} text
 */
const createMessageInnerHtml = (sender, text) => {
    var div = `<div class="sender">${sender}</div><div class="message-text">${text}</div>`;
    return div;
};

/**
 * Returns a div that will be used to display a message
 * @param {String} id
 * @param {String} sender
 * @param {String} sent
 * @param {String} text
 */
const createMessageDiv = (id, sender, sent, text) => {
    var div = document.createElement('div');
    div.setAttribute('id', id);
    div.classList.add('message');
    if (sent) {
        div.classList.add('message-sent');
    } else {
        div.classList.add('message-received');
    }
    div.innerHTML = createMessageInnerHtml(sender, text);
    return div;
};

/**
 *
 * @param {String} id
 * @param {String} sender
 * @param {String} sent
 * @param {String} text
 */
const displayMessage = (id, sender, sent, text) => {
    if (id != 'placeholder') {
        document.querySelector('#placeholder').classList.remove('visible');
    }
    var div = document.querySelector('#' + id);
    // console.log(div);
    let chat = document.querySelector('#message-container');
    if (!div) {
        div = createMessageDiv(id, sender, sent, text);
    }
    chat.appendChild(div);
    setTimeout(() => {
        div.classList.add('visible');
    }, 1);
    chat.scrollTop = chat.scrollHeight;
};

/**
 * Loads messages from the group chat
 * @param {String} username
 */
const loadMessages = (username) => {
    // Remove all previous event listeners
    // ref.off();

    // Load the last 20 messages from the chat
    const setMessage = (query) => {
        if (!query.empty) {
            query.forEach((doc) => {
                var sent = false;
                let data = doc.data();
                if (data.sender == username) {
                    sent = true;
                }
                displayMessage(doc.id, data.sender, sent, data.message);
            });
        } else {
            document.querySelector('#placeholder').classList.add('visible');
        }
    };

    ref.orderBy('time', 'asc').limitToLast(20).onSnapshot(setMessage);
};

//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut()
        .then(() => {
            //console.log("user has signed out");
        })
        .catch(function (error) {
            console.log('user failed to sign out because of error: ', error);
            alert(error.message);
        });
});
