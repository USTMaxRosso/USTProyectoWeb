const fs = require('fs');
const path = require('path');

function loadAppHtml(type, pageName, titlePage, contenido, res) {
    const basePath = path.join(__dirname, `../views/${type}`);

    fs.readFile(path.join(basePath, 'layouts/app.html'), 'utf8', (err, appHtml) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Error interno del servidor');
            return;
        }

        fs.readFile(path.join(basePath, 'partials/menu.html'), 'utf8', (err, menuHtml) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Error interno del servidor');
                return;
            }

            fs.readFile(path.join(basePath, 'pages', `${pageName}.html`), 'utf8', (err, pageHtml) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Error interno del servidor');
                    return;
                }

                appHtml = appHtml.replace('{{ title }}', titlePage);
                appHtml = appHtml.replace('{{ menu }}', menuHtml);
                appHtml = appHtml.replace('{{ main }}', pageHtml);

                appHtml = appHtml.replace('{{ contenido }}', contenido);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(appHtml);
            });
        });
    });
}

module.exports = loadAppHtml;
