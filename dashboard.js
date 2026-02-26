API_URL = "https://caso4-ticketsdb.onrender.com/api";

let globalClientes = [] , globalTecnicos = [] , globalTickets= [];

document.addEventListener('DOMContentLoaded', async () =>{
    usuario = JSON.parse(localStorage.getItem('usuario'));
    if(!usuario) return window.location.href = 'index.html';

    document.getElementById('bienvenido-user').textContent = `Bienvenido ${usuario.nombre} ${usuario.apellido} `;
    await obtenerTodo();
});


async function obtenerTodo() {
    await listarClientes();
    await listarTecnicos();
    await listarTickets();
}

// ========== CLIENTES ==========

async function listarClientes() {
    globalClientes = await(await fetch(`${API_URL}/clientes`)).json();

    document.getElementById('tabla-clientes').innerHTML = globalClientes.map(cli =>` 
        <tr>
            <td>${cli.cedula}</td>
            <td>${cli.nombre}</td>
            <td>${cli.apellido}</td>
            <td>${cli.ciudad}</td>
            <td>${cli.email}</td>
            <td>${cli.direccion}</td>
            <td>${cli.telefono}</td>
            <td>${cli.fecha_nacimiento ? cli.fecha_nacimiento.split('T') [0] : 'S/F'}</td>
            <td>${cli.dependencia}</td>
            <td>
                <button class="btn-edit" onClick="agregarClientes('${cli._id}')">Editar</button>
                <button class="btn-delete" onClick="eliminar('clientes','${cli._id}')">Eliminar</button>
            </td>
        </tr>`
    ).join('')

    document.getElementById('ti-cliente').innerHTML = '<option value="">Seleccionar Cliente</option>' +
    globalClientes.map(c => `<option value='${c._id}'>${c.nombre} ${c.apellido}</option>`).join('');
}

document.getElementById('form-clientes').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const id = document.getElementById('cli._id').value;
    const body= {
        cedula :  document.getElementById('cli-cedula').value,
        nombre :  document.getElementById('cli-nombre').value,
        apellido :  document.getElementById('cli-apellido').value,
        ciudad :  document.getElementById('cli-ciudad').value,
        email :  document.getElementById('cli-email').value,
        direccion :  document.getElementById('cli-direccion').value,
        telefono :  document.getElementById('cli-telefono').value,
        fecha_nacimiento :  document.getElementById('cli-fecha').value,
        dependencia :  document.getElementById('cli-dependencia').value
    }

    await fetch(`${API_URL}/clientes${id ? '/'+id : id}`,{
        method: id ? 'PUT': 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    });

    e.target.reset();
    document.getElementById('cli._id').value = '';
    await obtenerTodo();
});

function agregarClientes(id){
    const c = globalClientes.find(x=> x._id === id);
    if(!c) return

    document.getElementById('cli._id').value = c._id;
    document.getElementById('cli-cedula').value = c.cedula;
    document.getElementById('cli-nombre').value = c.nombre;
    document.getElementById('cli-apellido').value = c.apellido;
    document.getElementById('cli-ciudad').value = c.ciudad;
    document.getElementById('cli-email').value = c.email;
    document.getElementById('cli-direccion').value = c.direccion;
    document.getElementById('cli-telefono').value = c.telefono;
    document.getElementById('cli-fecha').value = c.fecha_nacimiento ? c.fecha_nacimiento.split('T')[0]: '';
    document.getElementById('cli-dependencia').value = c.dependencia;

    window.scrollTo(0,0);
}

// ========== TECNICOS ==========

async function listarTecnicos() {
    globalTecnicos = await(await fetch(`${API_URL}/tecnicos`)).json();

    document.getElementById('tabla-tecnicos').innerHTML = globalTecnicos.map(tec =>` 
        <tr>
            
            <td>${tec.nombre}</td>
            <td>${tec.apellido}</td>
            <td>${tec.cedula}</td>
            <td>${tec.fecha_nacimiento ? tec.fecha_nacimiento.split('T') [0] : 'S/F'}</td>
            <td>${tec.genero}</td>
            <td>${tec.ciudad}</td>
            <td>${tec.direccion}</td>
            <td>${tec.telefono}</td>
            <td>${tec.email}</td>
            
            <td>
                <button class="btn-edit" onClick="agregarTecnicos('${tec._id}')">Editar</button>
                <button class="btn-delete" on onClick="eliminar('tecnicos','${tec._id}')">Eliminar</button>
            </td>
        </tr>`
    ).join('')

    document.getElementById('ti-tecnico').innerHTML = '<option value="">Seleccionar Tecnico</option>' +
    globalTecnicos.map(t => `<option value='${t._id}'>${t.nombre}</option>`).join('');
}

