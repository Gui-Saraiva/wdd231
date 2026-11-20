const btnHamb = document.querySelector("#ham-btn");
const btnGrid = document.querySelector(".btn-grade");
const btnLista = document.querySelector(".btn-lista");
const exibir = document.querySelector(".container-cards");
const data = document.querySelector('#ultimaMoficacao');

if (btnGrid && btnLista && exibir) { // execute as duas funçoes abaixo em paginas que possuam os elementos dentro do if (elementos)
    btnGrid.addEventListener("click", () => {	
        exibir.classList.add("grid");
        exibir.classList.remove("lista");
    });
    
    btnLista.addEventListener("click", () => {	
        exibir.classList.add("lista");
        exibir.classList.remove("grid");
    });
}

btnHamb.addEventListener('click', () => {
    btnHamb.classList.toggle('open');
})

async function main() {    
    const membros = await buscarMembros();    
    criarCards(membros);    
}

async function buscarMembros() {
    const resposta = await fetch("dados/membros.json"); // carrega os dados externos
    const dadosMembros = await resposta.json(); // converte os dados em json
    return dadosMembros.membros; // retorna os dados convertidos na função
}

const container = document.querySelector(".container-cards");
const containerDestaque = document.querySelector(".container-empresas-destaque");    

function criarCards(membros) {
    if (container) { // protege a função, executa somente se container existir na pagina
        container.innerHTML = "";
    }

    if (containerDestaque) { // protege a função, executa somente se containerDestaque existir na pagina
        containerDestaque.innerHTML = "";
    }    

    let cardsDestaque = [];

    membros.forEach((dados) => {
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

        cardsDestaque.push(card); // coloca os cards dentro da array para sorteio

        if (container) { // protege a função, executa somente se container existir na pagina
            container.appendChild(card);            
        }        
    });

    if (containerDestaque) { // protege a função, executa somente se containerDestaque existir na pagina                        
        let indiceAleatorioComparacao = -1; // começa com um índice inválido para o primeiro sorteio fazer a comparação do primeiro card sorteado se é ou não nível 1 que não vai no destaque.

        for (let i = 0; i < 2; i++) {
            indiceAleatorio = Math.floor(Math.random() * 7); // sorteia outro indice

            while (indiceAleatorio == indiceAleatorioComparacao || membros[indiceAleatorio].nivelAssociacao == 1) { // ve se sao indices iguais
                indiceAleatorio = Math.floor(Math.random() * 7); // se igual, sorteia outro
            }
            indiceAleatorioComparacao = indiceAleatorio // atribui o indice sorteado ao indice de comparação para nao ser sorteado o mesmo indice duas vezes 
            containerDestaque.appendChild(cardsDestaque[indiceAleatorio]); // coloca o card dentro do container
            cardsDestaque[indiceAleatorio].classList.add("card-destaque"); // muda o nome da classe para estilos
            cardsDestaque[indiceAleatorio].querySelector("img").classList.add("imagem-card-destaque");
        }
    }
}

if (exibir || containerDestaque) { // protege a função pra executar somente se tiver exibir ou containerDestaque na pagina
    main();
}

// PREVISAO DO TEMPO
const cidade = document.querySelector('#cidade');

// variaveis para a url
const minhaChave = "8302121d51bd645f4b38c70ef12f9afd";
const latitude = "-23.29";
const longitude = "-47.68";
const idioma = "pt_br";
const celsius = "metric"; // converte a temperatura para celsius com "metric"
const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${minhaChave}&units=${celsius}&lang=${idioma}`;
const urlFuturo = `//api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${minhaChave}&units=${celsius}&lang=${idioma}`;

