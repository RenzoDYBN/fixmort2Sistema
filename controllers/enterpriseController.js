//invoke the DB connection
const conexion = require('../database/db')

//procedure to save
exports.saveEnterprise = (req, res) => {
    const id_ruc = req.body.id_ruc
    const id_representante = req.body.id_representante
    const nombre_empresa = req.body.nombre_empresa
    const numero_contacto = req.body.numero_contacto


    conexion.query('SELECT * FROM empresas WHERE id_ruc = ?', [id_ruc], (err, results, fields) => {
        if (err) {
            confirm.log(err);
        }
        if (results.length > 0) {
            return res.render("createEnterprise", {
                alert: true,
                alertMessage: 'Este RUC ya existe'
            });
        } 

            // INSERTAMOS NUEVA EMPRESA
            conexion.query('INSERT INTO empresas SET ?', {id_ruc: id_ruc,id_representante: id_representante ,nombre_empresa:nombre_empresa, numero_contacto: numero_contacto}, (error, results) => {
            if(error) {
            console.error(error)
            res.render('enterprises', {
                alert: true,
                alertMessage: 'Esta Empresa ya existe'
            })
            } else {   
            res.redirect('/enterprises')
         }
        }); 
    });
};

//procedure to update
exports.updateEnterprise =  (req, res) => {
    // const id_empresas = req.body.id_empresas
    const id_ruc = req.body.id_ruc 
    const id_representante = req.body.id_representante
    const nombre_empresa = req.body.nombre_empresa
    const numero_contacto = req.body.numero_contacto


    conexion.query('UPDATE empresas SET ? WHERE id_ruc = ?', [{id_representante:id_representante,nombre_empresa:nombre_empresa,numero_contacto:numero_contacto}, id_ruc ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            console.log(error);
            console.log(results);
            res.redirect('/enterprises');
        }
    })
}