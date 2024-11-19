const login = () => {
    const entrada = document.getElementById('senha').value

    const hash_senha = 'b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'

    if (hash_senha === hex_sha256(entrada)) {
        sessionStorage.setItem('logado', 'sim')
        const alerta = `
            <p id='confirm'>Senha correta</p>
        `
        const containerAviso = document.getElementById('containerAviso')
        containerAviso.innerHTML = alerta
        const circle = document.getElementById('circle')
        circle.classList.add('expand')
        setTimeout(() => {
            window.location = 'principal.html';
        }, 1000);
    } else {
        const alerta = `
        <p id='alerta'>Senha incorreta</p>
        `
        const containerAviso = document.getElementById('containerAviso')
        containerAviso.innerHTML = alerta
    }



}

