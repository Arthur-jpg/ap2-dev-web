const params = new URLSearchParams(window.location.search) 

const ids = params.get("id")
console.log(ids)

const container = document.getElementById('container');

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho + ids);
    console.log(resposta)
    const dados = await resposta.json(); // transformando a string em json 
    return dados
}

const montarCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descricao = document.createElement("p");
    const link = document.createElement("a")

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);
    
    descricao.innerHTML = atleta.detalhes;
    cartao.appendChild(descricao);

    link.innerHTML = "Saiba mais...";
    link.href = `detalhes.html?id=${atleta.id}`
    cartao.appendChild(link);

    container.appendChild(cartao)
}

if (sessionStorage.getItem('logado')) {


    pega_json(`https://botafogo-atletas.mange.li/2024-1/`).then(
        (atleta) => montarCard(atleta)
    )
    
} else {
    document.body.innerHTML = "<h1>Faça o login para ver o conteúdo</h1>"

}