function slow(callback) {
    for (let i = 0; i < 5e8; i++) {
        if (Math.random() > 0.5) {
            return callback("Error", null);
        }
        callback(null, { id: 12345 });
    }
}

function exec(fn) {
    let result = [];

    let done = function(fn, data) {
        fn(data);
    }

    let fail = function(fn, error) {
        fn(error);
    }    

    let callback = function (error, data) {
        if (error) {
            result.push({ error: error, data: null });
        } else {
            result.push({ error: null, data: data });
        }
    }

    fn(callback);

    const intervalObj = setInterval(() => {
        if (result.length > 0) {
            const obj = result.shift();
            if (obj.error) {
                fail(function(error) {
                    console.log(error);
                }, obj.error);
            } else {
                done(function(data) {
                    console.log(data);
                }, obj.data);
            }

        }
    }, 100);

    setTimeout(function() {
        clearInterval(intervalObj);
    }, 5000);

    return {
        done: done,
        fail: fail
    }
}

exec(slow)
    // .done(function (data) {
    //     console.log(data);
    // })
    // .fail(function (err) {
    //     console.log("Error: " + err);
    // });


