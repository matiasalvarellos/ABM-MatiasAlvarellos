const express= require("express");
const router= express.Router();
const controller= require("../controller/controllerProducto")

router.get("/", controller.inicio);
router.get("/crear",controller.formulario);
router.post("/crear", controller.crear);
router.get("/edit/:id", controller.edicion);
router.post("/edit/:id", controller.update);
router.get("/delete/:id", controller.destroy);

module.exports=router