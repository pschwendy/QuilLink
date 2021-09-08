const { Pool } = require('pg');
const bcrypt = require("bcryptjs");
// await pool.connect()

class queries {
    // Constructor
    // Connects pool to DB
    constructor() {
        this.pool = new Pool({
            user: 'quillink',
            database: 'quillink_db',
            password: 'supersecretpassword',
            port: 5432,
        });
        this.pool.connect();
    }

    // Queries.signin()
    // Checks if database query @ username exists, if not, signs up w/ given parameters
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    signup(email, password, name, callback) {
        console.log("------------in here aslkjdsakldjslkdjsld");
        const select = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.pool.query(select, (err, rows) => {
            console.log(rows.length);
            if(err) {
                throw err;
            } else if (rows.length == 0) {
                const query = {
                    text: "INSERT INTO users(email, username password, name) VALUES (email=$1, username=$1, password=$2, name=$3)",
                    values: [email, password, name]
                }

                this.pool.query(query, (err) => {
                    if(err) {
                        throw(err);
                    }
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    } // signup()

    async async_signup(email, password, name, success) {
        console.log("quering...");
        console.log("email: " + email);
            console.log("name: " + name);
        const select = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.pool
        .query(select)
        .then(rows => {
            console.log(rows.rowCount);
            if (rows.rowCount == 0) {
                const query = {
                    text: "INSERT INTO users(email, username, password, name) VALUES ($1, $1, $2, $3)",
                    values: [email, password, name]
                }

                this.pool.query(query, (err) => {
                    if(err) {
                        throw(err);
                    }
                    return success(true);
                });
            } else {
                console.log("Calling signin");
                this.async_signin(email, password, (result) => {
                    return success(result);
                })
                
            }
        })
        .catch(e => { throw e })
    } // signup()

    // Queries.signin()
    // Checks if database query @ username exists, if not, signs up w/ given parameters
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    signup(email, password, name, callback) {
        const select = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.pool.query(select, (err, rows) => {
            if(err) {
                throw err;
            } else if (!rows) {
                const query = {
                    text: "INSERT INTO users(email, username password, name) VALUES (email=$1, username=$1, password=$2, name=$3)",
                    values: [email, password, name]
                }

                this.pool.query(query, (err) => {
                    if(err) {
                        throw(err);
                    }
                    return callback(true);
                });
            } else {
                return callback(false);
            }
        });
    } // signup()

    // Queries.signin()
    // Checks if database query @ username has password = input password
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    signin(email, password, callback) {
        const query = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            } 
            else if (!rows) {
                return callback(false);
            } 
            else if (rows.length > 1) {               
                return callback(false);
            }

            // Signs in if password is correct
            bcrypt.compare(password, rows.password, (bcryptErr, result) => {
                if(bcryptErr) {
                    throw(bcryptErr);
                } else if(result == true) {
                    return callback(rows);
                }
            });
        });
    } // signin()

    // Queries.signin()
    // Checks if database query @ username has password = input password
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    async async_signin(email, password, success) {
        const query = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.pool.query(query)
        .then(rows => {
            console.log(rows.rows[0]);
            if (rows.rowCount == 0) {
                return success(false);
            } 
            else if (rows.rows[0].password == password) {               
                return success(true);
            }

            // Signs in if password is correct
            /*bcrypt.compare(password, rows.password, (bcryptErr, result) => {
                if(bcryptErr) {
                    throw(bcryptErr);
                } else if(result == true) {
                    return callback(rows);
                }
            });*/
        })
        .catch(e => { throw e });
    } // async_signin()

    // Queries.getUser()
    // Checks if database query @ username has password = input password
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    getUser(email, callback) {
        const query = {
            text: "SELECT * FROM users WHERE email=$1",
            values: [email]
        };

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // signin()

    // Queries.getUserProjects()
    getUserProjects(userpk, callback) {
        const query = {
            text: "SELECT * FROM projects WHERE userpk=$1",
            values: [userpk]
        }

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // getUserProjects()

    // Recommends projects based on tags that users prefer
    recommendProjects(tags, callback) {
        const query = {
            text: "SELECT * FROM projects WHERE ",
            values: [tags]
        };

        for (var i = 0; i < tags.length; ++i) {
            filter = i + 1;
            query.text += "tags->>'tags' ? $" + filter;

            if(i != tags.length - 1) {
                query.text += " OR ";
            }
        }

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // recommendProjects()

    // Gets recent and top projects based on inserted tags
    getProjectsFromTags(tags, callback) {
        const query = {
            text: "SELECT * FROM projects WHERE ",
            values: [tags]
        };

        for (var i = 0; i < tags.length; ++i) {
            filter = i + 1;
            query.text += "tags->>'tags' ? $" + filter;

            if(i != tags.length - 1) {
                query.text += " AND ";
            }
        }

        query.text += " ORDER BY last_updated DESC, likes DESC, views DESC";

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // getProjectsFromTags()

    // Gets recent and top projects based on inserted tags
    getTrending(callback) {
        const query = "SELECT * FROM projects ORDER BY last_updated DESC, likes DESC, views DESC";

        this.pool.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // getProjectsFromTags()
}

module.exports = queries;