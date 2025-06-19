import express from 'express'
import path from 'path'

const PORT = 3000
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
