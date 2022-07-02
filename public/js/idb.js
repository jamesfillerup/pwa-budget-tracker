let db;

const request = indexedDB.open("budgettracker", 1);


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

    console.log("There was an err on idb"+ event.target.errorCode);
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

