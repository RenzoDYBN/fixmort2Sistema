//invoke the DB connection
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

//procedure to save
exports.saveUser = async(req, res) => {
    const dni_persona = req.body.dni_persona
    const pass = req.body.pass
    const cpass = req.body.cpass
    const codigo_rol = req.body.codigo_rol
    const estado_usuario = req.body.estado_usuario

    let passHash = await bcryptjs.hash(pass, 10)

    conexion.query('SELECT nombre_persona,apellido_paterno,apellido_materno FROM personas WHERE dni_persona = ?', [dni_persona], (err, results, fields) => {
        if (err) {
            confirm.log(err);
        }
        if (results.length > 0) {
            return res.render("createUser", {
                alert: true,
                alertMessage: 'Este Usuario(DNI) ya existe'
            });
        } else if (pass !== cpass) {
            return res.render("createUser", { alert: true,
                alertMessage: 'Las contraseñas no coinciden' })
        }
            data1 = JSON.stringify(results[0].nombre_persona);
            data2 = JSON.stringify(results[0].apellido_paterno);
            data3 = JSON.stringify(results[0].apellido_materno);

            let result1 = data1.substring(2, 1);
            const result2 = data2.slice(1, -1)
            console.log('apellido_paterno recortado:' + result2);
            let result3 = data3.substring(2, 1);

            const nombre_usuario_mayusculas = result1.concat(result2, result3);
            var nombre_usuario = nombre_usuario_mayusculas.toLowerCase();
            console.log('USUARIO A CREAR:' + nombre_usuario);

            //INSERTAMOS AL NUEVO USUARIO

            //console.log(name + " - " + email + " - " + passHash)
            conexion.query('INSERT INTO usuarios SET ?', {dni_persona: dni_persona,codigo_rol: Number(codigo_rol) ,nombre_usuario:nombre_usuario, pass: passHash, estado_usuario: "Activo"}, (error, results) => {
            if(error) {
            console.error(error)
            res.render('register', {
                alert: true,
                alertMessage: 'Este usuario ya existe'
            })
            } else {   
            res.redirect('/')
         }
        }); 
});
};

//procedure to update
exports.updateUser =  async(req, res) => {
    const usuario = req.body.usuario
    const dni_persona = req.body.dni_persona
    const pass = req.body.pass
    const codigo_rol = req.body.codigo_rol
    const estado_usuario = req.body.estado_usuario

    let passHash = await bcryptjs.hash(pass, 10)
    conexion.query('UPDATE usuarios SET ? WHERE usuario = ?', [{ dni_persona:dni_persona, pass:passHash, codigo_rol:codigo_rol, estado_usuario:estado_usuario}, usuario ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}