const mysql = require('mysql');
class DataBase {
    constructor(){
        // Configuración de la conexión a la base de datos
        this.conexion = mysql.createConnection({
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            password:process.env.DB_PASS,
            database:process.env.DB_DATABASE
        });

        //Conexion a la base de datos
        this.conectar();
    }

    conectar(){
        this.conexion.connect((error) => {
            if (error) {
                console.error('Error al conectar a la base de datos:', error);
                return;
              }
              console.log('\nConexión exitosa a la base de datos MySQL.\n');
        });
    }
    cerrarConexion(){
        this.conexion.end((error) => {
            if (error) {
                console.error('Error al cerrar la conexión a la base de datos:', error);
                return;
            }
            console.log('Conexión a la base de datos cerrada correctamente.\n');
        });
    }
    
    // Método para ejecutar consultas SQL
    async ejecutarQuery(query, params) {
        return new Promise((resolve, reject) => {
            this.conexion.query(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new DataBase();
        }
        return this.instance;
    }
}

module.exports = DataBase;