const respuestaDiv = document.querySelector('#errorRespuesta');

document.querySelector('#form-login').addEventListener('submit', async (e)=>{
    e.preventDefault()
    try{
        const res= await fetch('http://localhost:4000/api/usuarios/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email : document.querySelector('#email').value,
                password : document.querySelector('#password').value
            })
        });

        const data = await res.json();

        if(!res.ok) throw new Error(data.msg || "Error en el login");

        localStorage.setItem('usuario', JSON.stringify(data));

        window.location.href = 'dashboard.html';
        
    }catch(error){
        respuestaDiv.textContent = error.message;

        respuestaDiv.classList.remove('errorHiden');
        respuestaDiv.classList.add('errorShow');

        setTimeout(() => {
            respuestaDiv.classList.remove('errorShow');
            respuestaDiv.classList.add('errorHiden');
        }, 3000);
    }
})