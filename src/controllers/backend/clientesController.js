const fs = require('fs');
const path = require('path');
const Cliente = require('../../models/backend/clienteModel');
const loadAppHtml = require('../../utils/loadAppHtml');


function ingresarCliente(req, res) {
    const filePath = path.join(__dirname, '../../views/backend/partials/_clientes_form_ingresar.html');
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        loadAppHtml('backend', 'clientes_ingresar', `${process.env.APP_NAME}: Módulo Clientes`, htmlContent, res);
    } catch (err) {
        console.error('Error al leer el archivo HTML:', err);
    }
}

async function agregarCliente(req, res) {
    let user = req.session.user;
    const { nombres, direccion, correo, telefono, estado } = req.body;

    console.log('Datos recibidos del formulario:', req.body);

    if (!nombres || !direccion || !correo || !telefono || !estado) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const cliente = new Cliente(null, user.id, user.id, nombres, direccion, correo, telefono, estado);
    try {
        const resultado = await cliente.agregarCliente();
        console.log('Resultado de agregarCliente:', resultado);
        res.status(201).json({ message: 'Cliente agregado correctamente', cliente: resultado });
    } catch (error) {
        console.error('Error al agregar cliente en el controlador:', error);
        res.status(500).json({ message: 'Error al agregar cliente' });
    }
}

async function listarClientes(req, res) {
    try {
        const clientes = await Cliente.listarClientes();
        let html;
        if(clientes.length > 0)
        {
            html = '<h3>Listado de Clientes</h3>';
            html += '<table class="">'+
                        '<tr>'+
                            '<th>#</th>'+
                            '<th>Nombres</th>'+
                            '<th>Dirección</th>'+
                            '<th>Correo</th>'+
                            '<th>Teléfono</th>'+
                            '<th>Estado</th>'+
                            '<th>Creado por</th>'+
                            '<th>Editado por</th>'+
                            '<th>Operaciones</th>'+
                        '<tr>';
            clientes.forEach(cliente => {
                html += `<tr>`+
                            `<td> ${ cliente.id } </td>`+
                            `<td> ${ cliente.nombres } </td>`+
                            `<td> ${ cliente.direccion } </td>`+
                            `<td> ${ cliente.correo } </td>`+
                            `<td> ${ cliente.telefono } </td>`;

                            let textoEstado = (cliente.estado == '1') ? 'Habilitado' : 'Deshabilitado';

                    html += `<td> ${ textoEstado } </td>`+
                            '<td> </td>'+
                            '<td> </td>'+
                            `<td><a class="btn btn-primary" href='/sitio-admin/modulo-editar-cliente/${ cliente.id }'> Editar </a> </td>`+
                        `</tr>`;
            });
            html += '</table>';
        }else{
            html = '<h3>Sin Clientes</h3>';
        }
        

        // Llama a la función para cargar la vista con los clientes listados
        loadAppHtml('backend', 'clientes_listar', `${process.env.APP_NAME}: Módulo Clientes`, html, res);
    } catch (error) {
        console.error('Error al listar clientes en el controlador:', error);
        // Manejo de errores: podrías enviar un mensaje de error o renderizar una página de error
        res.status(500).send('Error al obtener la lista de clientes');
    }
}

async function editarCliente(req, res){
    const clienteId = req.params.id
    const cliente = new Cliente(clienteId)
    await cliente.buscarCliente();
    const filePath = path.join(__dirname, '../../views/backend/partials/_clientes_form_editar.html');
    let options;
    if (cliente.estado == '1')
    {
        options = `<option value="1" selected>Habilitado</option>`+
                   `<option value="0">Deshabilitado</option>`; 

    }else{
        options = `<option value="1">Habilitado</option>`+
                  `<option value="0" selected>Deshabilitado</option>`; 
    }
    try {
        // Lee el contenido del archivo HTML
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        htmlContent = htmlContent.replace('{{ id }}', cliente.id);
        htmlContent = htmlContent.replace('{{ nombres }}', cliente.nombres);
        htmlContent = htmlContent.replace('{{ direccion }}', cliente.direccion);
        htmlContent = htmlContent.replace('{{ correo }}', cliente.correo);
        htmlContent = htmlContent.replace('{{ telefono }}', cliente.telefono);
        htmlContent = htmlContent.replace('{{ options }}', options);
        loadAppHtml('backend', 'cliente_editar', `${process.env.APP_NAME}: Módulo Clientes`, htmlContent, res);
    } catch (error) {
        console.error('Error al leer el archivo HTML:', err);
    }
    
}

async function guardarEdicion(req, res)
{
    let user = req.session.user;
    const { id, nombres, direccion, correo, telefono, estado } = req.body;
    const cliente = new Cliente(id, user.id, user.id, nombres, direccion, correo, telefono, estado);
    const respuesta = cliente.editarCliente();
    if (respuesta)
    {
        req.flash('msg', 'Se ha editado');
        res.status(200).json({ message: `Cliente ${nombres} editado correctamente.` });
    }else{
        req.flash('msg', 'No se ha podido editar.');
        res.status(404).json({ message: `No se pudo editar el cliente ${nombres}.` });
    }
    
}

module.exports = { ingresarCliente, listarClientes, editarCliente, guardarEdicion, agregarCliente };