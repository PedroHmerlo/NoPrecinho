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

    mostrarProdMercado(id_mercado){
        return new Promise((resolve,reject)=>{
            let sql = `SELECT * FROM produto_mercado WHERE mercado_id = '${id_mercado}';`
            this.conexao.query(sql,function(erro,retorno){
                if(erro) reject([400,erro])

                resolve([201,retorno])
            })
        })
    }

    inserir(nome_prod, marca_mercado, peso_mercado, preco_mercado, foto_prod_mercado, validade, descricao_prod, mercado_id, id_subCategoria, arquivo) {
        return new Promise((resolve, reject) => {
            let sql     = `INSERT INTO produto_mercado 
                       (nome_produto, marca_produto, peso_produto, preco_produto, foto_produto, validade, descricao, mercado_id, sub_categoria_id) 
                       VALUES ('${nome_prod}', '${marca_mercado}', '${peso_mercado}', '${preco_mercado}', '${foto_prod_mercado}', '${validade}', '${descricao_prod}', '${mercado_id}', '${id_subCategoria}')`;
            this.conexao.query(sql, function(erro, retorno) {
                if (erro) {
                    reject([400, erro]); // erro
                } else {
                    arquivo.mv(caminhoServer + "/../Public/img/" + foto_prod_mercado);
                    resolve([201, "Inserido"]);
                }
            });
        });
    }
    
    mostrarSubCategoria(categoria_id){
        return new Promise((resolve, reject) => {
            let sql     = `SELECT id_sub_categoria, nome_sub_categoria
            FROM sub_categoria
            WHERE categoria_id = '${categoria_id}';`
            this.conexao.query(sql,function(erro,retorno){
                if(erro) reject([400,erro])
                    
                resolve([201,retorno])
            })
        });
    }


    comparacao(nome_produto, marca_produto) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT p1.id_produto_mercado, p1.nome_produto, p1.marca_produto, p1.preco_produto, m.razao_social
                FROM produto_mercado p1
                JOIN mercado m ON p1.mercado_id = m.id_mercado
                JOIN (
                    SELECT nome_produto, marca_produto
                    FROM produto_mercado
                    WHERE nome_produto = ? AND marca_produto = ?
                    GROUP BY nome_produto, marca_produto
                    HAVING COUNT(DISTINCT mercado_id) > 1
                ) p2 ON p1.nome_produto = p2.nome_produto AND p1.marca_produto = p2.marca_produto
                WHERE p1.nome_produto = ? AND p1.marca_produto = ?
                ORDER BY p1.nome_produto, p1.marca_produto, m.razao_social;
            `;
    
            this.conexao.query(sql, [nome_produto, marca_produto, nome_produto, marca_produto], (erro, resultados) => {
                if (erro) {
                    reject([400, erro]);
                    return;
                }
    
                if (resultados.length > 0) {
                    resolve([200, resultados]);
                } else {
                    resolve([404, "Produtos não encontrados."]);
                }
            });
        });
    }
    
    
    
    atualizar(id_produto,preco_novo) {
        return new Promise((resolve, reject) => {
            // Verifica se o nome_fantasia está definido
    
            let sql = `UPDATE produto_mercado
            SET preco_produto = '${preco_novo}'
            WHERE id_produto_mercado = '${id_produto}';`;
    
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro]); // erro
                    return;
                }
                if (retorno.affectedRows > 0) {
                    resolve([201, "Atualizado com sucesso"]);
                } else {
                    reject([404, "ID do mercado não encontrado"]);
                }
            });
        });
    }

    deletar(id_produto) {
        return new Promise((resolve, reject) => {
            // Verifica se o nome_fantasia está definido
    
            let sql = `UPDATE produto_mercado
                SET status = 'Desativado'
                WHERE id_produto_mercado = '${id_produto}';`;
    
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro]); // erro
                    return;
                }
                if (retorno.affectedRows > 0) {
                    resolve([201, "Atualizado com sucesso"]);
                } else {
                    reject([404, "ID do mercado não encontrado"]);
                }
            });
        });
    }
    
}

module.exports = new CadastroProdMercado()