document.getElementById('form-tecnicos').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const id = document.getElementById('tec._id').value;
    const body= {
        nombre :  document.getElementById('tec-nombre').value,
        apellido :  document.getElementById('tec-apellido').value,
        cedula :  document.getElementById('tec-cedula').value,
        fecha_nacimiento :  document.getElementById('tec-fecha').value,
        genero :  document.getElementById('tec-genero').value,
        ciudad :  document.getElementById('tec-ciudad').value,
        direccion :  document.getElementById('tec-direccion').value,
        telefono :  document.getElementById('tec-telefono').value,
        email :  document.getElementById('tec-email').value
    }

    await fetch(`${API_URL}/tecnicos${id ? '/'+id : id}`,{
        method: id ? 'PUT': 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    });

    e.target.reset();
    document.getElementById('tec._id').value = '';
    await obtenerTodo();
});

function agregarTecnicos(id){
    const t = globalTecnicos.find(x=> x._id === id);
    if(!t) return

    document.getElementById('tec._id').value = t._id;
    
    document.getElementById('tec-nombre').value = t.nombre;
    document.getElementById('tec-apellido').value = t.apellido;
    document.getElementById('tec-cedula').value = t.cedula;
    document.getElementById('tec-fecha').value = t.fecha_nacimiento ? t.fecha_nacimiento.split('T')[0]: '';
    document.getElementById('tec-genero').value = t.genero;
    document.getElementById('tec-ciudad').value = t.ciudad;
    document.getElementById('tec-direccion').value = t.direccion;
    document.getElementById('tec-telefono').value = t.telefono;
    document.getElementById('tec-email').value = t.email;
    window.scrollTo(0,0);
}

// ========== TICKETS ==========


async function listarTickets() {
    globalTickets = await(await fetch(`${API_URL}/tickets`)).json();

    document.getElementById('tabla-tickets').innerHTML = globalTickets.map(ti =>{
        const cli = typeof ti.id_cliente === 'object' ? ti.id_cliente : globalClientes.find(c => c._id === ti.id_cliente);
        const tec = typeof ti.id_tecnico === 'object' ? ti.id_tecnico : globalTecnicos.find(t => t._id === ti.id_tecnico);
        return ` 
        <tr>
            <td>${ti.codigo}</td>
            <td>${ti.descripcion}</td>
            <td>${cli ? cli.nombre +' '+ cli.apellido : "No registrado en el Sistema"}</td>
            <td>${tec ? tec.nombre +' '+ tec.apellido : "No registrado en el Sistema"}</td>
            <td>
                <button class="btn-edit" onClick="agregarTickets('${ti._id}')">Editar</button>
                <button class="btn-delete" on onClick="eliminar('tickets','${ti._id}')">Eliminar</button>
            </td>
        </tr>`
    }).join('');
}

document.getElementById('form-tickets').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const id = document.getElementById('ti._id').value;
    const body= {
        codigo :  document.getElementById('ti-codigo').value,
        descripcion :  document.getElementById('ti-descripcion').value,
        id_cliente :  document.getElementById('ti-cliente').value,
        id_tecnico :  document.getElementById('ti-tecnico').value
    }
    
    if(!body.id_cliente || !body.id_tecnico) return alert('Seleccione CLiente y Tecnico');

    await fetch(`${API_URL}/tickets${id ? '/'+id : id}`,{
        method: id ? 'PUT': 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    });

    e.target.reset();
    document.getElementById('ti._id').value = '';
    await obtenerTodo();
});

function agregarTickets(id){
    const ti = globalTickets.find(x=> x._id === id);
    if(!ti) return

    document.getElementById('ti._id').value = ti._id;
    document.getElementById('ti-codigo').value = ti.codigo;
    document.getElementById('ti-descripcion').value = ti.descripcion;
    document.getElementById('ti-cliente').value = ti.id_cliente;
    document.getElementById('ti-tecnico').value = ti.id_tecnico;
    window.scrollTo(0,0);
}

// ========== FUNCIONES ==========

async function eliminar(entidad, id) {
    if(confirm('¿Eliminar Informacion?')){
        await fetch(`${API_URL}/${entidad}/${id}`,{
            method: 'DELETE'
        });
    };
    await obtenerTodo();
};

function seccion(id){
    document.querySelectorAll('.modulo').forEach(m => m.style.display=' none');
    document.getElementById(`sec-${id}`).style.display ='block';
}

function logout(){
    localStorage.clear();
    window.location.href = 'index.html';
}