const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() => {
    try{
        //Linea de conexion de mongoose
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
            //Linea que sume xq en el otro proyecto me tiraba un error
            //useCreateIndex: true
        });

        console.log('DB online')
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar Base de Datos')
    }
}

module.exports = {
    dbConnection
}