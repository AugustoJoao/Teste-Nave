const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Configurar bodyParser

app.use(bodyParser.json());


//Conexão com MongoDB
mongoose.connect("mongodb+srv://augusto:nave@teste-nave-omj50.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
} , ()=> {
    console.log("Banco de dados conectado")
})

//Carregar Candidato
require("./models/Candidato");
const Candidato = mongoose.model("Candidato");

//Carregar vaga
require("./models/Vaga.js");
const Vaga = mongoose.model("Vaga");

//Endpoints

   //Cadastro
   app.post("/candidato", (req,res) => {
    
    if(req.body.nome != undefined && req.body.email != undefined && req.body.telefone != undefined && req.body.cpf != undefined){
       
        
        let candidato = new Candidato({
            nome: req.body.nome, email: req.body.email, telefone: req.body.telefone, cpf: req.body.cpf, comentario: req.body.comentario
        });
        
        candidato.save().then(() => {
            //Salvo com sucesso
            res.statusCode = 201;
            res.send("Candidato cadastrado!");
        }).catch((erro) => {
            if(erro){
                throw erro;
            }
            //Aconteceu um erro
            res.statusCode = 417;
            res.send("Algo deu errado :(");
    
        })


    }else{
        res.statusCode = 406;
        res.send("Campo inválido");
    }
})

   //Consulta geral
   app.get("/candidatos", (req, res) => {
       Candidato.find({}, (erro, dados) => {
           if(erro){
               res.statusCode = 417
               res.send();
           }
            res.json(dados);
       })
})

   //Consulta específica por ID
   app.get("/candidato/:id", (req, res) => {
       Candidato.findById(req.params.id).then((candidato) =>{
           res.statusCode = 200;
           res.json(candidato);
       }).catch((erro) =>{
           if(erro){
            
            res.statusCode = 417;
            res.send();   
            
            throw erro;
               
           }
           
       });

   });

   //Deletar candidato
   app.delete("/candidato/:id", (req,res) => {
       Candidato.findByIdAndRemove(req.params.id).then((candidato) =>{
           if(candidato){
               res.statusCode = 200;
               res.send("Candidato removido");

           }else{
               res.statusCode = 404;
               res.send();
           }
       }).catch((erro) => {
           res.statusCode = 417;
           res.send();
           throw erro;
       });
   })

   //Cadastro de vaga
   app.post("/vaga", (req,res) => {
    
    if(req.body.nome != undefined){
       
        
        let vaga = new Vaga({
            nome: req.body.nome
        });
        
        vaga.save().then(() => {
            //Salvo com sucesso
            res.statusCode = 201;
            res.send("Vaga cadastrada!");
        }).catch((erro) => {
            if(erro){
                throw erro;
            }
            //Aconteceu um erro
            res.statusCode = 417;
            res.send("Algo deu errado :(");
    
        })


    }else{
        res.statusCode = 406;
        res.send("Campo inválido");
    }
})

 //Consulta geral de vagas
 app.get("/vagas", (req, res) => {
    Vaga.find({}, (erro, dados) => {
        if(erro){
            res.statusCode = 417
            res.send();
        }
         res.json(dados);
    })
})

//Consulta específica de vaga por ID
app.get("/vaga/:id", (req, res) => {
    Vaga.findById(req.params.id).then((vaga) =>{
        res.statusCode = 200;
        res.json(vaga);
    }).catch((erro) =>{
        if(erro){
         
         res.statusCode = 417;
         res.send();   
         
         throw erro;
            
        }
        
    });

});

//Deletar Vaga
app.delete("/vaga/:id", (req,res) => {
    Vaga.findByIdAndRemove(req.params.id).then((vaga) =>{
        if(vaga){
            res.statusCode = 200;
            res.send("Vaga removida");

        }else{
            res.statusCode = 404;
            res.send();
        }
    }).catch((erro) => {
        res.statusCode = 417;
        res.send();
        throw erro;
    });
})



app.listen(8080,()=> {
     console.log("API rodando!")
})