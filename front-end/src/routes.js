import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/Main/index'
import Cadastrar from './pages/cadastrar/index'
import Detalhar from './pages/detalhar/index'
import Editar from './pages/editar/index'
import Telacod from './pages/telacod/index'
import Form from './pages/form/index'
//<Route exact path="/noticias/:id" component={Editar}></Route>
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/noticias" component={Cadastrar}></Route>
        <Route exact path="/noticias/:id" component={Detalhar}></Route>
        <Route exact path="/editarnoticias/:id" component={Editar}></Route>
        <Route exact path="/vernoticias" component={Telacod}></Route>
        <Route exact path="/form" component={Form}></Route>
      </Switch>
    </BrowserRouter>
  )
}