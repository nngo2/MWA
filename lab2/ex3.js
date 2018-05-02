function slow(callback) {
    //for (let i = 0; i < 5e8; i++) {
        if (Math.random() > 0.5) {
            return callback("Error", null);
        }
        return callback(null, { id: 12345 });
    //}
}

function exec(fn) {
    //
    //APPROACH 1: NOT GOOD
    //

    // return new Promise(function (resolve, reject) {
    //     const callback = function (error, data) {
    //         if (error) {
    //             reject(error);
    //         } else {
    //             resolve(data);
    //         }
    //     }
    //     fn(callback);
    // });

    //
    //APPROACH 2: OK
    //

    // let result;

    // const done = function(cb) {
    //     if (result !== 'Error') {
    //         cb(result);
    //     }
    //     return this;
    // }

    // const fail = function(cb) {
    //     if (result === 'Error') {
    //         cb(result);
    //     }
    //     return this;
    // }    

    // const callback = function(error, data) {
    //     if (error === null) {
    //         result = data;
    //     } else {
    //         result = error;
    //     }
    // }

    // fn(callback);

    // return {
    //     done: done,
    //     fail: fail
    // }


    //
    // APPROACH 3: THE BEST
    //
    let obj = {};

    fn(function(error, data){
        obj.done = function(callback) {
            if (error === null) {
                callback(data); 
            }
            return this;           
        };
        obj.fail = function(callback) {
            if (error !== null) {
                callback(error);
            }
            return this;            
        };        
    });

    return obj;
}

// exec(slow).then(
//     function (data) {
//         console.log(data);
//     },
//     function (err) {
//         console.log("Error: " + err);
//     },       
// );

exec(slow)
    .done(function (data) {
            console.log(data);
        })
    .fail(function (err) {
            console.log("Error: " + err);
        });
