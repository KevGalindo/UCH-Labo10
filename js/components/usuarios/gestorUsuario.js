
import Servicios from './servicios.js';


class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        this.token = ''; 
        this.usuarios = []; 

        
        this.init();
    }

    login() {
       
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();

      
        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
          
                alert('Usuario o contraseña incorrectos');
            } else {
                if (response.status == 200) {
  
                    alert('¡Login exitoso!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }

    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
s
                console.error('Error al obtener usuarios:', error);
            } else {

                this.renderizarUsuarios(response);
            }
        });
    }

    cleanMain() {
        $("#mainlogin").html("");
    }


    renderizarUsuarios(usuarios) {
        usuarios.forEach(usuario => {
            // Verificar si el usuario es menor de edad
            let colorTexto = usuario.edad < 18 ? 'red' : 'white';
            const usuarioHTML = `
                <div class="usuario" style="color: ${colorTexto};">
                    <div class="nombre" style="font-weight: bold; margin-bottom: 10px;">${usuario.nombre}</div>
                    <div class="foto"><img src="${usuario.foto}" alt="Foto de ${usuario.nombre}" style="max-width: 200px; border-radius: 5px;"></div>
                    <div class="info">
                        <p>Edad: <span style="color: ${colorTexto};">${usuario.edad}</span></p>
                        <p>DNI: <span style="color: ${colorTexto};">${usuario.dni}</span></p>
                        <p>Estado Civil: <span style="color: ${colorTexto};">${usuario.estado_civil}</span></p>
                    </div>
                </div>`;
            $('#mainlogin').append(usuarioHTML);
        });
    }
    
    renderLogin() {
        const templatelogin =
        `<div class="centering">
                <form class="my-form">
                    <div class="login-welcome-row">
                        <!-- optimize the image in production -->
                        <h1>Login!</h1>
                    </div>
            <div class="text-field">
                <label for="email">Email:</label>
                <input
                    aria-label="Email"
                    type="email"
                    id="user"
                    name="email"
                    placeholder="Your Email"
                    required
                >
            </div>
            <div class="text-field">
                <label for="password">Password:</label>
                <input
                    id="pass"
                    type="password"
                    aria-label="Password"
                    name="password"
                    placeholder="Your Password"
                    title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                    required
                >
                
            </div>
            <input type="submit" class="btn" id="btLogin" value="Login" >`;
        $("#mainlogin").append(templatelogin);
    }


    render() {

        this.renderLogin();
    }


    init() {
        this.render();
        $('#btLogin').on('click', () => {
            this.login();
        });
    }
}


export default GestorUsuarios;
