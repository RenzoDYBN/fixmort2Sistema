const express = require('express')
const router = express.Router()

//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const personController = require('../controllers/personController')
const enterpriseController = require('../controllers/enterpriseController')
const representanteController = require('../controllers/representanteController')
const authController = require('../controllers/authController')
const storeController = require('../controllers/storeController')
const cotizacionController = require('../controllers/cotizacionController')

const { Router } = require('express')


//path to send the data in json format
const { json } = require('express');

//Invoke the database connection
const conexion = require('../database/db')


//router for views
// router.get('/', authController.isAuthenticated, (req, res) => {
//     res.render('index', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
// })

// router.get(["/", "/login"], (req, res) => {
//     res.render('login');
// })

router.get('/logout', authController.logout)

router.get(["/", "/login"], (req, res) => {
    res.render('login', { alert:false })
})

router.get("/index", authController.isAuthenticated, (req, res) => {
    // res.send("<h1>Hello Renzo</h1>")
    // console.log(req.name);
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol >= 0) { 
                // console.log(results);
                res.render('index', { results:results, nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"});
            } else {
                res.render('login', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
});

// router.get('/login', (req, res) => {
//     res.render('login', { alert:false })
// })

// router.get('/register', (req, res) => {
//     res.render('register', { alert:false })
// })

// router.post('/register', authController.register)
router.post('/login', authController.login)

//path to retrieve all users
router.get('/users', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol == 1) { 
                res.render('users', { results: results,nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "List users" })
            } else {
                res.render('index', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to create a record
router.get('/createUser', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createUser', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Create user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

//path to edit a selected record
router.get('/editUser/:usuario', authController.isAuthenticated, (req, res) => {
    const usuario = req.params.usuario;
    conexion.query('SELECT * FROM usuarios WHERE usuario= ?', [usuario], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.codigo_rol=="1") {
                res.render('editUser', { user: results[0], nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Edit user" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected record
router.get('/deleteUser/:usuario', (req, res) => {
    const usuario = req.params.usuario
    console.log("ingrese a eliminar usuario:" + usuario);
    conexion.query('DELETE FROM usuarios WHERE usuario= ?', [usuario], (error, results) => {
        console.log("ingrese a eliminar usuario:" + results)
        if(error){
            throw error;
        } else {
            res.redirect('/users')
        }
    })
});


router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)

//PERSONAS RUTAS Y FRONT
router.get('/persons', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM personas', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol=="1") { 
                res.render('persons', { results: results, nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "List persons" })
            } else {
                res.render('index', {nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to create a person record
router.get('/createPerson', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createPerson', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Create person"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

//path to edit a selected person record
router.get('/editPerson/:dni_persona', authController.isAuthenticated, (req, res) => {
    const dni_persona = req.params.dni_persona;
    conexion.query('SELECT * FROM personas WHERE dni_persona= ?', [dni_persona], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.codigo_rol=="1") {
                res.render('editPerson', { person: results[0],nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Edit person" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected person record
router.get('/deletePerson/:dni_persona', (req, res) => {
    const dni_persona = req.params.dni_persona
    console.log("ingrese aqui a personas")
    conexion.query('DELETE FROM personas WHERE dni_persona= ?', [dni_persona], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/persons')
        }
    })
});

router.post('/savePerson', personController.savePerson)
router.post('/updatePerson', personController.updatePerson)





//REPRESENTATE RUTAS Y FRONT
router.get('/representantes', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM representante', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol=="1") { 
                res.render('representantes', { results: results,nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "List Representante" })
            } else {
                res.render('index', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
            }
        }
    })
})


//path to create a agent record
router.get('/createRepresentante', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createRepresentante', {nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Create Representante"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

//path to edit a selected agent record
router.get('/editRepresentante/:id_representante', authController.isAuthenticated, (req, res) => {
    const id_representante = req.params.id_representante;
    conexion.query('SELECT * FROM representante WHERE id_representante= ?', [id_representante], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.codigo_rol=="1") {
                res.render('editRepresentante', { representante: results[0], nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Edit Representante" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected agent record
router.get('/deleteRepresentante/:id_representante', (req, res) => {
    const id_representante = req.params.id_representante
    conexion.query('DELETE FROM representante WHERE id_representante= ?', [id_representante], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/representantes')
        }
    })
});

router.post('/saveRepresentante', representanteController.saveRepresentante)
router.post('/updateRepresentante', representanteController.updateRepresentante)


//EMPRESAS RUTAS Y FRONT
router.get('/enterprises', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM empresas', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol=="1") { 
                res.render('enterprises', { results: results, nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "List Empresas" })
            } else {
                res.render('index', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
            }
        }
    })
})


//path to create a person record
router.get('/createEnterprise', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createEnterprise', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Create Enterprise"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

//path to edit a selected person record
router.get('/editEnterprise/:id_ruc', authController.isAuthenticated, (req, res) => {
    const id_ruc = req.params.id_ruc;
    conexion.query('SELECT * FROM empresas WHERE id_ruc= ?', [id_ruc], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.codigo_rol=="1") {
                res.render('editEnterprise', { enterprise: results[0], nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,  titleWeb: "Edit Empresa" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected person record
router.get('/deleteEnterprise/:id_ruc', (req, res) => {
    const id_ruc = req.params.id_ruc
    conexion.query('DELETE FROM empresas WHERE id_ruc= ?', [id_ruc], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/enterprises')
        }
    })
});

router.post('/saveEnterprise', enterpriseController.saveEnterprise)
router.post('/updateEnterprise', enterpriseController.updateEnterprise)


router.post('/upload/:usuario', (req, res) => {
    const usuario = req.params.usuario
    const image = req.file.filename

    conexion.query('UPDATE usuarios SET ? WHERE usuario= ?', [{image:image}, usuario], (error, results) => {
        if(error){
            console.error(error);
        } else {
            res.redirect('/users')
        }
    })
})

//path to retrieve all users
router.get('/store', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM almacen', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol == 1) { 
                res.render('store', { results: results, nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "List store" })
            } else {
                res.render('index', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to create a record
router.get('/createStore', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createStore', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Create Store"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})


router.get('/editStore/:id_pieza', authController.isAuthenticated, (req, res) => {
    const id_pieza = req.params.id_pieza;
    conexion.query('SELECT * FROM almacen WHERE id_pieza= ?', [id_pieza], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.codigo_rol=="1") {
                res.render('editStore', { store: results[0], nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Edit store" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})
//path to delete a selected record
router.get('/deleteStore/:id_pieza', (req, res) => {
    const id_pieza = req.params.id_pieza
    conexion.query('DELETE FROM almacen WHERE id_pieza = ?', [id_pieza], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/store')
        }
    })
});



router.post('/addPiece', storeController.addPiece)
router.post('/updateStore', storeController.updatePiece)



//COTIZACIONES RUTAS Y FRONT
router.get('/createCotizacion', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM roles_usuario', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol=="1") { 
                res.render('createCotizacion', { results: results, nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "List persons" })
                console.log(results);
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})


//path to create a cotiz record
// router.get('/createCotizacion', authController.isAuthenticated, (req, res) => {
//     if (row.codigo_rol=="1") {        
//         res.render('createCotizacion', { nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario,titleWeb: "Create person"})
//     } else {
//         res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
//     }
// })

//path to edit a selected cotiz record
// router.get('/editPerson/:dni_persona', authController.isAuthenticated, (req, res) => {
//     const dni_persona = req.params.dni_persona;
//     conexion.query('SELECT * FROM personas WHERE dni_persona= ?', [dni_persona], (error, results) => {
//         if(error){
//             throw error;
//         } else {
//             if(row.codigo_rol=="1") {
//                 res.render('editPerson', { person: results[0],nombre_usuario: row.nombre_usuario, estado_usuario: row.estado_usuario, titleWeb: "Edit person" })
//             } else {
//                 res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
//             }
//         }
//     })
// })

//path to delete a selected cotiz record
// router.get('/deletePerson/:dni_persona', (req, res) => {
//     const dni_persona = req.params.dni_persona
//     conexion.query('DELETE FROM personas WHERE dni_persona= ?', [dni_persona], (error, results) => {
//         if(error){
//             throw error;
//         } else {
//             res.redirect('/persons')
//         }
//     })
// });

// router.post('/saveCotizacion', function(req, res){
//     console.log(req.body);
//     db.run(
//         'INSERT into days VALUES  ($harvestDays)',
//         {
//     $harvestDays: req.body.harvestDays
//         } 
//         );
//     });

router.post('/saveCotizacion', cotizacionController.saveCotizacion)
// router.post('/updatePerson', personController.updatePerson)

module.exports = router;