const mysql = require("mysql2")
const dbConfig = require("../config")
const bcrypt = require('bcrypt');

const caminhoServer = require("path")

class CadastroUsuario {
    constructor() {
        this.conexao = mysql.createConnection(dbConfig.db)
    }

    mostrarTodos() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM usuario'
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) reject([400, erro])

                resolve([201, retorno])
            })
        })
    }

    inserir(nome_usuario, cpf_usuario, cep_usuario, estado_usuario, cidade_usuario, bairro_usuario, rua_usuario, telefone_usuario, email_usuario, nomeUser_usuario, senha_usuario) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(senha_usuario, salt)
        
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO usuario (nome_usuario,cpf_usuario,cep_usuario,estado_usuario,cidade_usuario,bairro_usuario,rua_usuario,telefone_usuario,email_usuario,nome_user_usuario,senha) VALUE
             ('${nome_usuario}','${cpf_usuario}','${cep_usuario}','${estado_usuario}','${cidade_usuario}','${bairro_usuario}','${rua_usuario}','${telefone_usuario}','${email_usuario}','${nomeUser_usuario}','${hash}')`
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) reject([400, erro]) //erro

                resolve([201, "Inserido"])
            })
        })
    }
    atualizar(nome_usuario, id_usuario) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE usuario SET nome_usuario = '${nome_usuario}' WHERE id_usuario = '${id_usuario}'`
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) reject([400, erro]) //erro                

                resolve([201, "Atualizado com sucesso"])
            })
        })
    }

    deletar(id_usuario) {
        return new Promise((resolve, reject) => {

            let sql = `DELETE FROM usuario WHERE id_usuario ='${id_usuario}';`
            console.log(id_usuario)
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                console.debug(retorno)
                if (retorno.changedRows < 1) {
                    resolve([404, "Usuário não encontrado"])
                } else {
                    resolve([201, "Deletado com sucesso"])
                }
            })
        })
    }

    verificaUsuarioSenha(email, senha) {
        return new Promise((resolve, reject) => {
            // Consulta parametrizada para evitar injeção de SQL
            let sql = 'SELECT * FROM usuario WHERE email_usuario = ?';
    
            this.conexao.query(sql, [email], function (erro, retorno) {
                if (erro) {
                    console.debug(erro);
                    reject([400, erro]);
                } else {
                    if (retorno.length === 0) {
                        resolve([401, "Usuário ou senha inválidos"]);
                    } else {
                        let hash = retorno[0].senha;
                        let logado = bcrypt.compareSync(senha, hash);
                        if (logado) {
                            let { id_usuario, nome_user_usuario, tipo } = retorno[0];
                            resolve([200, "Logado com sucesso", id_usuario, tipo, nome_user_usuario]);
                        } else {
                            resolve([401, "Usuário ou senha inválidos"]);
                        }
                    }
                }
            });
        });
    }

  

    buscarNomeUsuario(idUsuario) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT nome_user_usuario FROM usuario WHERE id_usuario = ?';
            this.conexao.query(sql, [idUsuario], (erro, resultado) => {
                if (erro) {
                    console.error('Erro ao buscar nome de usuário:', erro);
                    reject(erro);
                } else {
                    if (resultado.length > 0) {
                        resolve(resultado[0].nome_user_usuario);
                    } else {
                        reject(new Error('Usuário não encontrado'));
                    }
                }
            });
        });
    }
}
    

module.exports = new CadastroUsuario()