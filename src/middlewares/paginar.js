import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

async function paginar(req, res, next) {
	try {
		let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
		let [campo_ordenacao, ordem] = ordenacao.split(":");
		limite = parseInt(limite);
		pagina = parseInt(pagina);
		ordem = parseInt(ordem);

		const resultado = req.resultado;

		if (limite > 0 && pagina > 0){
			const resultado_paginado = await resultado.find()
				.sort({ [campo_ordenacao]: ordem })
				.skip((pagina - 1) * limite)
				.limit(limite)
				.exec();
			res.status(200).json(resultado_paginado);
		} else {
			next(new RequisicaoIncorreta());
		}
	} catch (erro) {
		next(erro);
	}
}

export default paginar;