import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).json({ message: 'требуется авторизация' })
        
        const token = authHeader.replace('Bearer ', '')
        if(!token) return res.status(401).json({ message: 'неверный формат токена' })
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decode.id || !decode.email) return res.status(401).json({ message: 'невалидный токен' })
        req.user = decode
        next()
    } catch(e){
        return res.json({ message: 'неверный токен' })
    }
}