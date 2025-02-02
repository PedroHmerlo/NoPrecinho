import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import './Navbar.css';

function Navbar() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [nomeMercado, setNomeMercado] = useState('');
    const [isMercado, setIsMercado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);  // Debug: print the decoded token

                if (decodedToken.nome_user_usuario) {
                    setNomeUsuario(decodedToken.nome_user_usuario);
                    setIsMercado(false);
                } else if (decodedToken.nome_fantasia) { // Verifique nome_fantasia
                    setNomeMercado(decodedToken.nome_fantasia);
                    setIsMercado(true);
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
            }
        }
    }, []);

    async function handleLogout() {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <div className="cabecalho">
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid d-flex justify-content-around">
                    {isMercado ?(
                    <a className="navbar-brand me-auto" href="/gerenciamentoM">NoPrecinho</a>
                    ): (
                    <a className="navbar-brand me-auto" href="/">NoPrecinho</a>   
                    )}
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">NoPrecinho</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav flex-grow-1 justify-content-center">
                                {isMercado ? (
                                    <li className="nav-item">
                                        <a className="nav-link mx-lg-2" href="/categoria">Cadastrar Produtos</a>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link mx-lg-2" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mx-lg-2" href="/carrinho/comparacao">Carrinho</a>
                                        </li>
                                        <li className="ms-2">
                                            <form className="d-flex" role="search">
                                                <input className="form-control me-2" id='barraPesq' type="search" placeholder="Buscar produtos, marcas e muito mais." aria-label="Search" />
                                                <button type='submit' className='btnPesq'><i className="bi bi-search text-light"></i></button>
                                            </form>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    {!nomeUsuario && !nomeMercado ? (
                        <a href="/login" className="login-button">Login</a>
                    ) : (
                        <>
                            {isMercado ? (
                                <span className="nav-link mx-lg-2" style={{ color: 'white' }}>Mercado: {nomeMercado}</span>
                            ) : (
                                <span className="nav-link mx-lg-2" style={{ color: 'white' }}>Usuário: {nomeUsuario}</span>
                            )}
                            <button className="btn btn-secondary ms-2" onClick={handleLogout}>Sair</button>
                        </>
                    )}
                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
