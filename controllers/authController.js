const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')

//procedure to register
// exports.register = async (req, res) => {   
//     try {
//     const dni_persona = req.body.dni_persona
//     const pass = req.body.pass
//     const codigo_rol = req.body.codigo_rol
//     const estado_usuario = req.body.estado_usuario

//         let passHash = await bcryptjs.hash(pass, 10)

//         conexion.query('SELECT nombre_persona,apellido_paterno,apellido_materno FROM personas WHERE dni_persona = ?', [dni_persona], (err, results, fields) => {
//             if (!err) {

//                 data1 = JSON.stringify(results[0].nombre_persona);
//                 data2 = JSON.stringify(results[0].apellido_paterno);
//                 data3 = JSON.stringify(results[0].apellido_materno);

//                 let result1 = data1.substring(2, 1);
//                 const result2 = data2.slice(1, -1)
//                 console.log('apellido_paterno recortado:' + result2);
//                 let result3 = data3.substring(2, 1);

//                 const nombre_usuario_mayusculas = result1.concat(result2, result3);
//                 var nombre_usuariod = nombre_usuario_mayusculas.toLowerCase();
//                 console.log('USUARIO A CREAR:' + nombre_usuariod);

//                 //INSERTAMOS AL NUEVO USUARIO

//                 //console.log(name + " - " + email + " - " + passHash)
//                 conexion.query('INSERT INTO usuarios SET ?', {dni_persona: dni_persona,codigo_rol: Number(codigo_rol) ,nombre_usuario:nombre_usuariod, pass: passHash, estado_usuario: "Activo"}, (error, results) => {
//                 if(error) {
//                 //console.error(error)
//                 res.render('register', {
//                     alert: true,
//                     alertMessage: 'Este usuario ya existe'
//                 })
//                 } else {   
//                 res.redirect('/')
//              }
//             }); 
//     }});
//     } catch (error) {
//         console.error(error)
//     }
// }


//procedure to login
exports.login = async (req, res)=>{
    try {
        const nombre_usuario = req.body.nombre_usuario
        const pass = req.body.pass        
        if(!nombre_usuario || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Warning",
                alertMessage: "Enter your email and password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Email or Password invalid",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //login OK
                    const usuario = results[0].usuario
                    const token = jwt.sign({usuario:usuario}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_EXPIRATION_TIME
                    })
                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions);
                    res.render('login', {
                            alert: true,
                            alertTitle: "Successful connection",
                            alertMessage: "¡CORRECT LOGIN!",
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer: 800,
                            ruta: ''
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


//procedure to authenticate
exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuarios WHERE usuario = ?', [decodificada.usuario], (error, results)=>{
                if(!results){return next()}

                row = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        // res.redirect('/') 
        res.redirect('/login')        
    }
} 

//procedure to logout
exports.logout = (req, res) => {
    // res.cookie('jwt', 'logout', {
    //     expires: new Date(Date.now() + 2 * 1000),
    //     httpOnly: true,
    // });
    // res.status(200).redirect("/login");

    res.clearCookie('jwt')   
    return res.redirect('/')
    // return res.redirect('/login')
}