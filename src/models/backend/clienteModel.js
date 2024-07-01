const DataBase = require('../conexionModel');

class Cliente {
    constructor(id, id_user_created, id_user_updated, nombres, direccion, correo, telefono, estado) {
        this.id = id;
        this.id_user_created = id_user_created;
        this.id_user_updated = id_user_updated;
        this.nombres = nombres;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
        this.estado = estado;
    }

    async agregarCliente() {
        const db = DataBase.getInstance();
        try {
            const query = 'INSERT INTO clientes (id_user_created, id_user_updated, nombres, direccion, correo, telefono, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [this.id_user_created, this.id_user_updated, this.nombres, this.direccion, this.correo, this.telefono, this.estado];

            console.log('Ejecutando query:', query);
            console.log('Con parámetros:', params);

            const resultado = await db.ejecutarQuery(query, params);
            console.log('Cliente agregado correctamente:', resultado);
            return resultado;
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            throw error;
        }
    }

    static async listarClientes() {
        const db = DataBase.getInstance(); 
        try {
            const query = 'SELECT * FROM clientes';
            const clientes = await db.ejecutarQuery(query);
            console.log('Clientes encontrados:', clientes);
            return clientes;
        } catch (error) {
            console.error('Error al listar clientes:', error);
            throw error;
        }
    }

    async buscarCliente()
    {
        const db = DataBase.getInstance(); 
        try {
            const query = 'SELECT * FROM clientes WHERE id=?';
            const cliente = await db.ejecutarQuery(query,[this.id]);
            console.log('Cliente encontrado:', cliente);
            if (cliente.length > 0) {
                const { id, nombres, direccion, correo, telefono, estado } = cliente[0];
                this.id = id;
                this.nombres = nombres;
                this.direccion = direccion;
                this.correo = correo;
                this.telefono = telefono;
                this.estado = estado;
            }
            return cliente;
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            throw error;
        }
    }

    async editarCliente()
    {
        const db = DataBase.getInstance();
        try {
            const query = 'UPDATE clientes SET nombres=?, direccion=?, correo=?, telefono=?, estado=?  WHERE id=?';
            const resultado = await db.ejecutarQuery(query,[
                this.nombres, 
                this.direccion, 
                this.correo, 
                this.telefono, 
                this.estado, 
                this.id
            ]);
            if (resultado.affectedRows > 0) {
                console.log('Cliente actualizado con éxito');
                return true;
            } else {
                console.log('No se encontró el cliente con el ID especificado o no hubo cambios en los datos');
                return false;
            }
        } catch (error) {
            console.error('Error al buscar el cliente:', error);
            throw error;
        }
    }
}

module.exports = Cliente