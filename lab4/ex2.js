const os = require('os');
const { Observable } = require('rxjs');

function checkSystem(){
    let checkOk = true;
    console.log('Checking your system...');

    const mem = Math.floor(os.totalmem() / (1024 * 1024));
    if (mem < 2048) {
        checkOk = false;
        console.log('This app needs at least 2GB');
    }

    const cpus = os.cpus();
    if (cpus.length < 2) {
        checkOk = false;
        console.log('Processor is not supported');
    }

    if (checkOk) {
        console.log('The system is check successfully');
    }
}

const checkSystemRx = Observable.create(function (observer) {
    let checkOk = true;

    observer.next('Checking your system...');

    const mem = Math.floor(os.totalmem() / (1024 * 1024));
    if (mem < 2048) {
        checkOk = false;
        observer.next('This app needs at least 2GB');
    }

    const cpus = os.cpus();
    if (cpus.length < 2) {
        checkOk = false;
        observer.next('Processor is not supported');        
    }

    if (checkOk) {
        observer.next('The system is check successfully');        
    }

    observer.complete();
});


//checkSystem();

const subscription = checkSystemRx.subscribe(val => console.log(val));

subscription.unsubscribe();