import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipulador_de_erros(erro, req, res, next) {
	console.log(erro); 
	if (erro instanceof mongoose.Error.CastError) {
		new RequisicaoIncorreta().enviar_resposta(res);
	} else if (erro instanceof mongoose.Error.ValidationError) {
		new ErroValidacao(erro).enviar_resposta(res);
	} else if (erro instanceof ErroBase) {
		erro.enviar_resposta(res);
	} else {
		new ErroBase().enviar_resposta(res);
	}
}


export default manipulador_de_erros;