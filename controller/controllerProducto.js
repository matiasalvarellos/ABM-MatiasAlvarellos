const fs = require('fs');
const path = require('path');

function getProductos() {
    const productsJSON = fs.readFileSync(path.resolve(__dirname, '../data/productos.json'), "utf-8");
    const product = JSON.parse(productsJSON);
    return product;
}
function writeJson(array){
    let jsonArray= JSON.stringify(array, null, "");
    return fs.writeFileSync(path.resolve(__dirname, "../data/productos.json"),jsonArray);
}

const controller={
    inicio:(req, res, next) => {
        const productos = getProductos();
        return res.render("productos", {productos})
    },
    formulario:(req, res, next) => {
       return res.render("form-create-prod")
    },
    crear:(req, res, next) => {
        let productos = getProductos();
        let nuevoProducto={
            id: req.body.id,
            nombre: req.body.nombre,
            precio: req.body.precio,
            marca: req.body.marca,
            stock: req.body.stock,
            descripcion: req.body.descripcion
        }
        let productosNuevos=[...productos, nuevoProducto];
        writeJson(productosNuevos)
        return res.send("Producto Creado!")
    },
    edicion: (req, res, next) => {
        let productos= getProductos();
        let id= req.params.id;
        let producto= productos.find(product => product.id == id)
        if(producto){
           return res.render("form-edit-prod", {producto:producto})
        }else{
           return res.send("No se encontro el producto con el id "+ id)
        }
    },
    update:(req, res, next) => {
        let productos = getProductos();
        let productosEditados = productos.map(producto => {
            if(producto.id == req.params.id){
                producto.nombre = req.body.nombre;
                producto.precio = req.body.precio;
                producto.descripcion = req.body.descripcion;
                producto.marca = req.body.marca;
                producto.stock = req.body.stock;
            }
            return producto;
        })
        writeJson(productosEditados);
        return res.redirect("/productos/edit/"+req.params.id);
    },
    destroy:(req, res, next) => {
        let productos = getProductos();
        let productoEliminado = productos.find(producto => producto.id == req.params.id);
        if(productoEliminado){
            let productosEditados = productos.filter(producto => producto.id != req.params.id);
            writeJson(productosEditados)
            return res.send( "producto eliminado: "+ productoEliminado.nombre );
        }else{
            return res.send( "producto no encontrado con el id " + req.params.id );
        }       
    }
    
}
module.exports=controller;