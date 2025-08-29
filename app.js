require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const handDbError = (res, error) =>
{
  console.error('Error de acceso en la bd: ', error);
  res.status(500).json({error: 'Error interno en el servidor'});
}

//Verbos
//GET

app.get('/vehiculos', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM vehiculos');   
    res.status(200).json(rows);
  }catch(error){
    handDbError(res, error);
  }
})

//POST

app.post("/vehiculos", async (req, res) => {
  const {marca, modelo, color, precio, placa} = req.body;
  //TODOS LOS DATOS SON OBLIGATORIOS
  if(!marca || !modelo || !color || !precio || !placa){
    //No se podrá realizar la inserción
    return res.status(400).json({error: "Todos los campos son necesarios"});
  }

  try{
    const [result] = await pool.query("INSERT INTO vehiculos (marca, modelo, color, precio, placa) VALUES (?,?,?,?,?)", 
      [marca, modelo, color, precio, placa]
    );   

    const id = result.insertId;
    res.status(200).json({'id': id});
  }catch(error){
    if(error.code === 'ERR_DUP_ENTRY'){
      return res.status(409).json({error: 'La placa ya existe'}) 
    }
    handDbError(res, error);
  }
})


//PUT

app.put("/vehiculos/:id", async (req, res) => {
  const {id} = req.params; //URL
  const {marca, modelo, color, precio, placa} = req.body;
  //TODOS LOS DATOS SON OBLIGATORIOS
  if(!marca || !modelo || !color || !precio || !placa){
    //No se podrá realizar la inserción
    return res.status(400).json({error: "Todos los campos son necesarios"});
  }

  try{
    const [result] = await pool.query("UPDATE vehiculos SET marca = ?, modelo = ?, color = ?, precio = ?, placa = ? WHERE id = ?", 
      [marca, modelo, color, precio, placa, id]
    );   

    if(result.affectedRows === 0){
      return res.status(404).json({message: 'Vehiculo no existe'})
    }

    res.status(200).json({message: 'Vehiculo actualizado correctamente'})

  }catch(error){
    if(error.code === 'ERR_DUP_ENTRY'){
      return res.status(409).json({error: 'La placa ya existe'}) 
    }
    handDbError(res, error);
  }
})

//DELETE
app.delete("/vehiculos/:id", async(req, res) => {
  const {id} = req.params;
  try{
    const [del] = await pool.query("DELETE FROM vehiculos WHERE id = ?", [id]);

    if(del.affectedRows === 0){
      return res.status(404).json({message: 'Vehiculo no existe'})
    }

    res.status(200).json({message: 'Vehiculo eliminado correctamente'})

  }catch(error){
    handDbError(res, error);
  }
})


//Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});