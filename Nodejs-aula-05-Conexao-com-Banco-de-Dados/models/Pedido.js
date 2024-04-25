const { Sequelize } = require('sequelize');

import connection from "../config/sequelize-config";

const Pedido = connection.define('pedidos', {
    numero: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Pedido.sync({force: false})

export default Pedido