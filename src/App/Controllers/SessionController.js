import jwt from 'jsonwebtoken';
import User from '../Models/User';

import authConfig from '../../Config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // Verificar se existe o email
        const user = await User.findOne({
            where: { email },
        });

        if (!user)
            return res.status(401).json({ error: 'Esse email não existe' });

        // Verificar se a senha não é valida para o email

        if (!(await user.checkPassword(password)))
            return res.status(401).json({ error: 'Senha Incorreta.' });

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
