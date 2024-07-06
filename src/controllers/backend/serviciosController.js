const fs = require('fs');
const path = require('path');
const Servicio = require('../../models/backend/servicioModel');
const loadAppHtml = require('../../utils/loadAppHtml');


function ingresarServicio(req, res) {
    const filePath = path.join(__dirname, '../../views/backend/partials/_servicios_form_ingresar.html');
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        loadAppHtml('backend', 'servicios_ingresar', `${process.env.APP_NAME}: Módulo Servicios`, htmlContent, res);
    } catch (err) {
        console.error('Error al leer el archivo HTML:', err);
    }
}

async function agregarServicio(req, res) {
    let user = req.session.user;
    const { nombre_servicio, descripcion, valor, estado } = req.body;

    if (!nombre_servicio || !descripcion || !valor || !estado) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const servicio = new Servicio(null, user.id, user.id, nombre_servicio, descripcion, valor, estado);
    try {
        const resultado = await servicio.agregarServicio();
        res.status(201).json({ message: 'Servicio agregado correctamente', servicio: resultado });
    } catch (error) {
        console.error('Error al agregar servicio en el controlador:', error);
        res.status(500).json({ message: 'Error al agregar servicio' });
    }
}

async function listarServicios(req, res) {
    try {
        const servicios = await Servicio.listarServicios();
        let html;
        if (servicios.length > 0) 
        {
            html = '<h3>Listado de Servicios</h3>';
            html += '<table class="">' +
                        '<tr>' +
                            '<th>#</th>' +
                            '<th>Nombre de Servicio</th>' +
                            '<th>Descripción de Servicio</th>' +
                            '<th>Valor</th>' +
                            '<th>Estado</th>' +
                            '<th>Creado por</th>' +
                            '<th>Editado por</th>' +
                            '<th>Operaciones</th>' +
                        '<tr>';
            servicios.forEach(servicio => {
                html += `<tr>` +
                            `<td> ${servicio.id} </td>` +
                            `<td> ${servicio.nombre_servicio} </td>` +
                            `<td> ${servicio.descripcion} </td>` +
                            `<td> ${servicio.valor} </td>`;

                            let textoEstado = (servicio.estado == '1') ? 'Habilitado' : 'Deshabilitado';

                    html += `<td> ${textoEstado} </td>` +
                            '<td> </td>' +
                            '<td> </td>' +
                            `<td><a class="btn btn-primary" href='/sitio-admin/modulo-editar-servicio/${servicio.id}'> Editar </a> </td>` +
                        `</tr>`;
            });
            html += '</table>';
        } else {
            html = '<h3>Sin Servicios</h3>';
        }

        loadAppHtml('backend', 'servicios_listar', `${process.env.APP_NAME}: Módulo Servicios`, html, res);
    } catch (error) {
        console.error('Error al listar servicios en el controlador:', error);
        res.status(500).send('Error al obtener la lista de servicios');
    }
}

async function editarServicio(req, res) {
    const servicioId = req.params.id
    const servicio = new Servicio(servicioId)
    await servicio.buscarServicio();
    const filePath = path.join(__dirname, '../../views/backend/partials/_servicios_form_editar.html');
    let options;
    if (servicio.estado == '1') {
        options = `<option value="1" selected>Habilitado</option>` +
            `<option value="0">Deshabilitado</option>`;

    } else {
        options = `<option value="1">Habilitado</option>` +
            `<option value="0" selected>Deshabilitado</option>`;
    }
    try {
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        htmlContent = htmlContent.replace('{{ id }}', servicio.id);
        htmlContent = htmlContent.replace('{{ nombre_servicio }}', servicio.nombre_servicio);
        htmlContent = htmlContent.replace('{{ descripcion }}', servicio.descripcion);
        htmlContent = htmlContent.replace('{{ valor }}', servicio.valor);
        htmlContent = htmlContent.replace('{{ options }}', options);
        loadAppHtml('backend', 'servicio_editar', `${process.env.APP_NAME}: Módulo Servicios`, htmlContent, res);
    } catch (error) {
        console.error('Error al leer el archivo HTML:', err);
    }
}

async function guardarEdicionS(req, res) {
    let user = req.session.user;
    const { id, nombre_servicio, descripcion, valor, estado } = req.body;
    const servicio = new Servicio(id, user.id, user.id, nombre_servicio, descripcion, valor, estado);
    const respuesta = servicio.editarServicio();
    if (respuesta) {
        req.flash('msg', 'Se ha editado');
        res.status(200).json({ message: `Servicio ${nombre_servicio} editado correctamente.` });
    } else {
        req.flash('msg', 'No se ha podido editar.');
        res.status(404).json({ message: `No se pudo editar el servicio ${nombre_servicio}.` });
    }
}

module.exports = { ingresarServicio, listarServicios, editarServicio, guardarEdicionS, agregarServicio };
