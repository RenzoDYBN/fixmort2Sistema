const express = require('express')
const router = express.Router()

//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const personController = require('../controllers/personController')
const enterpriseController = require('../controllers/enterpriseController')
const representanteController = require('../controllers/representanteController')
const authController = require('../controllers/authController')
const storeController = require('../controllers/storeController')
const { Router } = require('express')


//path to send the data in json format
const { json } = require('express');

//Invoke the database connection
const conexion = require('../database/db')

//path to retrieve all users
router.get('/users', authController.isAuthenticated, (req, res) => {
    // res.send('hola mundo')    
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        } else {
            // res.send(results);
            if (row.codigo_rol == 1) { 
                res.render('users', { results: results, titleWeb: "List users" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to create a record
router.get('/createUser', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createUser', { titleWeb: "Create user"})
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
                res.render('editUser', { user: results[0], titleWeb: "Edit user" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected record
router.get('/deleteUser/:usuario', (req, res) => {
    const usuario = req.params.usuario
    conexion.query('DELETE FROM usuarios WHERE usuario= ?', [usuario], (error, results) => {
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
                res.render('persons', { results: results, titleWeb: "List persons" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to create a person record
router.get('/createPerson', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createPerson', { titleWeb: "Create person"})
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
                res.render('editPerson', { person: results[0], titleWeb: "Edit person" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected person record
router.get('/deletePerson/:dni_persona', (req, res) => {
    const dni_persona = req.params.dni_persona
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
                res.render('representantes', { results: results, titleWeb: "List Representante" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})


//path to create a agent record
router.get('/createRepresentante', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createRepresentante', { titleWeb: "Create Representante"})
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
                res.render('editRepresentante', { representante: results[0], titleWeb: "Edit Representante" })
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
                res.render('enterprises', { results: results, titleWeb: "List Empresas" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})


//path to create a person record
router.get('/createEnterprise', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createEnterprise', { titleWeb: "Create Enterprise"})
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
                res.render('editEnterprise', { enterprise: results[0], titleWeb: "Edit Empresa" })
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



//router for views
router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
})

router.get('/logout', authController.logout)

router.get('/login', (req, res) => {
    res.render('login', { alert:false })
})

// router.get('/register', (req, res) => {
//     res.render('register', { alert:false })
// })

// router.post('/register', authController.register)
router.post('/login', authController.login)

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
                res.render('store', { results: results, titleWeb: "List store" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Almacen"})
            }
        }
    })
})

//path to create a record
router.get('/createStore', authController.isAuthenticated, (req, res) => {
    if (row.codigo_rol=="1") {        
        res.render('createStore', { titleWeb: "Create Store"})
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
                res.render('editStore', { store: results[0], titleWeb: "Edit store" })
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


module.exports = router;