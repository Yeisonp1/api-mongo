const express = require("express")
const routesProveedores = require("./routesProveedores")
const routesContacto = require("./routesContacto")

function routerApi(app) {
    app.use('/proveedores', routesProveedores)
    app.use('/contactos', routesContacto)
}

module.exports = routerApi;