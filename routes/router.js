const express = require('express')
const router = express.Router()

//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const personController = require('../controllers/personController')
const authController = require('../controllers/authController')
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
            if (row.codigo_rol=="1") { 
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
                res.render('editPerson', { user: results[0], titleWeb: "Edit person" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

//path to delete a selected person record
router.get('/deleteUser/:dni_persona', (req, res) => {
    const usuario = req.params.usuario
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

module.exports = router;