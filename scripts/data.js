const hoje = new Date();
const ano = document.querySelector("#anoatual");
const completa = document.querySelector("#ultimaMoficacao");

completa.innerHTML = `Última modificação: <span class="destaque">${new Intl.DateTimeFormat(
	"pt-br",
	{
		dateStyle: "full"
	}
).format(hoje)}</span>`;

ano.innerHTML = hoje.getFullYear()