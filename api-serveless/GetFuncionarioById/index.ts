import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoConnection } from "../shared/mongo"
import { ObjectID } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params;

    if (!id) {
        context.res = {
            status: 400,
            body: 'Por favor, passe o número correto do Id do Funcionário!'
        };

        return;
    }

    const mongoConnection: MongoConnection = new MongoConnection();
    const connInfo = await mongoConnection.createConnection();

    const Funcionarios = connInfo.db.collection('funcionarios');

    try {
        const body = await Funcionarios.findOne({_id: new ObjectID(id)});

        connInfo.connection.close();

        context.res = {
            status: 200,
            body
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao listar o Funcionário pelo Id.'
        }
    }
};

export default httpTrigger;
