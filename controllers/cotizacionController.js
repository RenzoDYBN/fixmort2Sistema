//invoke the DB connection
const conexion = require('../database/db')

//procedure to save
exports.saveCotizacion = (req, res) => {
    // const id_representante = req.body.id_representante
    // const dni_representante = req.body.dni_representante
    // const nombre_representante = req.body.nombre_representante
    // const apellido_paterno_representante = req.body.apellido_paterno_representante
    // const apellido_materno_representante = req.body.apellido_materno_representante
    // const correo_representante = req.body.correo_representante
    // const telefono_representante = req.body.telefono_representante
    // const valoress = req.opts;
    // var data = JSON.parse(localStorage.getItem("key name"));
    // const opts =  req.body.valores;
    // console.log(data);   
    console.log(req.storedValue);


    // conexion.query('SELECT * FROM representante WHERE id_representante = ?', [id_representante], (err, results, fields) => {
    //     if (err) {
    //         confirm.log(err);
    //     }
    //     if (results.length > 0) {
    //         return res.render("createRepresentante", {
    //             alert: true,
    //             alertMessage: 'Este Representante ya existe'
    //         });
    //     } 

    //         // INSERTAMOS NUEVO REPRESENTANTE
    //         conexion.query('INSERT INTO representante SET ?', {dni_representante: dni_representante,nombre_representante: nombre_representante ,apellido_paterno_representante:apellido_paterno_representante, apellido_materno_representante: apellido_materno_representante, correo_representante:correo_representante,telefono_representante:telefono_representante}, (error, results) => {
    //         if(error) {
    //         console.error(error)
    //         res.render('representantes', {
    //             alert: true,
    //             alertMessage: 'Este representante ya existe'
    //         })
    //         } else {   
    //         res.redirect('/representantes')
    //      }
    //     }); 
    // });
};

//procedure to update
// exports.updateRepresentante =  (req, res) => {
//     const id_representante = req.body.id_representante

//     conexion.query('UPDATE representante SET ? WHERE id_representante = ?', [req.body, id_representante ], (error, results) => {
//         if(error) {
//             console.error(error)
//         } else {
//             console.log(error);
//             console.log(results);
//             res.redirect('/representantes');
//         }
//     })
// }