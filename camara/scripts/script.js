const btnHamb = document.querySelector("#ham-btn");
const btnGrid = document.querySelector(".btn-grade");
const btnLista = document.querySelector(".btn-lista");
const exibir = document.querySelector(".container-cards");
const data = document.querySelector('#ultimaMoficacao');

btnGrid.addEventListener("click", () => {	
	exibir.classList.add("grid");
	exibir.classList.remove("lista");
});

btnLista.addEventListener("click", () => {	
	exibir.classList.add("lista");
	exibir.classList.remove("grid");
});

btnHamb.addEventListener('click', () => {
    btnHamb.classList.toggle('open');
})

async function main() {
    const membros = await buscarMembros();
    criarCards(membros);
}

async function buscarMembros() {
    const resposta = await fetch("dados/membros.json"); // carrega os dados externos
    const dadosMembros = await resposta.json(); // converte os dados em json para JavaScript
    return dadosMembros.membros; // retorna os dados convertidos na função
}

function criarCards(membros) {
    const container = document.querySelector(".container-cards");
    container.innerHTML = "";

    membros.forEach(dados => {
        let card = document.createElement("section");
        let empresa = document.createElement("p");
        let endereco = document.createElement("p");
        let telefone = document.createElement("p");
        let site = document.createElement("p");
        let imagem = document.createElement("img");
        let nivel = document.createElement("p");

        card.classList.add("cards");
        imagem.classList.add("img-empresa");
        empresa.classList.add("nome-empresa");
        endereco.classList.add("endereco-empresas");

        empresa.textContent = dados.empresa;
        endereco.textContent = dados.endereco;
        telefone.textContent = dados.telefone;
        site.textContent = dados.urlSite;
        imagem.setAttribute("src", dados.imagem);
        imagem.setAttribute("alt", `foto empresa: ${dados.empresa}`);
        imagem.setAttribute("loading", "lazy");
        nivel.innerHTML = `Nível ${dados.nivelAssociacao}`;

        card.appendChild(imagem);
        card.appendChild(empresa);
        card.appendChild(endereco);
        card.appendChild(telefone);
        card.appendChild(site);
        card.appendChild(nivel);

        container.appendChild(card);
    });
}

main();

const hoje = new Date();
let dataCompleta = new Intl.DateTimeFormat('pt-BR', {day: "2-digit", weekday: "long", month: "long", year: "numeric"}).format(hoje);

data.innerHTML = `Última modificação: ${dataCompleta}`;