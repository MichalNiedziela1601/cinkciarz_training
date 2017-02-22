'use strict';
module.exports =function(server){
    server.register({
        register: require('hapi-cors'),
        options: {
            origins: ['*'],
            allowCredentials: 'true',
            exposeHeaders: ['content-type', 'content-length'],
            maxAge: 600,
            methods: ['POST, GET, OPTIONS, DELETE, PUT'],
            headers: ['Accept', 'Content-Type', 'Authorization']
        }

    }, (error) =>{
        if(error){
            throw error;
        }
    });
};
