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

const montaDetalhes = (atleta) => {

    const nome = document.createElement("h1");
    const imagem = document.createElement("img")
    const posicao = document.createElement('p')
    const n_jogos = document.createElement('p')
    const idades = document.createElement('p')
    const altura = document.createElement('p')
    const descricao = document.createElement("p")

    const divDireita = document.createElement('div')
    const divEsquerda = document.createElement('div')

    divDireita.id = 'divDireita'
    divEsquerda.id = 'divEsquerda'

    let dataNascimentoStr = atleta.nascimento

    let partesData = dataNascimentoStr.split("/");
    let dia = parseInt(partesData[0], 10);
    let mes = parseInt(partesData[1], 10) - 1; 
    let ano = parseInt(partesData[2], 10);

    let dataNascimento = new Date(ano, mes, dia);
   
    let hoje = new Date();

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    let mesAtual = hoje.getMonth();
    let mesNascimento = dataNascimento.getMonth();
    let diaAtual = hoje.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < dataNascimento.getDate())) {
    idade--;
    }


    

    nome.innerHTML = atleta.nome;
    divEsquerda.appendChild(nome);

    
    imagem.src = atleta.imagem;
    divEsquerda.appendChild(imagem);
    
    idades.innerHTML = '<strong>Idade</strong>: ' + idade + ' anos'
    divDireita.appendChild(idades)

    altura.innerHTML = "<strong>Altura</strong>: " + atleta.altura
    divDireita.appendChild(altura)

    posicao.innerHTML = "<strong>Posição</strong>: " + atleta.posicao
    divDireita.appendChild(posicao)

    n_jogos.innerHTML = "<strong>Número de jogos</strong>: " + atleta.n_jogos
    divDireita.appendChild(n_jogos)

    descricao.innerHTML = "<strong>Descrição</strong>: " + atleta.detalhes;
    divDireita.appendChild(descricao);

    container.appendChild(divEsquerda)
    container.appendChild(divDireita)

}

if (sessionStorage.getItem('logado')) {


    pega_json(`https://botafogo-atletas.mange.li/2024-1/`).then(
        (atleta) => montaDetalhes(atleta)
    )
    
} else {
    document.body.innerHTML = "<h1>Faça o login para ver o conteúdo</h1>"
}

function voltar() {
    window.location = 'principal.html'
}