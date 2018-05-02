var dns = require('dns');
dns.resolve4('www.mum.edu', function(err, addresses) {
    addresses.forEach(addr => {
        console.log('IP of www.mum.edu: ' + addr) ;
    });
});
