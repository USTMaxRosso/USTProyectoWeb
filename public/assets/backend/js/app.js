const formLogin = document.getElementById('formLogin');
const formUpdate = document.getElementById('formUpdate');
const formUpload = document.getElementById('formUpload'); 

if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
       
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
    
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) 
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); 
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { 
                console.log('Respuesta del servidor:', data);
    
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error); 
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}

if (formUpdate) {
    formUpdate.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(this);

        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
        fetch('/sitio-admin/modulo-editar-cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) 
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); 
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { 
                console.log('Respuesta del servidor:', data);
    
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}

if (formUpload) {
    formUpload.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(this);
       
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', plainFormData);
        
        fetch('/sitio-admin/modulo-ingresar-clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plainFormData) 
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (response.ok) {
                return response.json(); 
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data) { 
                console.log('Respuesta del servidor:', data);
    
                if (data.message) {
                    document.getElementById('mensajeError').textContent = data.message;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error); 
            if (error.message) {
                document.getElementById('mensajeError').textContent = error.message;
            }
        });
    });
}