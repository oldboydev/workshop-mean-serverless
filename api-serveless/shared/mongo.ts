import { MongoClient, Db } from "mongodb";

export class MongoConnection{
    private config = {
        url: "mongodb://localhost:27017/crud-serveless-mongo-wavy",
        dbName: "crud-serveless-mongo-wavy"
    };

    async createConnection(){
        const connection = await MongoClient.connect(this.config.url, { useNewUrlParser: true });
        const db = connection.db(this.config.dbName);

        const connInfo = {connection, db};

        return connInfo;
    }
}