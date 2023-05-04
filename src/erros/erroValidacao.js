import RequisicaoIncorreta from "./requisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
	constructor(erro) {
		const mensagens_erro = Object.values(erro.errors)
			.map(erro => erro.message)
			.join("; ");
		super(`Os seguintes erros foram encontrados: ${mensagens_erro}`);
	}
}

export default ErroValidacao;