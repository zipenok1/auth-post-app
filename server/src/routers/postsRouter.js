import { Router } from 'express'
import postsController from '../controllers/postsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleware, postsController.receipt)
router.post('/', authMiddleware, postsController.add)
router.put('/:id', authMiddleware, postsController.editing)
router.delete('/:id', authMiddleware, postsController.delete)

export default router