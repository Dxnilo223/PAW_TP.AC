const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.get('/about', (req, res) => {
    res.send('Another page')
})

app.get('/products', (req, res) => {
    res.json([
        {id: 1, name:'iphone 15', price:530},
        {id: 2, name:'iphone 15 pro', price:679}
    ]
    )
})

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const products =[
        {id: 1, name:'iphone 15', price:530},
        {id: 2, name:'iphone 15 pro', price:679}
    ]

    const requestedProduct = products.find((product) => product.id === id)
    res.json(requestedProduct)
})

app.listen(3000, ()=> {
    console.log('SERVER IS RUNNING')
})