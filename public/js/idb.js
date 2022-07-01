

// window.addEventListener('online', statusCheck);
// window.addEventListener('offline', statusCheck);

// function statusCheck (e){
//     //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine

//     //https://levelup.gitconnected.com/detecting-online-offline-in-javascript-1963c4fb81e1#:~:text=We%20can%20detect%20if%20the,user's%20internet%20connections%20state%20changes.
//     if(navigator.onLine) {
//         console.log('online yay');
        
//     }
//     else {
//         console.log('offline yp')
//     }
// }

let db;

const request = indexedDB.open("budgettracker-", 1);

request.onupgradeneeded = function(event) {

    // save a reference to the database
    const db = event.target.result;

    // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    // log error here
    console.log("There was an err on idb" + event.target.errorCode);
};