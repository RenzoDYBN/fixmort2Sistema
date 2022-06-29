//invoke the DB connection
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

exports.savePerson = (req, res) => {
    const dni_persona = req.body.dni_persona
    const nombre_persona = req.body.nombre_persona
    const apellido_paterno = req.body.apellido_paterno
    const apellido_materno = req.body.apellido_materno
    const telefono = req.body.telefono
    const correo_electronico = req.body.correo_electronico
    const direccion_persona = req.body.direccion_persona

    conexion.query('SELECT * FROM personas WHERE dni_persona = ?', [dni_persona], (err, results, fields) => {
        if (err) {
            confirm.log(err);
        }
        if (results.length > 0) {
            return res.render("createPerson", {
                alert: true,
                alertMessage: 'La persona ya existe'
            });
        } 

            // INSERTAMOS NUEVA PERSONA
            conexion.query('INSERT INTO personas SET ?', {dni_persona: dni_persona,nombre_persona: nombre_persona ,apellido_paterno:apellido_paterno, apellido_materno: apellido_materno, telefono: telefono, correo_electronico:correo_electronico, direccion_persona: direccion_persona}, (error, results) => {
            if(error) {
            console.error(error)
            res.render('persons', {
                alert: true,
                alertTitle: "Successful connection",
                alertMessage: "¡CORRECT LOGIN!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 800,
                ruta: ''
                //alert: true,
                //alertMessage: 'Esta persona ya existe'
            })
            } else {   
            res.redirect('/persons')
         }
        }); 
    });
};

exports.updatePerson =  (req, res) => {
    const dni_persona = req.body.dni_persona
    const nombre_persona = req.body.nombre_persona
    const apellido_paterno = req.body.apellido_paterno
    const apellido_materno = req.body.apellido_materno
    const telefono = req.body.telefono
    const correo_electronico = req.body.correo_electronico
    const direccion_persona = req.body.direccion_persona

    conexion.query('UPDATE personas SET ? WHERE dni_persona = ?', [{ nombre_persona:nombre_persona, apellido_paterno :apellido_paterno, apellido_materno:apellido_materno,telefono:telefono,correo_electronico:correo_electronico,direccion_persona:direccion_persona }, dni_persona], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            console.log(error);
            console.log(results);
            res.redirect('/persons');
        }
    })
}

/*
//procedure to update
exports.updatePerson =  async(req, res) => {
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
}*/