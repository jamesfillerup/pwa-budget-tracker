

window.addEventListener('online', statusCheck);
window.addEventListener('offline', statusCheck);

function statusCheck (e){
    //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine

    //https://levelup.gitconnected.com/detecting-online-offline-in-javascript-1963c4fb81e1#:~:text=We%20can%20detect%20if%20the,user's%20internet%20connections%20state%20changes.
    if(navigator.onLine) {
        console.log('online yay');
        
    }
    else {
        console.log('offline yp')
    }
}

let db;

const request = indexedDB.open("budget", 1);

