function slow(callback) {
    for (let i = 0; i < 5e8; i++) {
        if (Math.random() > 0.5) {
            return callback("Error", null);
        }
        return callback(null, { id: 12345 });
    }
}

function exec(fn) {
    return new Promise(function (resolve, reject) {
        const callback = function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        }
        fn(callback);
    });
}

exec(slow).then(
    function (data) {
        console.log(data);
    },
    function (err) {
        console.log("Error: " + err);
    },       
);
