import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoConnection } from "../shared/mongo"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const funcionario = req.body || {}

    if (funcionario) {
      context.res = {
        status: 400,
        body: 'Os dados do(a) Funcionário(a) é obrigatório!'
      }
    }

    const mongoConnection: MongoConnection = new MongoConnection();
    const connInfo = await mongoConnection.createConnection();

    const Funcionarios = connInfo.db.collection('funcionarios')

    try {
        const funcionarios = await Funcionarios.insert(funcionario)
        connInfo.connection.close()

        context.res = {
            status: 201,
            body: funcionarios.ops[0]
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error ao criar um novo Funcionário(a)'
        }
    }
};

export default httpTrigger;