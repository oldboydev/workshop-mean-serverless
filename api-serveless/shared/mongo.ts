import { MongoClient, Db } from "mongodb";

export class MongoConnection{
    private config: {
        url: "mongodb://localhost:27017/crud-serveless-mongo-wavy",
        dbName: "crud-serveless-mongo-wavy"
    };

    private connInfo: {
        connection: MongoClient,
        db: Db
    };

    async createConnection(){
        this.connInfo.connection = await MongoClient.connect(this.config.url, { useNewUrlParser: true });
        this.connInfo.db = this.connInfo.connection.db(this.config.dbName);

        return this.connInfo;
    }
}