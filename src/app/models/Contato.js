import Sequelize, { Model }  from "sequelize";

class Contato extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            number: Sequelize.STRING,
        },
        {
          sequelize,  
        }
    
    );

    return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    }


}

export default Contato;