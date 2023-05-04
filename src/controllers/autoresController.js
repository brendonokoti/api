import NaoEncontrado from "../erros/naoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
	static listar_autores = async (req, res, next) => {
		try {
			const autores_resultados = autores.find();
			req.resultado = autores_resultados;
			next();
		} catch (erro){
			res.status(500).json({ message: "Erro interno no servidor" });
		}	
	};

	static listar_autor_por_id = async (req, res, next) => {
		try {
			const id = req.params.id;
			const autor_resultado = await autores.findById(id);

			if (autor_resultado !== null) {
				res.status(200).send(autor_resultado);
			} else {
				next(new NaoEncontrado("ID do autor não localizado"));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static cadastrar_autor = async (req, res, next) => {
		try {
			let novo_autor = new autores(req.body);
			const autor = await novo_autor.save();
			res.status(201).send(autor.toJSON());
		} catch (erro) {
			next(erro);
		}
		
	};

	static atualizar_autor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const autor_resultado = await autores.findByIdAndUpdate(id, {$set: req.body});
			if (autor_resultado !== null) {
				res.status(200).send({message: "Autor atualizado com sucesso"});
			} else {
				next(new NaoEncontrado("ID do autor não localizado"));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static excluir_autor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const autor_resultado = await autores.findByIdAndDelete(id);
			if (autor_resultado !== null) {
				res.status(200).send({message: "Autor removido com sucesso"});
			} else {
				next(new NaoEncontrado("ID do autor não localizado"));
			}
		} catch (erro) {
			next(erro);
		}
	};


}

export default AutorController;