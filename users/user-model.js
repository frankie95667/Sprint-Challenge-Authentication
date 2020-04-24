module.exports = {
    findBy,
    insert
}

const db = require("../database/dbConfig");

function findBy(filter){
    return db("users").where(filter);
}

function insert(user){
    return db("users").insert(user).then(([id]) => {
        return db("users").where({id}).first();
    });
}