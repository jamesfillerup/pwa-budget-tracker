

// window.addEventListener('online', statusCheck);
// window.addEventListener('offline', statusCheck);

// const { response } = require("express");

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

    const db = event.target.result;
    db.createObjectStore('newItem', { autoIncrement: true });
};

request.onsuccess = function (event) {

    db = event.target.result;

    if (navigator.onLine) {
        showItem();
    }
};

request.onerror = function (event) {

    console.log("There was an err on idb");
};

function saveRecord(record) {

    const transaction = db.transaction(['newItem'], 'readwrite');
    const  storeNewItem = transaction.objectStore('newItem');

    storeNewItem.add(record);
}

//this show the items on made in the transactions
function showItem(){
    const transaction = db.transaction(['newItem'], 'readwrite');
    const  storeNewItem = transaction.objectStore('newItem');
    const getAll = storeNewItem.getAll();

    getAll.onsuccess = function (){
        if (getAll.result.length > 0){
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then(() => {
                const transaction = db.transaction(['newItem'], 'readwrite');
                const  storeNewItem = transaction.objectStore('newItem');
    //this clears items
                storeNewItem.clear();
            })
        }
    }
}


window.addEventListener('online', showItem);

