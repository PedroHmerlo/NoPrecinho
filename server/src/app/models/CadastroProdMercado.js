const mysql = require("mysql2")
const dbConfig = require("../config")

const caminhoServer = require("path")

class CadastroProdMercado{
    constructor(){
        this.conexao = mysql.createConnection(dbConfig.db)
    }

    mostrarTodos(){
        return new Promise((resolve,reject)=>{
            let sql = "SELECT produto_mercado.*, mercado.nome_fantasia AS nome_mercado FROM produto_mercado JOIN mercado ON produto_mercado.mercado_id = mercado.id_mercado;"
            this.conexao.query(sql,function(erro,retorno){
                if(erro) reject([400,erro])

                resolve([201,retorno])
            })
        })
    }

    inserir(nome_prod_mercado,marca_mercado,peso_mercado,preco_mercado,foto_prod_mercado,descircao_prod_mercado,mercado_id){
        return new Promise ((resolve, reject)=>{
            let sql = `INSERT INTO produto_mercado (nome_produto,marca_produto,peso_produto,preco_produto,foto_produto,descricao,mercado_id) VALUE
             ('${nome_prod_mercado}','${marca_mercado}','${peso_mercado}','${preco_mercado}','${foto_prod_mercado}','${descircao_prod_mercado}','${mercado_id}')`
            this.conexao.query(sql,function(erro,retorno){
                if(erro) reject([400,erro]) //erro
               
                resolve([201,"Inserido"])
            })
        })
    }

}

module.exports = new CadastroProdMercado()