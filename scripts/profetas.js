const cartoes = document.querySelector('#cartoes');
const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    // console.table(dados.profetas);
    exibirProfetas(dados.profetas); // observe que você faz referência ao array profetas do objeto de dados JSON, não apenas ao objeto
}

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
      const card = document.createElement('section');
      const nomeCompleto = document.createElement('h2');
      const nascimento = document.createElement('p');
      const localNascimento = document.createElement('p');
      const filhos = document.createElement('p');
      const anosServico = document.createElement('p');
      const falecimento = document.createElement('p');
      const retrato = document.createElement('img');

      nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;
      nascimento.innerHTML = `<span>Nascimento:</span> ${profeta.nascimento}`;
      localNascimento.innerHTML = `<span>Lugar:</span> ${profeta.localNascimento}`;
      filhos.innerHTML = `<span>Filhos:</span> ${profeta.numeroFilhos}`;
      anosServico.innerHTML = `<span>Anos de Serviço:</span> ${profeta.duracao}`;
      falecimento.innerHTML = `<span>Falecimento:</span> ${profeta.morte}`;
      retrato.setAttribute("src", profeta.urlImagem);
      retrato.setAttribute("alt", `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
      retrato.setAttribute("loading", "lazy");
      retrato.setAttribute("width", '340');
      retrato.setAttribute("height", '400');

      retrato.classList.add("foto");

      card.appendChild(nomeCompleto);
      card.appendChild(nascimento);
      card.appendChild(localNascimento);
      card.appendChild(filhos);
      card.appendChild(anosServico);
      card.appendChild(falecimento);
      card.appendChild(retrato);

      cartoes.appendChild(card);
    });
  }

  obterDadosDeProfetas();