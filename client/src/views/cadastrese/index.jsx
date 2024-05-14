import React from 'react'

 function index() {
  return (
    <div class="conteudo">
        <div class="cabecalho">
            <nav class="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid d-flex justify-content-around">
                    <a className="navbar-brand me-auto" href="#">NoPrecinho</a>
                        <div className="offcanvas offcanvas-end teste" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ color: 'white' }}>NoPrecinho</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav flex-grow-1 ms-5 justify-content-center">
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#">Sobre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#">Serviços</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#">Portfólios</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2 mr-5" href="#">Contato</a>
                                </li>
                                <li className="ms-5">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn " type="submit">Search</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a href="#" className="login-button">Login</a>
                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>

    <div class="box">
        <div><img src="img/NP.png" alt="logo" id="logo"/></div><br/><br/>
        <label for="" class="form-label"><h2 class="info">Selecione:</h2></label>
        <div class="enviar">
            <span class="linha"></span>
        </div>
        
        <a class="botaoCadastrese btn border border-black mt-4 rounded-5 " href="usuario2.html">Usuário</a>
        <a class="botaoCadastrese btn border border-black mt-5 rounded-5" href="mercado2.html ">Mercado</a>
    </div>
</div>
  )
}
export default index