// obter dados da api
async function apiFetch() {
    try {
        const resposta = await fetch(url);
        if (resposta.ok) {
            const dados = await resposta.json(); // pega todos os dados da api em json (tempo, clima, temperatura, icone, tudo da cidade)
            console.log(dados); // ver o json no console do dev tools
            mostrarResultados(dados);            
        } else {
            throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log(erro);
    }
}

async function apiFetchFuturo() {
    try {
        const respostaFuturo = await fetch(urlFuturo); // pega todos os dados da api guardados na variavel urlFuturo
        if (respostaFuturo.ok) {
            const dadosFuturos = await respostaFuturo.json(); // converte todos os dados em json
            console.log(dadosFuturos); // ver o json no console do dev tools
            mostrarResultadosDiaUm(dadosFuturos); // executa a função que atribui os valores aos elementos
            mostrarResultadosDiaDois(dadosFuturos);
            mostrarResultadosDiaTres(dadosFuturos);
        } else {
            throw Error(await respostaFuturo.text());
        }
    } catch (erro) {
        console.log(erro);
    }
}

// obter objetos elementos do dia atual html
const tempoAtual = document.querySelector('#tempo-atual');
const iconeClima = document.querySelector('#icone-do-clima');
const descricaoLegenda = document.querySelector('#legenda-dia-atual');

// exibir os dados da api na pagina html
function mostrarResultados(dados) {
    // acessa as chaves e valor do json pela variavel dados
    cidade.innerHTML = `${dados.name}`; // pega o nome da cidade
    tempoAtual.innerHTML = `${dados.main.temp}&deg;C`; // pega a temperatura do local
    const iconeSrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`; // pega o icone do tempo dentro da array weather
    const descr = dados.weather[0].description; // pega descrição dentro da array weather
    iconeClima.setAttribute('src', iconeSrc); // config os atributos de img, o endereço recebido na variavel iconeSrc é passado para src
    iconeClima.setAttribute('alt', descr); // config o alt da img do icone usando a descrição da array weather do json
    descricaoLegenda.textContent = `${descr}`;
}

// obter objetos elementos do dia 1
const tempoDiaUm = document.querySelector('#tempo-dia-um');
const iconeDiaUm = document.querySelector('#icone-dia-um');
const descricaoLegendaUm = document.querySelector('#legenda-dia-um');
const dataDiaUm = document.querySelector('#dia-primeiro');

// exibir nos elementos html do dia 1
function mostrarResultadosDiaUm(dadosFuturos) {
    const iconeSrcUm = `https://openweathermap.org/img/w/${dadosFuturos.list[3].weather[0].icon}.png`;
    const descricaoUm = dadosFuturos.list[3].weather[0].description;
    tempoDiaUm.innerHTML = `${dadosFuturos.list[3].main.temp}&deg;C`;
    iconeDiaUm.setAttribute('src', iconeSrcUm);
    iconeDiaUm.setAttribute('alt', descricaoUm);
    descricaoLegendaUm.textContent = `${descricaoUm}`;
    dataDiaUm.innerHTML = `Dia ${dadosFuturos.list[3].dt_txt.split(" ")[0]}`;
}

// obter objetos elementos do dia 2
const tempoDiaDois = document.querySelector('#tempo-dia-dois');
const iconeDiaDois = document.querySelector('#icone-dia-dois');
const descricaoLegendaDois = document.querySelector('#legenda-dia-dois');
const dataDiaDois = document.querySelector('#dia-segundo');

// exibir nos elementos html do dia 2
function mostrarResultadosDiaDois(dadosFuturos) {
    const iconeSrcDois = `https://openweathermap.org/img/w/${dadosFuturos.list[11].weather[0].icon}.png`;
    const descricaoDois = dadosFuturos.list[11].weather[0].description;
    tempoDiaDois.innerHTML = `${dadosFuturos.list[11].main.temp}&deg;C`;
    iconeDiaDois.setAttribute('src', iconeSrcDois);
    iconeDiaDois.setAttribute('alt', descricaoDois);
    descricaoLegendaDois.textContent = `${descricaoDois}`;
    dataDiaDois.innerHTML = `Dia ${dadosFuturos.list[11].dt_txt.split(" ")[0]}`;
}

// obter objetos elementos do dia 3
const tempoDiaTres = document.querySelector('#tempo-dia-tres');
const iconeDiaTres = document.querySelector('#icone-dia-tres');
const descricaoLegendaTres = document.querySelector('#legenda-dia-tres');
const dataDiaTres = document.querySelector('#dia-terceiro');

// exibir nos elementos html do dia 3
function mostrarResultadosDiaTres(dadosFuturos) {
    const iconeSrcTres = `https://openweathermap.org/img/w/${dadosFuturos.list[19].weather[0].icon}.png`;
    const descricaoTres = dadosFuturos.list[19].weather[0].description;
    tempoDiaTres.innerHTML = `${dadosFuturos.list[19].main.temp}&deg;C`;
    iconeDiaTres.setAttribute('src', iconeSrcTres);
    iconeDiaTres.setAttribute('alt', descricaoTres);
    descricaoLegendaTres.textContent = `${descricaoTres}`;
    dataDiaTres.innerHTML = `Dia ${dadosFuturos.list[19].dt_txt.split(" ")[0]}`;
}

if (tempoAtual) {
    apiFetch();
    apiFetchFuturo();
}


// configuração do último acesso no footer
const hoje = new Date();
let dataCompleta = new Intl.DateTimeFormat('pt-BR', {day: "2-digit", weekday: "long", month: "long", year: "numeric"}).format(hoje);

data.innerHTML = `Última modificação: ${dataCompleta}`;