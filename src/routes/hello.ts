import { Router } from 'express'

export const router = Router()

router.get('/hello', (req, res) => {
    res.json({ message: 'Olá, mundo!' })
})