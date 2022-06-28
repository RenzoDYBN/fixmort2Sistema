//invoke the DB connection
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

//procedure to save
/*
exports.saveUser_renzo = async(req, res) => {
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
*/





//exports.searchuser = (req, res) => {
exports.saveUser = (req, res) => {
    //var action = req.body.action;
   // if (action == 'Add') {

        var dni_persona = req.body.dni_persona;
        var codigo_rol = req.body.codigo_rol;
        var password = req.body.pass;
        var cpassword = req.body.cpass;
        //var flag = 1;

        //console.log(action);
        //CONSULTA SI EL DNI EXISTE EN LA TABLA PERSONAS
        conexion.query("select * from personas where dni_persona=?", [dni_persona],
        async(error, result) => {
            if (error) {
                confirm.log(error);
            }
            console.log("result length: "+ result.length);
            if (result.length == 0) {
                console.log("El DNI NO existe en la tabla PERSONAS add termina");
                //confirm.log(error);
                return res.render("createUser", { alert: true,
                    alertMessage: 'El DNI NO existe en la tabla PERSONAS add termina' })
            }else{                  
                console.log("El DNI existe en la tabla personas");
                conexion.query("select * from usuarios where dni_persona=?", [dni_persona],
                async(error, result) => {
                   if (error) {
                      confirm.log(error);
                   }
                   if (result.length == 0) {  
                       if (password == cpassword) {               
                           let hashedPassword = await bcryptjs.hash(password, 10);
                           console.log(hashedPassword);   
                           adduser(hashedPassword);   
                       }else{
                           console.log("Las contraseñas no coinciden");
                           return res.render("createUser", { alert: true,
                            alertMessage: 'Las contraseñas no coinciden' })
                        }      
                   }else{
                      console.log("Ya existe usuario con ese DNI");
                      return res.render("createUser", { alert: true,
                        alertMessage: 'Ya existe usuario con ese DNI' })
                    }
                })  
            }
        });  
    
        function adduser(hashedPassword) {
             //VALIDACION PARA LA CREACION DE EL USUARIO primera letra de primer nombre + primer apellido + primera letra de 2do apellido ( Jose Manuel Perez Ramirez, jperezr)
             conexion.query('SELECT nombre_persona,apellido_paterno,apellido_materno FROM personas WHERE dni_persona = ?',
        [dni_persona],(err, results) => {
            if(!err){
              
              //res.json(rows);
              data1 = JSON.stringify(results[0].nombre_persona); 
              data2 = JSON.stringify(results[0].apellido_paterno); 
              data3 = JSON.stringify(results[0].apellido_materno);            
              console.log('nombre_persona:' + data1);
              console.log('apellido_paterno:' + data2);
              console.log('apellido_materno:' + data3);

                //res.json(rows);
                data1 = JSON.stringify(results[0].nombre_persona);
                data2 = JSON.stringify(results[0].apellido_paterno);
                data3 = JSON.stringify(results[0].apellido_materno);
                console.log('nombre_persona:' + data1);
                console.log('apellido_paterno:' + data2);
                console.log('apellido_materno:' + data3);

                let result1 = data1.substring(2, 1);
                const result2 = data2.slice(1, -1)
                console.log('apellido_paterno recortado:' + result2);
                let result3 = data3.substring(2, 1);

                console.log('nombre_persona:' + result1);
                console.log('apellido_paterno:' + result2);
                console.log('apellido_materno:' + result3);

                const nombre_usuario_mayusculas = result1.concat(result2, result3);
                var nombre_usuario = nombre_usuario_mayusculas.toLowerCase();
                console.log('USUARIO A CREAR:' + nombre_usuario);

                //INSERTAMOS AL NUEVO USUARIO
                var query = `INSERT INTO usuarios (dni_persona, codigo_rol, nombre_usuario, pass, estado_usuario) 
             VALUES ("${dni_persona}", "${codigo_rol}", "${nombre_usuario}", "${hashedPassword}", "Activo")
             `;
             conexion.query(query, function(error, data) {
                    if(error) {
                    console.error(error)
                    res.render('users', {
                        alert: true,
                        alertMessage: 'Este usuario ya existe'
                    })
                    } else {   
                    res.redirect('/users')
                 }
                });


            } else {
                console.log(err);
            }
      
          });
        }
   // }

};

//UPADATE DE USUARIO
exports.updateUser =  async(req, res) => {
    const usuario = req.body.usuario
    const dni_persona = req.body.dni_persona
    const pass = req.body.pass
    const codigo_rol = req.body.codigo_rol
    const estado_usuario = req.body.estado_usuario

    let passHash = await bcryptjs.hash(pass, 10)
    conexion.query('UPDATE usuarios SET ? WHERE usuario = ?', [{pass:passHash, codigo_rol:codigo_rol, estado_usuario:estado_usuario}, usuario ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/users');
        }
    })
}