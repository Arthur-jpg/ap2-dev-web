// fetch do json da api

const fetchJson = async (api) => {
    const resposta = await fetch(api); // pegando a api
    const dadosFuncionais = await resposta.json() // interpretando o JSON da API

    return dadosFuncionais
}

const container = document.getElementById('container')

const botoes = document.getElementById('botoes')

const montarBotoes = () => {
    const botao1 = document.createElement("button")
    const newContent1 = document.createTextNode("Masculino");
    botao1.appendChild(newContent1);
    // botao1.onclick = 

    const botao2 = document.createElement("button")
    const newContent2 = document.createTextNode("Feminino");
    botao2.appendChild(newContent2);

    const botao3 = document.createElement("button")
    const newContent3 = document.createTextNode("Elenco Completo");
    botao3.appendChild(newContent3);
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

    fetchJson('https://botafogo-atletas.mange.li/2024-1/all').then(
        ( retorno ) => {
            retorno.forEach((atleta) => card(atleta));
        }
            
    )
} else {
    document.body.innerHTML = "<h1>Faça o login para ver o conteúdo</h1>"
    window.location = "/index.html"
}

