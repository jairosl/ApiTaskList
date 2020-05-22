import Sequelize from 'sequelize';
import databaseConfig from '../Config/database';

import User from '../App/Models/User';
import Task from '../App/Models/Task';

const models = [User, Task];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // conecta os Models e Banco de Dados
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
