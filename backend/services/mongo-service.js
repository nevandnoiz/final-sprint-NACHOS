var dbConn = null;

function connectToMongo() {
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
 
    // Enter mongoDB URL and set the dbName const accordingly. ex:
    const url = 'mongodb+srv://nevandnoiz:hbUERCws7CvFcbZA@cluster0-dtmsh.mongodb.net/test?retryWrites=true';
    const dbName = 'NACHOS_DB';  
    
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName)
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
