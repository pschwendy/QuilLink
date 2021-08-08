const { Client } = require('pg');
const bcrypt = require("bcryptjs");
// await client.connect()

class Queries {
    // Constructor
    // Connects client to DB
    super() {
        const client = new Client();
        await client.connect();
    }

    // Queries.signin()
    // Checks if database query @ username exists, if not, signs up w/ given parameters
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    signup(email, password, name, callback) {
        const select = {
            text: "SELECT password FROM users WHERE email=$1",
            values: [email]
        };

        this.client.query(select, (err, rows) => {
            if(err) {
                throw err;
            } else if (!rows) {
                const query = {
                    text: "INSERT INTO users(email, password, name) VALUES (email=$1, password=$2, name=$3)",
                    values: [email, password, name]
                }

                this.client.query(query, (err) => {
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

        this.client.query(query, (err, rows) => {
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

    // Queries.getUser()
    // Checks if database query @ username has password = input password
    // Input: username -> username used for finding user in database
    // Input: password -> checks if found user has this password
    getUser(email, callback) {
        const query = {
            text: "SELECT * FROM users WHERE email=$1",
            values: [email]
        };

        this.client.query(query, (err, rows) => {
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

        this.client.query(query, (err, rows) => {
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

        this.client.query(query, (err, rows) => {
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

        this.client.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // getProjectsFromTags()

    // Gets recent and top projects based on inserted tags
    getTrending(callback) {
        const query = "SELECT * FROM projects ORDER BY last_updated DESC, likes DESC, views DESC";

        this.client.query(query, (err, rows) => {
            if(err) {
                throw(err);
            }
            return callback(rows);
        });
    } // getProjectsFromTags()
}

module.exports = Queries;