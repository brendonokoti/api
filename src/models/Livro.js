import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
	{
		id: {type: String},
		titulo: {
			type: String,
			required: [true, "Obrigatório ter título do livro"]
		},
		autor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "autores",
			required: [true, "O autor ou autora é obrigatório"],
			autopopulate: { select: "nome" }
		},
		editora: {
			type: String,
			required: [true, "Obrigatório informar a editora"],
			enum: {
				values: [],
				message: "A editora {VALUE} não é um valor permitido"
			}
		},
		numero_paginas: {
			type: Number,
			validate: {
				validator: (valor) => {
					return valor >= 1 && valor <=5000;
				},
				message: "O número de páginas deve estar entre 1 e 5000. Valor fornecido: {VALUE}"
			}
		}
	}
);
livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;