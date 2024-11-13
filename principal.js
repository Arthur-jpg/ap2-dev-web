
const fetchJson = async (api, endpoint) => {

    const resposta = await fetch(api + endpoint); 
    const dadosFuncionais = await resposta.json(); 
    console.log(dadosFuncionais)
    return dadosFuncionais;
    
}

const container = document.getElementById('container')

const botoes = document.getElementById('botoes')

const montarBotoes = () => {
    const botao1 = document.createElement("button")
    const newContent1 = document.createTextNode("Masculino");
    botao1.appendChild(newContent1);
    botao1.id = 'botao1'
    
    const botao2 = document.createElement("button")
    const newContent2 = document.createTextNode("Feminino");
    botao2.appendChild(newContent2);
    botao2.id = 'botao2'

    const botao3 = document.createElement("button")
    const newContent3 = document.createTextNode("Elenco Completo");
    botao3.appendChild(newContent3);
    botao3.id = 'botao3'

    // add the text node to the newly created div
    botoes.appendChild(botao1)
    botoes.appendChild(botao2)
    botoes.appendChild(botao3)
}

const card = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descricao = document.createElement("p");
    const span_id = document.createElement('span');

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);
    
    descricao.innerHTML = atleta.detalhes;
    cartao.appendChild(descricao);

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome

    span_id.innerHTML = atleta.id
    cartao.appendChild(span_id)




    container.appendChild(cartao)
}

montarBotoes()

document.getElementById('logout').onclick = () => {sessionStorage.removeItem('logado'); location.reload();}

if (sessionStorage.getItem('logado')) {
    let endpoint = '';

    const containerPrincipal = document.getElementById('container')
    const masculino = document.getElementById('botao1');
    const feminino = document.getElementById('botao2');
    const elencoCompleto = document.getElementById('botao3');

    function limparJogadores() {
        containerPrincipal.innerHTML = ''
    }

    function mostrarCarregando(texto) {
        mensagemCarregando.textContent = `Carregando elenco ${texto}...`
        carregando.style.display = 'block'
    }
    function ocultarCarregando() {
        carregando.style.display = 'none'
    }

    function carregarJogs( endpoint, status ) {
        limparJogadores()
        mostrarCarregando(status)
        fetchJson('https://botafogo-atletas.mange.li/2024-1/', endpoint).then(
            (retorno) => {
                ocultarCarregando();
                retorno.forEach((atleta) => card(atleta));
            }
        ).catch(() => {
            ocultarCarregando();
            alert('Erro ao carregar os dados. Tente novamente.');
        });
    }

    
    masculino.addEventListener("click", function() {
        endpoint = 'masculino';
        carregarJogs(endpoint, 'masculino')
    });
    
    feminino.addEventListener("click", function() {
        endpoint = 'feminino';
        carregarJogs(endpoint, 'feminino')
    });
    
    elencoCompleto.addEventListener("click", function() {
        endpoint = 'all';
        carregarJogs(endpoint, 'elenco completo')
    });

    
} else {
    document.body.innerHTML = "<h1>Faça o login para ver o conteúdo</h1>"
    window.location = "/index.html"
}

