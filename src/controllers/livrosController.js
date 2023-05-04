import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
	static listar_livros = async (req, res, next) => {
		try {
			const busca_livros = livros.find();
			req.resultado = busca_livros;
			next();
		} catch (erro) {
			next(erro);
		}
	};

	static listar_livro_por_id = async (req, res, next) => {
		try {
			const id = req.params.id;
			const livro_resultado = await livros.findById(id);
			if (livro_resultado !== null) {
				res.status(200).send(livro_resultado);
			} else {
				next(new NaoEncontrado("ID do livro não localizado"));
			}		
		} catch (erro) {
			next(erro);
		}
		
	};

	static cadastrar_livro = async (req, res, next) => {
		try {
			let novo_livro = new livros(req.body);
			const livro = await novo_livro.save();
			res.status(201).send(livro.toJSON());
		} catch (erro) {
			next(erro);
		}
	};

	static atualizar_livro = async (req, res, next) => {
		try {
			const id = req.params.id;
			const livro_resultado = await livros.findByIdAndUpdate(id, {$set: req.body});
			if (livro_resultado !== null) {
				res.status(200).send({message: "Livro atualizado com sucesso"});
			} else {
				next(new NaoEncontrado("ID do livro não localizado"));
			}		
		} catch (erro) {
			next(erro);
		}
	};

	static excluir_livro = async (req, res, next) => {
		try {
			const id = req.params.id;
			const livro_resultado = await livros.findByIdAndDelete(id);
			if (livro_resultado !== null) {
				res.status(200).send({message: "Livro removido com sucesso"});
			} else {
				next(new NaoEncontrado("ID do livro não localizado"));
			}		
		} catch (erro) {
			next(erro);
		}
	};

	static listar_livro_por_filtro = async (req, res, next) => {
		try {
			const busca = await processa_busca(req.query);

			if (busca !== null) {
				const livros_resultados = livros.find(busca);
				req.resultado = livros_resultados;
				next();
			} else {
				res.status(200).send([]);
			}
		} catch (erro) {
			next(erro);
		}
	};
}

async function processa_busca(parametros) {
	const { editora, titulo, min_paginas, max_paginas, nome_autor } = parametros;
	const regex = new RegExp(titulo, "i");
	let busca = {};

	if (editora) busca.editora = editora;
	if (titulo) busca.titulo = regex;

	if (min_paginas || max_paginas) busca.numero_paginas = {};

	// gte = greater than or equal
	if (min_paginas) busca.numero_paginas.$gte = min_paginas;
	//lte = less than or equal
	if (max_paginas) busca.numero_paginas.$lte = max_paginas;

	if (nome_autor) {
		const autor = await autores.findOne({nome: nome_autor});

		if (autor !== null) {
			busca.autor = autor._id;
		} else {
			busca = null;
		}
		
	}

	return busca;
}

export default LivroController;