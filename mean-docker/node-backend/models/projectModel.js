const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'host.docker.internal',
    database: 'postgres',
    password: 'pg1234',
    port: 5432,
});

client.connect();

const projectModel = {
    getImages: function(req, res) {
        return new Promise(function(resolve, reject){
            let offset = parseInt(req.query.offset) || 0;
            let size = parseInt(req.query.limit) || 5;
            let from = offset * size;
            let to = from + size;
            const query2 = `
                SELECT id
                FROM images
            `;
            client.query(query2, (err, res) => {
                if(err) {
                    console.error(err);
                    return;
                }
                var total = res.rows.length
                const query = `
                    SELECT *
                    FROM images
                    LIMIT ${size} OFFSET ${from}
                `;
                client.query(query, (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    resolve({
                        total: total,
                        rows: res.rows
                    })
                    // client.end();
                });
            })
        })
    },
    getImage: function(req, res) {
        return new Promise(function(resolve, reject){
            id = req.params.id
            const query = `
                SELECT image_path
                FROM images
                where id = ${id}
            `;
            client.query(query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(res.rows)
                // client.end();
            });
        })
    },
    saveImage: function(req, res) {
        return new Promise(function(resolve, reject){
            id = req.params.id
            data = req.body.data
            const query = `
                UPDATE images 
                SET image_path = '${data}'
                WHERE id = ${id}
            `;
            client.query(query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(res)
                // client.end();
            });
        })
    },
    checkUser: function(req, res) {
        return new Promise(function(resolve, reject){
            data = req.body.data
            id = data.data.id
            const query = `
                SELECT id
                FROM users
                WHERE id = '${id}'
            `;
            client.query(query, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if(res.rows.length > 0) {
                    const query = `
                        INSERT INTO session_tokens (user_id, token)
                        VALUES ('${data.data.id}', '${data.data.idToken}')
                    `;
                    client.query(query, (err, res) => {
                        if(err) {
                            console.error(err);
                            return; 
                        }
                        resolve(res)
                    })
                }
                else {
                    const query = `
                        INSERT INTO users(id, name, email, firstname, lastname, photourl)
                        VALUES('${data.data.id}', '${data.data.name}', '${data.data.email}', '${data.data.firstname}', '${data.data.lastname}', '${data.data.photoUrl}' )
                    `;
                    client.query(query, (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        else {
                            resolve(res)
                        }
                    })
                }
            });
        })
    },
    checkSession: function(req, res) {
        return new Promise(function(resolve, reject){
            data = req.body.data
            token = JSON.parse(data.data)
            const query = `
                SELECT TOKEN 
                FROM session_tokens
                WHERE token = '${token}'
            `;
            client.query(query, (err, res) => {
                if(err) {
                    console.log(err)
                    return;
                }
                if(res.rows.length <= 0) {
                    resolve(JSON.stringify({msg: "user session expired", status: false}))
                }
                else
                {
                    resolve(JSON.stringify({msg: "user is in session", status: true}))
                }
            })
        })
    }
}

module.exports = projectModel