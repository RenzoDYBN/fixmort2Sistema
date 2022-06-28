const conexion = require('../database/db')


exports.addPiece = (req, res) => {

        var nombre_pieza = req.body.nombre_pieza;
        var descripcion_pieza = req.body.descripcion_pieza;
        var stock_piezas = req.body.stock_pieza;

   conexion.query('select * from almacen where nombre_pieza = ?', [nombre_pieza],
        (error, result) => {
            if (result.length > 0) {
              console.log(result.length);
                return res.render("createStore", { msg: "El nombre de pieza que intenta registrar ya existe", msg_type: "error" })
            } else {
              console.log(result);
              conexion.query("insert into almacen set ?", { nombre_pieza: nombre_pieza, descripcion_pieza: descripcion_pieza, stock_piezas: stock_piezas },
                    (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result);
                            res.redirect('/store');
                            //return res.render("createStore", { msg: "Registro Exitoso", msg_type: "good" })
                        }
                    })
            }
        });
};

exports.updatePiece = async(req, res) => {

    const id_pieza_buscada = req.body.id_pieza;
    console.log("piesa buscada: "+ id_pieza_buscada + req.body.nombre_pieza)
    conexion.query('UPDATE almacen set ? WHERE id_pieza = ?', [{ nombre_pieza:req.body.nombre_pieza, descripcion_pieza :req.body.descripcion_pieza, stock_piezas:req.body.stock_piezas}, id_pieza_buscada], (error, rows, fields) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/store');
        }
    });

}

//LA CONSULTA SE REALIZARA POR EL ID_PIEZAS Y TRAERA UN UNICO REGISTRO
/*
exports.searchPiece = async(req, res) => {
    try {
        const id_pieza = "1";
        db.query('SELECT * FROM almacen WHERE id_pieza = ? ', [id_pieza], (err, rows, fields) => {
            if (!err) {
                console.log('ID consultada:' + err)
                res.json(rows);

            } else {
                console.log('NO SE ENCONTRO LA ID_PIEZA')
                console.log(err);
            }

        });
    } catch (error) {
        console.log(error);
    }
}
*/