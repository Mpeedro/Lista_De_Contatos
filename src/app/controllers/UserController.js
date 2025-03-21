import User from '../models/User';
import * as Yup from 'yup';


class UserController {
    async store(req, res) {
       
        // Verifica se o email já está cadastrado
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ error: "Usuário já existe." });
        }

        
        const { id, name, email } = await User.create(req.body);

        return res.status(201).json({ 
            id,
            name,
            email,
        });
    }

    async update(req, res){
    

       const { email, oldPassword } = req.body;
       const user = await User.findByPk(req.userId);
       if(email !== user.email){
        const userExist = await User.findOne({
            where: { email },
        });

        if (userExist) {
            return res.status(400).json({ error: "Usuário já existe." });
        }

       }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ json: "Senha incorreta "});
        }

        const {id, name } = await user.update(req.body);


        return res.json({
            id,
            name,
            email,
        })
    }



}

export default new UserController();
