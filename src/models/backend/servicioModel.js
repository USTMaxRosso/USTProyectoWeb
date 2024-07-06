const DataBase = require('../conexionModel');

class Servicio {
    constructor(id, id_user_created, id_user_updated, nombre_servicio, descripcion, valor, estado) {
        this.id = id;
        this.id_user_created = id_user_created;
        this.id_user_updated = id_user_updated;
        this.nombre_servicio = nombre_servicio;
        this.descripcion = descripcion;
        this.valor = valor;
        this.estado = estado;
    }

    async agregarServicio() {
        const db = DataBase.getInstance();
        try {
            const query = 'INSERT INTO servicios (id_user_created, id_user_updated, nombre_servicio, descripcion, valor, estado) VALUES (?, ?, ?, ?, ?, ?)';
            const params = [this.id_user_created, this.id_user_updated, this.nombre_servicio, this.descripcion, this.valor, this.estado];

            console.log('Ejecutando query:', query);
            console.log('Con parámetros:', params);

            const resultado = await db.ejecutarQuery(query, params);
            console.log('Servicio agregado correctamente:', resultado);
            return resultado;
        } catch (error) {
            console.error('Error al agregar servicio:', error);
            throw error;
        }
    }

    static async listarServicios() {
        const db = DataBase.getInstance(); 
        try {
            const query = 'SELECT * FROM servicios';
            const servicios = await db.ejecutarQuery(query);
            console.log('Servicios encontrados:', servicios);
            return servicios;
        } catch (error) {
            console.error('Error al listar servicios:', error);
            throw error;
        }
    }

    async buscarServicio()
    {
        const db = DataBase.getInstance(); 
        try {
            const query = 'SELECT * FROM servicios WHERE id=?';
            const servicio = await db.ejecutarQuery(query,[this.id]);
            console.log('Servicio encontrado:', servicio);
            if (servicio.length > 0) {
                const { id, nombre_servicio, descripcion, valor, estado} = servicio[0];
                this.id = id;
                this.nombre_servicio = nombre_servicio;
                this.descripcion = descripcion;
                this.valor = valor;
                this.estado = estado;
            }
            return servicio;
        } catch (error) {
            console.error('Error al buscar el servicio:', error);
            throw error;
        }
    }

    async editarServicio()
    {
        const db = DataBase.getInstance();
        try {
            const query = 'UPDATE servicios SET nombre_servicio=?, descripcion=?, valor=?, estado=?  WHERE id=?';
            const resultado = await db.ejecutarQuery(query,[
                this.nombre_servicio, 
                this.descripcion, 
                this.valor, 
                this.estado, 
                this.id
            ]);
            if (resultado.affectedRows > 0) {
                console.log('Servicio actualizado con éxito');
                return true;
            } else {
                console.log('No se encontró el servicio con el ID especificado o no hubo cambios en los datos');
                return false;
            }
        } catch (error) {
            console.error('Error al buscar el servicio:', error);
            throw error;
        }
    }
}

module.exports = Servicio;