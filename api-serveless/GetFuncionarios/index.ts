import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoConnection } from "../shared/mongo"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const mongoConnection: MongoConnection = new MongoConnection();
    const connInfo = await mongoConnection.createConnection();

    const Funcionarios = connInfo.db.collection('funcionarios')
    const res = await Funcionarios.find({})
    const body = await res.toArray()

    connInfo.connection.close()

    context.res = {
        status: 200,
        body
    }
};

export default httpTrigger;