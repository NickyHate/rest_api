const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {
        id: v4(),
        name: 'Nikita',
        value: '+7-911-72-72-728',
        marked: false
    }
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({
        message: 'Контакт был удалён'
    })
})

// PUT (целиком обновляет модель), можно использовать PATCH, если нужно обновить только частично, например одно поле
app.put('/api/contacts/:id', (req, res) => {
    let contactIdx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[contactIdx] = req.body
    res.status(200).json(CONTACTS[contactIdx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))