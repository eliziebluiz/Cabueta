import React, { useState, useEffect, } from 'react';
import Header from '../../Components/Header/Header.js'
import Footer from '../../Components/Footer/Footer.js'
import api from '../../services/api'
import './styles.css'

export default function EditarDenuncia(props) {
  const [denuncia, setDenuncia] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [orgao, setOrgao] = useState('')
  const [image, setImage] = useState('')
  const [namehash, setNamehash] = useState('')
  const [assinaturas, setAssinaturas] = useState('')
  const [increment, setIncrement] = useState('')

  async function loaddenuncia() {
    const id = props.match.params.id
    const response = await api.get(`/noticias/${id}`)
    setDenuncia(response.data)
  }
  useEffect(() => {
    loaddenuncia()
  }, [])
  
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: title || denuncia.title,
      description: description || denuncia.description,
      orgao: orgao || denuncia.orgao,
      namehash: namehash || denuncia.namehash,
      image: image || denuncia.image,
      increment: increment || denuncia.increment || 0,
      assinaturas: assinaturas || denuncia.assinaturas,
    }
    const id = props.match.params.id
    await api.put(`/noticias/${id}`, data);
    alert("Denúncia Editada com Sucesso\n");
  }


  return (
    <>
      <Header />
      <div className="container-table">
        <h1>Editar Notícia</h1>
        <form className="table-main" onSubmit={handleSubmit}>
          <input
            id="title"
            placeholder="Título da Notícia"
            defaultValue={denuncia.title}
            onChange={event => setTitle(event.target.value)} />

          <input
            id="orgao"
            placeholder="Orgão Denunciado"
            defaultValue={denuncia.orgao}
            onChange={event => setOrgao(event.target.value)} />

          <input
            id="namehash"
            placeholder="Nome Anonimo"
            value={denuncia.namehash}
            onChange={event => setNamehash(event.target.value)} />

          <input
            id="image"
            placeholder="URL da imagem"
            defaultValue={denuncia.image}
            onChange={event => setImage(event.target.value)} />

          <input
            id="description"
            placeholder="Descrição"
            defaultValue={denuncia.description}
            onChange={event => setDescription(event.target.value)} />
          
          <input
            id="assinaturas"
            placeholder="Assinaturas"
            defaultValue={denuncia.assinaturas}
            onChange={event => setAssinaturas(event.target.value)} />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
