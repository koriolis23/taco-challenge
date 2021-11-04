import orders from '../../../data/orders.json'
const fs = require('fs')
const path = require('path')

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(orders)
    } else if(req.method === 'POST') {
        const ordersList = req.body.orders
        const newOrders = ordersList.map(order => ({...order, Id: Date.now()}))
        fs.writeFile(path.join(__dirname, '../../../../data/orders.json'), JSON.stringify([...orders, ...newOrders], null, 4));
        res.status(201).json(newOrders)
    }
}