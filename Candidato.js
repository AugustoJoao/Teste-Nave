const mongoose = require("mongoose");

mongoose.model("Candidato",{
    nome: {type:String}, 
    email: {type:String}, 
    telefone: {type:Number}, 
    cpf: {type:Number},
    comentario: {type:String}

});
