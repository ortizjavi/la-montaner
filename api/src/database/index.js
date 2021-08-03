const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        //Linea de conexion de mongoose
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            keepAlive: true, 
            keepAliveInitialDelay: 300000
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