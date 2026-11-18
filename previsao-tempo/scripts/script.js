// obter objetos elementos do html
const tempoAtual = document.querySelector('#tempo-atual');
const iconeClima = document.querySelector('#icone-do-clima');
const descricaoLegenda = document.querySelector('figcaption');

// variaveis para a url
const minhaChave = "8302121d51bd645f4b38c70ef12f9afd";
const latitude = "49.75";
const longitude = "6.64";
const idioma = "pt_br";
const celsius = "metric"; // converte a temperatura para celsius com "metric"
const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${minhaChave}&units=${celsius}&lang=${idioma}`;

// obter dados da api
async function apiFetch() {
    try {
        const resposta = await fetch(url);
        if (resposta.ok) {
            const dados = await resposta.json(); // pega todos os dados da api em json (tempo, clima, temperatura, icone, tudo da cidade)
            console.log(dados); 
            mostrarResultados(dados);
        } else {
            throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log(erro);
    }
}

// exibir os dados da api na pagina html
function mostrarResultados(dados) {
    // acessa as chaves e valor do json pela variavel dados
    tempoAtual.innerHTML = `${dados.main.temp}&deg;C`; // pega a temperatura do local
    const iconeSrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`; // pega o icone do tempo dentro da array weather
    const descr = dados.weather[0].description; // pega descrição dentro da array weather
    iconeClima.setAttribute('src', iconeSrc); // config os atributos de img, o endereço recebido na variavel iconeSrc é passado para src
    iconeClima.setAttribute('alt', descr); // config o alt da img do icone usando a descrição da array weather do json
    descricaoLegenda.textContent = `${descr}`;
}

apiFetch();