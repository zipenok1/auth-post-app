import { Router } from 'express'
import userRouter from './userRouter.js'
import postsRouter from './postsRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/post', postsRouter)

export default router