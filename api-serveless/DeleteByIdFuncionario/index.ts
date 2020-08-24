import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoConnection } from "../shared/mongo"
import { ObjectID } from "mongodb"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params

    if (!id) {
      context.res = {
        status: 400,
        body: 'Os campos são obrigatórios!'
      }
  
      return
    }

    const mongoConnection: MongoConnection = new MongoConnection();
    const connInfo = await mongoConnection.createConnection();

    const Funcionarios = connInfo.db.collection('funcionarios');

    try {
        await Funcionarios.findOneAndDelete({ _id: new ObjectID(id) });

        connInfo.connection.close();

        context.res = {
            status: 204,
            body: 'Funcionário excluído com sucesso!'
        };
      } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao atualizar o Funcionário'
        };
    }
};

export default httpTrigger;
