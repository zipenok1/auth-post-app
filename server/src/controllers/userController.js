import model from '../models/model.js'
import jwt from 'jsonwebtoken'
import { hashPassword, comparePassword } from '../utils/password.js'

class UserController {
    async registr(req, res){
        try{
            const {email, password} = req.body
            const exist = await model.User.findOne({where: {email: email}})
            if(exist) return res.status(401).json({message: 'user с таким email уже существует'})
            
            const hashedPassword = await hashPassword(password)
            const user = await model.User.create({ email, password: hashedPassword }) 
            if (!user) return res.status(401).json({ message: 'ошибка создания пользователя' })

            const token = jwt.sign({ 
                id: user.id_user, 
                email: user.email 
            },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
            )

            return res.status(200).json({
                token,
                user: {
                    id: user.id_user,
                    email: user.email
                }
            })
        } catch(e){
            console.error('ошибка регистрации', e)
        }
    }
    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await model.User.findOne({where: {email: email}})
            if(!user) return res.status(401).json({message: 'не найден'})
    
            const validPass = await comparePassword(password, user.password)
            if(!validPass) return res.status(401).json({message: 'неверынй пароль'})
    
            const token = jwt.sign({ 
                id: user.id_user, 
                email: user.email 
            },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
            )
    
            return res.status(200).json({
                token,
                message: 'успешно авторизован'
            }) 
        } catch(e){
            console.log('ошибка авторизации', e);
        }
    }
}

export default new UserController()