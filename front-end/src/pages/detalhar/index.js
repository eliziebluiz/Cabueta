import React, { useState, useEffect, } from 'react';
import Header from '../../Components/Header/Header.js'
import Footer from '../../Components/Footer/Footer.js'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom';
import { FaFile, FaFrown, FaSmile } from 'react-icons/fa'
import InputRange from 'react-input-range';

export default function Detalhar(props) {
  const [denuncia, setDenuncia] = useState('')

  async function loaddenuncia() {
    const id = props.match.params.id
    const response = await api.get(`/noticias/${id}`)
    setDenuncia(response.data)
  }
  useEffect(() => {
    loaddenuncia()
  }, [])

  async function incrementar(id) {
    const data = {
      increment: denuncia.increment + 1
    }
    await api.put(`/noticias/${id}`, data);
    window.location.reload();
  }

  async function decrementar(id) {
    if (denuncia.increment>0) {
      const data = {
        increment: denuncia.increment - 1
      }
      await api.put(`/noticias/${id}`, data);
      window.location.reload();
    }
    else {
      alert("A Número de Assinaturas Não pode ser Menor que Zero\n");
    }
  }

  /*
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="main-container">
          <div className="row">
             <div className="column">
                <img src={denuncia.image}></img>
             </div>
             <div className="column">
                <div className="container-detalhe">
                <label>{denuncia.orgao}</label>
                <h1>{denuncia.title}</h1>
                
                <div className="text">
                <p>{denuncia.description}</p>
            </div>
          </div>
             </div>
          </div>
        </div>
      
      </div>
      <Footer />
    </>
  )
*/
  /*
  <div className="container-main">
          <div className="row">
          <article>
            <div className="container-detalhe">
              <label>{denuncia.orgao}</label>
              <h1>{denuncia.title}</h1>
              <img src={denuncia.image}></img>
              <div className="text">
                <p>{denuncia.description}</p>
              </div>
            </div>
          </article>
          </div>
        </div>
  */
  function report(denuncia){
    return (denuncia.increment > denuncia.assinaturas);
  }

  return (
    <>
      <Header />
      <div className="row">
        <article>
          <div className="container-detalhe">
            <label>{denuncia.orgao}</label>
            <h1>{denuncia.title}</h1>
            <img src={denuncia.image}></img>
            <div className="text">
              <p>{denuncia.description}</p>
            </div>
            <div className="row-icons">
            <Link to={`/noticias/${denuncia._id}`} onClick={() => incrementar(denuncia._id)}><div>< FaFrown />Discordar</div> </Link>
            <Link to={`/noticias/${denuncia._id}`} onClick={() => decrementar(denuncia._id)}><div>< FaSmile />Aceitar</div> </Link>
            </div>
            <div className="estatistica">
              <h2>Estatistica</h2>
            </div>
            <div className="slidecontainer">
              <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
            </div>
            <div className="acao">
              <div>Discordar</div>
              <div>Aceitar</div>
            </div>
            <div className="assinaturas">
              <p>{`A assinatura precisa de ${denuncia.assinaturas}, corrente ${denuncia.increment}`}</p>
            </div>
            <div className="row-icons relatorio">
                <Link to={report(denuncia) ? '/form' : '#'}><div>< FaFile />Gerar Relatório</div> </Link>
              </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
}
