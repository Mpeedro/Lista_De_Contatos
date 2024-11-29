import Sequelize from "sequelize";
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Contato from "../app/models/Contato";

const models = [User, Contato];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        
        // Inicializa todos os modelos
        models
            .map((model) => model.init(this.connection))
            // Faz as associações dos modelos
            .forEach((model) => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
