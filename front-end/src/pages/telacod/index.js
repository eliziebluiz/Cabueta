import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaAngleDoubleRight, FaEdit } from 'react-icons/fa'

import api from '../../services/api'
import './style.css'
import Header from '../../Components/Header/Header.js'
import Footer from '../../Components/Footer/Footer.js'

export default function Telacod() {
  const [d, setD] = useState([])

  function categoriaEconomica(cod){
      if(cod===3){
        return "Corrente: manutenção e funcionamento dos serviços públicos em geral."
      }else{
        return "Capital: despesas que contribuirão para a produção ou geração de novos bens ou serviços e integrarão o patrimônio público, ou seja, contribuem, diretamente, para a formação ou aquisição de um bem de capital."
      }
  }

  function grupoNatureza(cod){
      if(cod===1){
        return "Despesas orçamentárias com pessoal ativo, inativo e pensionistas, relativas a mandatos eletivos, cargos, funções ou empregos, civis, militares e de membros de Poder, com quaisquer espécies remuneratórias, tais como vencimentos e vantagens, fixas e variáveis, subsídios"
      }
      else if(cod===2){
        return "Despesas orçamentárias com o pagamento de juros, comissões e outros encargos de operações de crédito internas e externas contratadas, bem como da dívida pública mobiliária."
      }
      else if(cod===3){
        return "Despesas orçamentárias com aquisição de material de consumo, pagamento de diárias, contribuições, subvenções, auxílio-alimentação, auxílio-transporte."
      }
      else if(cod===4){
        return "Despesas orçamentárias com softwares e com o planejamento e a execução de obras, inclusive com a aquisição de imóveis considerados necessários à realização destas últimas, com a aquisição de instalações, equipamentos e material permanente."
      }
      else if(cod===5){
        return "Despesas orçamentárias com a aquisição de imóveis ou bens de capital, já em utilização; aquisição de títulos representativos do capital de empresas ou entidades de qualquer espécie, já constituídas."
      }
      else if(cod===6){
        return "Despesas orçamentárias com o pagamento e/ou refinanciamento do principal e da atualização monetária ou cambial da dívida pública interna e externa, contratual ou mobiliária."
      }
      else if(cod===9){
        return "Despesas orçamentárias destinadas ao atendimento de passivos contingentes e outros riscos, bem como eventos fiscais imprevistos, inclusive a abertura de créditos adicionais. GND 1 - SALÁRIO CONTRATO TEMPORÁRIO - LEI 8.745/93 E OUTRAS DESPESAS DE PESSOAL – TERCEIRIZAÇÃO."
      }
  }

  function modalidadeAplicacao(cod){
      if(cod===20) return 'Transferências à União'
      if(cod===30) return 'Transferências a Estados e ao Distrito Federal'  
      if(cod===31) return 'Transferências a Estados e ao DF - Fundo a Fundo'
      if(cod===40) return 'Transferências a Municípios'
      if(cod===41) return 'Transferências a Municípios - Fundo a Fundo'
      if(cod===50) return 'Transferências a Instituições Privadas sem Fins Lucrativos'
      if(cod===60) return 'Transferências a Instituições Privadas com Fins Lucrativos'
      if(cod===70) return 'Transferências a Instituições Multigovernamentais'
      if(cod===41) return 'Contribuições - utilizado para transferências correntes e de capital aos entes da Federação e a entidades privadas sem fins lucrativos, exceto para os serviços essenciais de assistência social, saúde e educação.' 
      if(cod===42) return 'Auxílios - utilizado para transferências de capital aos entes da Federação e a entidades privadas sem fins lucrativos e desde que sejam: de atendimento direto e gratuito ao público e voltadas para a educação especial, ou representativas da comunidade escolar das escolas públicas estaduais e municipais da educação básica ou, ainda, unidades mantidas pela Campanha Nacional de Escolas da Comunidade – CNEC; cadastradas junto ao Ministério do Meio Ambiente para recebimento de recursos oriundos de programas ambientais, doados por organismos internacionais ou agências governamentais estrangeiras; prestem atendimento direto e gratuito ao público na área de saúde; qualificadas para o desenvolvimento de atividades esportivas que contribuam para a capacitação de atletas de alto rendimento nas modalidades olímpicas e paraolímpicas'
      if(cod===43) return 'Subvenções Sociais - utilizado para transferências às entidades privadas sem fins lucrativos que exerçam atividades de natureza continuada nas áreas de assistência social, saúde e educação, que prestem atendimento direto ao público e tenham certificação de entidade beneficente de assistência social nos termos da legislação vigente;'
      if(cod===45) return 'Subvenções Econômicas - utilizado para transferências, exclusivamente, a entidades privadas com fins lucrativos. Destinam-se à cobertura de déficits de manutenção ou funcionamento de entidades da Administração Indireta, a ser concedida com base no interesse público.'
      if(cod===81) return 'Distribuição Constitucional ou Legal de Receitas - utilizado para transferências aos entes da Federação em decorrência de determinação da Constituição ou estabelecida em lei.'
      if(cod===22) return 'Execução Orçamentária Delegada à União'
      if(cod===32) return 'Execução Orçamentária Delegada a Estados e ao Distrito Federal'
      if(cod===42) return 'Execução Orçamentária Delegada a Municípios'
      if(cod===72) return 'Execução Orçamentária Delegada a Consórcios Públicos'
      if(cod===30) return 'Material de Consumo'
      if(cod===31) return 'Premiações Culturais, Artísticas, Científicas, Desportivas e Outras'
      if(cod===32) return 'Material, Bem ou Serviço para Distribuição Gratuita'
      if(cod===33) return 'Passagens e Despesas com Locomoção'
      if(cod===34) return 'Outras Despesas de Pessoal decorrentes de Contratos de Terceirização'
      if(cod===35) return 'Serviços de Consultoria'
      if(cod===36) return 'Outros Serviços de Terceiros - Pessoa Física'
      if(cod===37) return 'Locação de Mão-de-Obra'
      if(cod===38) return 'Arrendamento Mercantil'
      if(cod===39) return 'Outros Serviços de Terceiros - Pessoa Jurídica'
      if(cod===51) return 'Obras e Instalações'
      if(cod===52) return 'Equipamentos e Material Permanente'
      if(cod===20) return 'Transferências à União'
      if(cod===22) return 'Execução Orçamentária Delegada à União' 
      if(cod===30) return 'Transferências a Estados e ao Distrito Federal'
      if(cod===31) return 'Transferências a Estados e ao Distrito Federal – Fundo a Fundo'    
      if(cod===32) return 'Execução Orçamentária Delegada a Estados e ao Distrito Federal'
      if(cod===35) return 'Transferências Fundo a Fundo aos Estados e ao Distrito Federal à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar nº 141, de 2012'
      if(cod===36) return 'Transferências Fundo a Fundo aos Estados e ao Distrito Federal à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012'
      if(cod===40) return 'Transferências a Municípios'
      if(cod===41) return 'Transferências a Municípios – Fundo a Fundo'
      if(cod===42) return 'Execução Orçamentária Delegada a Municípios' 
      if(cod===45) return 'Transferências Fundo a Fundo aos Municípios à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar nº 141, de 2012'
      if(cod===46) return 'Transferências Fundo a Fundo aos Municípios à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012' 
      if(cod===50) return 'Transferências a Instituições Privadas sem Fins Lucrativos'
      if(cod===60) return 'Transferências a Instituições Privadas com Fins Lucrativos'
      if(cod===67) return 'Execução de Contrato de Parceria Público-Privada - PPP'
      if(cod===70) return 'Transferências a Instituições Multigovernamentais'
      if(cod===71) return 'Transferências a Consórcios Públicos - Rateio'
      if(cod===72) return 'Execução Orçamentária Delegada a Consórcio Públicos'
      if(cod===73) return 'Transferências a Consórcios Públicos mediante contrato de rateio à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar nº 141, de 2012'
      if(cod===74) return 'Transferências a Consórcios Públicos mediante contrato de rateio à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012'
      if(cod===75) return 'Transferências a Instituições Multigovernamentais à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar nº 141, de 2012'
      if(cod===76) return 'Transferências a Instituições Multigovernamentais à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012'
      if(cod===80) return 'Transferências ao Exterior'
      if(cod===90) return 'Aplicações Diretas'
      if(cod===91) return 'Aplicação Direta Decorrente de Operação entre Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social'
      if(cod===93) return 'Aplicação Direta Decorrente de Operação de Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social com Consórcio Público do qual o Ente Participe'
      if(cod===94) return 'Aplicação Direta Decorrente de Operação de Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social com Consórcio Público do qual o Ente Não Participe'
      if(cod===95) return 'Aplicação Direta à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar nº 141, de 2012'
      if(cod===96) return 'Aplicação Direta à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012'
      if(cod===20) return 'Transferências à União'
      if(cod===22) return 'Execução Orçamentária Delegada à União - Transferências a Estados e ao Distrito Federal'    
      if(cod===31) return 'Transferências a Estados e ao Distrito Federal – Fundo a Fundo'
      if(cod===32) return 'Execução Orçamentária Delegada a Estados e ao Distrito Federal'
      if(cod===35) return 'Transferências Fundo a Fundo aos Estados e ao Distrito Federal à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar no 141, de 2012'
      if(cod===36) return 'Transferências Fundo a Fundo aos Estados e ao Distrito Federal à conta de recursos de que trata o art. 25 da Lei Complementar no 141, de 2012'
      if(cod===40) return 'Transferências a Municípios'
      if(cod===41) return 'Transferências a Municípios – Fundo a Fundo'
      if(cod===45) return 'Transferências Fundo a Fundo aos Municípios à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar no 141, de 2012'
      if(cod===46) return 'Transferências Fundo a Fundo aos Municípios à conta de recursos de que trata o art. 25 da Lei Complementar nº 141, de 2012'
      if(cod===50) return 'Transferências a Instituições Privadas sem Fins Lucrativos'
      if(cod===60) return 'Transferências a Instituições Privadas com Fins Lucrativos'
      if(cod===67) return 'Execução de Contrato de Parceria Público-Privada - PPP'
      if(cod===70) return 'Transferências a Instituições Multigovernamentais'
      if(cod===72) return 'Execução Orçamentária Delegada a Consórcios Públicos'
      if(cod===73) return 'Transferências a Consórcios Públicos mediante contrato de rateio à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar no 141, de 2012'
      if(cod===74) return 'Transferências a Consórcios Públicos mediante contrato de rateio à conta de recursos de que trata o art. 25 da Lei Complementar no 141, de 2012'
      if(cod===76) return 'Transferências a Instituições Multigovernamentais à conta de recursos de que trata o art. 25 da Lei Complementar no 141, de 2012'
      if(cod===80) return 'Transferências ao Exterior'
      if(cod===90) return 'Aplicações Diretas'
      if(cod===91) return 'Aplicação Direta Decorrente de Operação entre Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social'
      if(cod===92) return 'Aplicação Direta de Recursos Recebidos de Outros Entes da Federação Decorrentes de Delegação ou Descentralização'
      if(cod===93) return 'Aplicação Direta Decorrente de Operação de Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social com Consórcio Público do qual o Ente Participe'
      if(cod===94) return 'Aplicação Direta Decorrente de Operação de Órgãos, Fundos e Entidades Integrantes dos Orçamentos Fiscal e da Seguridade Social com Consórcio Público do qual o Ente Não Participe'
      if(cod===95) return 'Aplicação Direta à conta de recursos de que tratam os §§ 1º e 2º do art. 24 da Lei Complementar no 141, de 2012'
      if(cod===96) return 'Aplicação Direta à conta de recursos de que trata o art. 25 da Lei Complementar no 141, de 2012'
  }

  function elementoDespesa(cod){
    if(cod===1) return 'Aposentadorias do RPPS, Reserva Remunerada e Reformas dos Militares'
    if(cod===3) return 'Pensões do RPPS e do militar'
    if(cod===4) return 'Contratação por Tempo Determinado'
    if(cod===5) return 'Outros Benefícios Previdenciários do servidor ou do militar'
    if(cod===6) return 'Benefício Mensal ao Deficiente e ao Idoso'
    if(cod===7) return 'Contribuição a Entidades Fechadas de Previdência'
    if(cod===8) return 'Outros Benefícios Assistenciais do servidor e do militar'
    if(cod===10) return 'Seguro Desemprego e Abono Salarial'
    if(cod===11) return 'Vencimentos e Vantagens Fixas – Pessoal Civil'
    if(cod===12) return 'Vencimentos e Vantagens Fixas – Pessoal Militar'
    if(cod===13) return 'Obrigações Patronais'
    if(cod===14) return 'Diárias – Civil'
    if(cod===15) return 'Diárias – Militar'
    if(cod===16) return 'Outras Despesas Variáveis – Pessoal Civil'
    if(cod===17) return 'Outras Despesas Variáveis – Pessoal Militar'
    if(cod===18) return 'Auxílio Financeiro a Estudantes'
    if(cod===19) return 'Auxílio-Fardamento'
    if(cod===20) return  'Auxílio Financeiro a Pesquisadores'
    if(cod===21) return 'Juros sobre a Dívida por Contrato'
    if(cod===22) return 'Outros Encargos sobre a Dívida por Contrato'
    if(cod===23) return 'Juros, Deságios e Descontos da Dívida Mobiliária'
    if(cod===24) return 'Outros Encargos sobre a Dívida Mobiliária'
    if(cod===25) return 'Encargos sobre Operações de Crédito por Antecipação da Receita'
    if(cod===26) return 'Obrigações decorrentes de Política Monetária'
    if(cod===27) return 'Encargos pela Honra de Avais, Garantias, Seguros e Similares'
    if(cod===28) return 'Remuneração de Cotas de Fundos Autárquicos'
    if(cod===29) return 'Distribuição de Resultado de Empresas Estatais Dependentes'
    if(cod===30) return 'Material de Consumo'
    if(cod===31) return 'Premiações Culturais, Artísticas, Científicas, Desportivas e Outras'
    if(cod===32) return 'Material, Bem ou Serviço para Distribuição Gratuita'
    if(cod===33) return 'Passagens e Despesas com Locomoção'
    if(cod===34) return 'Outras Despesas de Pessoal decorrentes de Contratos de Terceirização'
    if(cod===35) return 'Serviços de Consultoria'
    if(cod===36) return 'Outros Serviços de Terceiros – Pessoa Física'
    if(cod===37) return 'Locação de Mão-de-Obra'
    if(cod===38) return 'Arrendamento Mercantil'
    if(cod===39) return 'Outros Serviços de Terceiros – Pessoa Jurídica'
    if(cod===41) return 'Contribuições'
    if(cod===42) return 'Auxílios'
    if(cod===43) return 'Subvenções Sociais'
    if(cod===45) return 'Subvenções Econômicas'
    if(cod===46) return 'Auxílio-Alimentação'
    if(cod===47) return 'Obrigações Tributárias e Contributivas'
    if(cod===48) return 'Outros Auxílios Financeiros a Pessoas Físicas'
    if(cod===49) return 'Auxílio-Transporte'
    if(cod===51) return 'Obras e Instalações'
    if(cod===52) return 'Equipamentos e Material Permanente'
    if(cod===53) return 'Aposentadorias do RGPS - Área Rural'
    if(cod===54) return 'Aposentadorias do RGPS - Área Urbana'
    if(cod===55) return 'Pensões do RGPS - Área Rural'
    if(cod===56) return 'Pensões do RGPS - Área Urbana'
    if(cod===57) return 'Outros Benefícios do RGPS - Área Rural'
    if(cod===58) return 'Outros Benefícios do RGPS - Área Urbana'
    if(cod===59) return 'Pensões Especiais'
    if(cod===61) return 'Aquisição de Imóveis'
    if(cod===62) return 'Aquisição de Produtos para Revenda'
    if(cod===63) return 'Aquisição de Títulos de Crédito'
    if(cod===64) return 'Aquisição de Títulos Representativos de Capital já Integralizado'
    if(cod===65) return 'Constituição ou Aumento de Capital de Empresas'
    if(cod===66) return 'Concessão de Empréstimos e Financiamentos'
    if(cod===67) return 'Depósitos Compulsórios'
    if(cod===70) return 'Rateio pela Participação em Consórcio Público'
    if(cod===71) return 'Principal da Dívida Contratual Resgatado'
    if(cod===72) return 'Principal da Dívida Mobiliária Resgatado'
    if(cod===73) return 'Correção Monetária ou Cambial da Dívida Contratual Resgatada'
    if(cod===74) return 'Correção Monetária ou Cambial da Dívida Mobiliária Resgatada'
    if(cod===75) return 'Correção Monetária da Dívida de Operações de Crédito por Antecipação da Receita'
    if(cod===76) return 'Principal Corrigido da Dívida Mobiliária Refinanciado'
    if(cod===77) return 'Principal Corrigido da Dívida Contratual Refinanciado'
    if(cod===81) return 'Distribuição Constitucional ou Legal de Receitas'
    if(cod===82) return 'Aporte de Recursos pelo Parceiro Público em Favor do Parceiro Privado Decorrente de Contrato de Parceria Público-Privada - PPP'
    if(cod===83) return  'Despesas Decorrentes de Contrato de Parceria Público-Privada - PPP, exceto Subvenções Econômicas, Aporte e Fundo Garantidor'
    if(cod===84) return 'Despesas Decorrentes da Participação em Fundos, Organismos, ou Entidades Assemelhadas, Nacionais e Internacionais'
    if(cod===91) return 'Sentenças Judiciais'
    if(cod===92) return 'Despesas de Exercícios Anteriores'
    if(cod===93) return 'Indenizações e Restituições'
    if(cod===94) return 'Indenizações e Restituições Trabalhistas'
    if(cod===95) return 'Indenização pela Execução de Trabalhos de Campo'
    if(cod===96) return 'Ressarcimento de Despesas de Pessoal Requisitado'
    if(cod===97) return 'Aporte para Cobertura do Déficit Atuarial do RPPS'
    if(cod===98) return 'Compensações ao RGPS'
  }

function subitemNatureza(item){
  var value = 'Código a ser detalhado no momento do empenho e da liquidação da despesa, de modo a especificar o elemento de despesa. Na União o desdobramento da natureza de despesa é feito, obrigatoriamente, até o nível de subitem, ficando composto por oito dígitos.'
  const descricao = categoriaEconomica(item.categoria_economica) + 
                    grupoNatureza(item.natureza_despesa) + 
                    modalidadeAplicacao(item.modalidade_aplicacao) + 
                    elementoDespesa(item.elemento_despesa) + 
                    value
  cadastrar("Petiçao", descricao, "Anônimo", " ", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhMTExMWFhUXGBcaFxgYGBcXGhUVFxcWFxgVGxcYHSkgGBolGxUVIjEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAEQQAAEDAQYDBQUGAwcCBwAAAAEAAhEDBAUSITFBBlFxEyJhgZEycqGxwQdCUmLR8COy4RQzgpKiwvFD4hYkJVOjw9L/xAAaAQACAwEBAAAAAAAAAAAAAAAAAgEDBAUG/8QAMBEAAgIBBAEDAgQGAwEAAAAAAAECEQMEEiExQQUiURNxMmGRwRQkQoGx8CMzofH/2gAMAwEAAhEDEQA/ANotpzgQAIAEACAH7LSDiZ5JW6GirHHte32SSPkhU+yeV0cNpuLtc4meqOKCnY5TxDDDsyMxGgCgnk5rteQJI5hSqBpsipisl2B+ZHmkkPBk5IWAgCLbKuRHinihZPggJyoEAKgBEACABAEhzsLQ3c5npsl7Y3SoZa0mY21TEUd0aBcSJhQ3RKVlk1sABVlopUARa9nc7OR0+idMRxsjuszgJKm+eBdro5ouMwCc+SlkJiOccwUA7OFJAIAEACABAAgAQBKoWSRJMJHIdQFfYjsQVO4HBjJoOmIU2hdrHWUajdN/6/vzUWmNTRIspMQdvX5JX+Q8fzGrSIILTnopiLLuxHHCWug6Q7qNUL4D8x/tRIEevJRQ1oi2ugG5jTkmi7EkqGqDoOsKWhU+S0BVRcKgkgWt2xgn5eCsiVSZFTCGVvS/3uxMZDWzGITiIG87ArFkzt2kdLFpoqpS7KKraajSC17geYcQqFJrpmrZF8NF7cHEpxtp2g905CpoQfzbR4rRj1D6kZM2kXcf0NfWoFu2XNa00zA4tDYCkgdcS8jLPTr+iXonlj9BkNcDkd+n6aqHyxkqRIDRlHP/AJSj0OKABAAgDl7QQQVKA5ZRaMwM0WRSCpSBEH9lCdEtWRq1j0w+clMpfIjh8DYsjvBTuRGxjVRpGREEfFShXwcKSAQAIJOmjMbIBFpSJ3IMbhVMuR2oAEACCTipSadRKmyKE7FuWWiLCkK9owkRkgCFXLi72YIG/LPNOuEVu2yTVAwgOzHPllqlXY76INIjEOUpypdloSqi4gWi1TkJCsUSuUrG6NEu0KluiErIl8k06dQzmGn1IhJOXsbHxxvIkRbu4ZoOs7MYONzQ4uBMjEJAA0ynkuNLI1I7yimiFW4Ikj+P3fczj/NCl5vyBYzu+eF7OyzPNNpxsbixEkl0ZkHbSdkkcrcuRnBJF3cFqc6y0CRiJZB593u+ei7GPmKZxM3tm0WNOzgROcTHISnbK1EeSknL2yImOfRSDOoUACABAAgAQAIAEACABBJHq1GOkHZMk0I2mQCrCsRBAIJFHJAFpQDY7uiqdlqrwcG0t5ophuQ61wOYMoolOzpQAIAEAQLbVOKNh81ZFFc3ycUG4nQZQ+CI8scrBw7gzEGOnJCrsZ2uCImKyYbUCwjePVJt5LN3BDTlYrXEaGEAMW2z9pTeyYLgQCee0+cKrNex0XYGvqK2P2es9gDHPpswhohzTn3G54sYBzJGXJcak+TubndDb7yfMTRw9pgxyY/u+0mJ8vaUvHHvkhZJXXAlpqPqNLGvpvxh7ThacpY7PFiIGceqVKKt0PcuFZZ3XZBSo06euBoE8yNT6rq4r2Kzj5q3uiUrCoRACoAEACABAAgAQAIAb7Zv4h6qaYWhltpJJ5Dfw/VTVC7hKttH3dfFSokOfwQ3OJMlOIIUECIAEEioIO2vjTXnyUNWNdHBKkU6pPIIKhqyU6LVjgQCFWXXYqgAQA1WoB2uvNSnRDjZHo0CHxOgnrtCZvgWMaZMSlhXWmhhM7H9wrE7KZKhhSKCABAHdKmXGAoZKRYU3SAVws0Nk2j0OGe/GmI8KptlqSEaJTYoOc0hcs1CDZIXbOCCAEQAqABAAgAQAIAEAR7WHEQNN/0TRoWVleQrCpkqo8CmBzH7KRdljfBFTlYiABAAgAQAIAEACABAEyw1D7PmkkiyDJqQcEACCRI3QQcVSYy/5UoHZCqVcQOImduXROlXRW3fZHTCAgAQBGtN5Uqft1A08pz9BmimyS/s9mf2YfMgtBHQxB9Fh1cFKLdcm7RzcZpXwzh65LOyh5tGGGodACT0Ekn4LqaTGlBOuTk6vI3NxvhFdYL8stYgUqrXE/dzDv8AKc1scGjGpIsUpIIAEACABAAgAQAIAZtVSBHPJTEhsrnmST4q0qYkoIEQAIAEACABAAgAQAIAEASLE6HdRCWXQ0eyxVZcCCAQAjnACUAVlauXGdFalRU3Y0pFBAAgCg4kvgs/hUzDvvH8IOw8U0UBkzmrAPUeEOJv7Q9tAU8Ip0R3iZLnNwN0GgzKyzhSstjIjW6wuN50RigS6pEnMAA4Y67cly5Y7zpHehnrQydc9D3GXFH9lf2LqeJlWk7MGHNJxN0ORGnJdWEN3RwJSpnkLCRBGRGhGx5rUVHovBPEprfwKxmoB3HH74GoP5h8R0WfJCuUWwlfBr1UOCABAAgAQAjigBg2nJ0DMbfvkmoXdwRGEuMnYa8oCZ/AnLdjbnEmSpRFnKkgEACABAAgAQSCCAQAIAEAKCgCfZrROuvP5KtotUiTCUYYdamDeU21iuSKS++J7PSOAuJMZhokjwOwUWo9jbZSXBGsd806vsEHwmHDyKdST6K5Qa7LCnVB0TCnSCBu01gxjnnRoJ9EAed1qpe5znauJJ6lWgcIA0f2fWkMtrAfvtezzjEPi0eqryr2jQ7NXbKv/q1Ho8f/ABSuRJ/zKO9CP8hL/fJkftStIdbQ0f8ATptB94lzvk5q7GFe04E+zHq0Ucs1d1N7XsMOaQQfEZqGrBHs9221takyq3R7QY5HceRkeSyNU6NCdklQAIAEACABAFU8w4xpPqOStKX2I+qTlOXJFA2cKSAQAIAEACABAAgAQAIAEACABACgwgCws1cEQTmq2uS2MuCrvSp2FKpUfo0Zfmccmt8zClzSREcbbPOH1m9k5xeHVajjjaWZtaDixtedCTkY2WVu+TYlXBmKtqd2mNri0j2SDBEIA9VuC1uq0qNQ+05onroT56rVF2jHNU6LxOIU/FdbDQj8TgPId76Jo9kGMTgCAHbJaHU3sqN1Y4OHVpn6IatUSbu3VpvSzu2NQjyNMN+q4MuNQvuelxx/kJfb9zzy/LW6raK1R2rqjvQGGjyAA8l34qkkeZfZCUkAgDecC2ybO6nniY/KMu64T8w5VTXNjJ8Gps1pIMHOT6KtxGjImveAJKQsYxRtcuiIGyZxFU7H3ugExKUYrLxvFzab3NAMNJGuZAnXZNtor3W6M3QqXhVDXmpRptcAYY0uMHOJcYmFKjJ+Qc4J9FobqeRnaKk7RDR8FDi/klZF8EiyvxMaTqWgnrGaZdCPscUkAgAQAIAEACABAAgAQAIAEACABAGN41vIucKAPdZ3neLyMh5A/HwWfLLmjVhjxZjrxrYWxucvLdVFxFue73WitTot1ecz+Fozc7yAKlKyG6PZbHYOzAAHdaAGxpAEfJaotGOVkhMIZvjN+VIe+f5R9SmiBR3RZe1rMYdJk+6Mz8o80zfAE7i2mBaJAAxMaTGkiW/7Qoh0S2UxTEG+sN0VqtSyWmR2bWtqud7oaSyNZJaR0z8Fxsmnk89+LO9j12NaRwfdVX7nmJdOfPP1XbOASbss/aVqVPZz2NPQuAPwlQ3SBdl1x5d7aVplgAbUaHADIAiWuA9AfNJjdoaapjvAb/4lUc2g+hj/AHKZimzVZJItFXEB4a9T/wAfFKkO3YxCYQlstRbrmIEdRkUu2yzdQ1Z7O2pia4xIMDnMqnPklBKlZbp8ccknudFHc/8AcsG7QWHqwlh/lWnFLdFMyZo7ZtF3ROQ6KGSujm5rIH4mkwGucPVxj4Qs2bN9NKjXhw/Ubb+BtaF0ZgUkAgAQAIAEACABAAgAQAIAEAcVqoaJKpz54YY7pvgvwaeeeeyC5POL6ouFao4zDnuIdsQTIz81khnx5eYOzdk02TDxNUZW11sTidtB0VhUehfZlc+FjrQ4d6p3WeDAcz5uH+lWQXkrm/B6SxsABOVEOrYzsfJOpCOBkeNqDh2RIy7w8zBHyPorYMRogcJ1AK8HdrgOsg/IFTLogf4xb/Epn8p+B/qiIGfTAejXDeMXRWdOdJldvnBc3+dqzyX/ACFiftPKQtRUW/CLZtlDwcT/AJWud9Es/wALJj2W/wBolqD30RuA49A4iP5SlxqkTJ2xjgNh7WqdgwDzLsv5Spn0KbRVkggBUAPufib4g+vj1S+R7tCPwFoHskwCdvEpZWrY0Wnx0R3XVTosOCril7jBgkYyXHTxPxVWmzSk9rQ+rwxityY5ZT3VqkZYki5WkVa/I4D6iP8AaVztY+UdTRJ0xm00sLiPTpsteGe+CZizQ2TaGlaVAgAQAIAEACABAAgAQAIAEAVd41pdA0HxK8x6rqN+XYuo/wCT1fo+l+nh+o+5f4La9LPZ6rXCp2fewhrmRDQ5rgCYnEC9pAaQTBGc5K6WPFl/DxKlyiMcskaVWvKfn9fyffRh7TwbZGWhjXOLmuiWtJbhJ2e0iW9AZ6KMOqyY8yw5Huvz5X3F1GjxzwyzY1tr+6f2PQrtoU2tAYIDQAANAAMo8l3KPPk1BAIJKO/KArscw5fhPJw0P72VseCmTtnnlRj6b4Mte0+hGhV3YpbAVrc5jQ0AsEPd90A6EjbQ5BVZMkcStluLFLI6Q5fnDLqFMVGuxge3lGE8x+X5KrDqvqOmqLs2leNWnZTOvWqyhUoNIwVS0u590zkdpynotW1N2ZL4olcNcMutIc9ziymMmkCS53hOw5rJqtYsLpK2a9No3mVt0gNkrXdaGVHtDxDgwgw1xLCOojForMOeGePHZXmwTwv3dFLbLU+q9z3mXHX9B4LT0ZzfcL3caNEYhD3953hyb5D4kqqTtkot0oAgAQAqAEqkkZkn4qKJstqGKpROTAC30jyyXMtQzc2dRp5MPgobHeFHMB7TH4Ti/lldSUkcmEJfBKuG8adSu8UzP8MSYIHdcY198rn6xp1R09EnG0ybew7zTzHyP9U+iftaK9cqkn+RAW0wggAQAIAEACABAAgAQAIJBBBn70t1KhVaCZJl2YkATGfXP0XndX6bKM3PHz5o9Lo/U4zx7MqrxY2L1aQX0HuYTl3Hd1zZ8OS4+TI8bdXFncx445ErqUQuujJLj0HXcrq+i6a280vsv3OR69qqjHBH7v8AY2d2MimB1XoZHm49EpKSRrRagJAGaZRFlKigvS2upluGM518IV8IplEnRSXi8VoxtAI3GRjl4hOopC72PXVbn2dpYzCQTPeEmYA1EZZKrLpoZHci/Fqp41SJda/qrmlpDIIIOR0IjcqtaLGnfJY9fkargzde7WGM3eo/Ra0jI5surFfdWlTZTaGYWgASDMDnB1WPJ6finJybfP5mvH6hlhFRSXH5DV7Xm+0UzTeGhpIOQzyM6kmE2HRY8Ut0Wxc2uyZY7WkVlhsrKbw8DERoHZgHnAjMLU42Zd7NPdN4vqOIcBAE5A8x4qucElwPGTZaKsYEACAEc4DUgdckEolWGm10nWORy+CWTGjH5Il7XFRqlpqBzmiRAe5oIOoIac1TKNl8ZuP2J13XRY2iGUhkIhxc+APfJyWHL9SPbN+J45dItKdJrRDQAPAAfJZ27NCSRKo2MOgvAI1APzWrBBr3GPUTi/aZTiO8bNQrdm0kn7wAkUydp+my6EG65OZkaT4BrgQCMwdOisFFQAIAEACABAAgAQAIAWDnkTHJJPJGH4mWQxTyfhVnknEN5Go57zq85Dk3YeQgLM3bs1xjtVGk4IuYCjieO9VId0YPZ9RJ8wplpseWNZEmRHV5cMrxyaNfSsjGxGQGgV+PFDHFRgqRmy5Z5ZOc3bZeWdsNAPJQ+yV0U1p4usTXFvayRuGuLZ94CD5JdyH2sWlaG1Bia4OB3BB+SuTT6M7TT5Kq/wDVnQ/RXY/JXIrqNTCZict07ERINrGXdjP4Z/Q/pCXaNuG+3HLYD0+hGSmiLFfbGgjuTnOcTv8ACDHojaydyGmWwCJbORnzJM59R6I2kbgNrb+HodxOLn1Hp6G1huQxXqB0eAA9BqmSoVsseHfbd7v1CTJ0PDsv1SWAgCj4jvo0RgZ/eETOuAc43KrnOi3Hj3cs85ttWo5xNRznO5uJPpOgVds1JJHVgt9ai7FSqOYfynXqNCPAoCj07hfiw2lha4AVWjvcnD8QHzG3mnjyUZLiXtJwcRGTv3oiURYzLK7Pbh7tsgfvFUTwx7o0RzTqrIHGfFAs4NGkQaxGZ/8AbB397kPPlLwjZny5dvC7PMnOJJJMk5knMknUlXGQubgvTAezee6fZP4Ty6KUxos06YcRAAgAQAIAEACAFaJySTmoRcmPjg5yUV5OL4stZ9Ps6LgzEYe8zLWRnAGpK4f1t89+Tn4PQ/Q2Q2Y/7lbYOCrGwhz29s7m/wBkdGaesqJ6mcuuEENLCPfJd2poaw4WjIcgICfTZH9RWxNXij9F1FEWi4kSV3Dz5G45vPsrNgBh9XujmG6vPpA/xKibo0wVnn97MbSaxk03YW4i+mScWLMNdtLYjzVRcZ6wXrWo1O1puIdMkbOH4XDcKVJpkSipKmeo3tVD20XjRzcXqGn6roYnaOdkVOiuVpWCABADdVCIZX17RUJeKTQezbieZGTRAOROeoWbLncXUTTiwblcisffNUHRp8j+qqWpmW/w0C1u62iq2YgjUfvZasWRTRlyY3Bl/wAO+273fqFOToiHZoFSWCoAw1qq2d77U6sXdpiIpRp3TAnyCzSfJugqiUFroEjTPZAxXIILfhGsW2ujH3iWnxBB+sHyTQ7EyK4nqSvMZzaBMOBOIbz55KKGsxV6UntqOLiSXEuxH70mZ6paopknZFQQCANJw/emKKTz3h7J5jl1TJjxZeKRgQAIAR7gBJIA5nJBJXWq/rMz7+I8m9746fFBO1nfDd6Ntdo7EDAMLiCcyS2Mo2ynfZLJ7VY8cdsvnWbA5w1IJErjarUTm3HwdrSaWEEp9sVYzeCAIl41W4CJz8PqtGlX/LHgzav/AKZEWxaDqu8eb8mH4xvPt7S6DLGdxvl7R8zPkAssnbNsVSMrelWAG88z0/fySjDdyXf29enS2cRi8GDNx9PmFMVboWTpWepX60A0wMgAY8Bkuhj8nOmVatEBAAgBm0nI9Cggz9K0U2isHUw8uEMcSR2Zn2gN/wCi5c37mdOHEUVdfVKMW3DYzqdG/Va9L5Muq6RseHfbd7v1C0ZOjPDs0CpLBUAYC+7OaVoLokF2IToc5I9VnmqZsxyuIX7ewtDmEUwzC2Mt/EpSwz9so/eHn+qkgt+B7CX2gVI7tOST+YggD4k+SeC5sqyySVHo6uMoIArb1sIe0j0PI/ooYNWZKowtJBEEaqCoRQAAkZjIqQNBZ+IwGgPYS7cggT4qbG3EWtxY/wC7TA6kn4CFJdtIFfiC0u+/h90AfHVSTtRXVqz3GXOLj4kn5qBuBx9dveDWABwGuZEcis0cE3tc5NtN9efuWuceVFdkvhe8G0bZZ3lwH8RrT0f3D8HLRNXFlcXTPUOIqjmVcgIcAfPQ/JcLUxqd/J3tG7x18FUbY/wCzmvaM1K5Orv30Twxyl0iueXHD8TRHfU2XR02klCSlL9Dl6vXRnBwh+olse5lnqub7QY8jqAc10H0cpcyR5qshtKO0VcTifTpsgDc/ZxdmTq5Htd1vutOZ83Zf4VfijxZnzS8Gkv/AFZ0d9Fqx+TJMqlaICABADFsPdKh9AuzLErlvs6a6ItbUqCUXXDbe68+I+AP6rbpemY9U+Ua3h323e79QrsnRTDsvLRXYxpc9wa0alxAA8yqLotSb6I1hvezViW0qrHkbAiY5xrChSTJcWuzi9LvZVbDhI+IPMIavsmMnF8GYr8OVAe45rh4yCq3jZesy8ka03M9jZeRBMQJPrkr9Pp/qSpso1Gq+nG4oLnsdanVpvpgtZjDcRBw944QHeBOU8/FdaaxLG4Kv/hx4yyyyKbb/wB/Y3NhtbarGvbodQdWndp8QVy8mNwltZ04TU42h9IMDhOSAM9ft3z3wMxr4t59QoZEl5M+lKxUACAKk2xviraNVnDrdyHxRQWNutb/AACmgsadUcdSUUQcZ7ZH5KQParxvanaaNmex0vLQXCIjE0EieYIWL6EXL3I0vUShGoOrIAszufzVqxRXhFDzzf8AU/1FbZOZT0Vt2PMotGyCCvgVrQ2mXFrZwyNzyHiTAXNz5HPJSfRjv6mZRukU3EHBp7LHRMh2QAEOjE1hPZ/eGJzRLCR3gl3Sir7R0M0dTpb3e6Krrvnr+/5dmPsnC1d9Ts3FrIOZOvjDTnPhkrsc1N15DHrMc+F38M9QuqyNpU2saIAAA6D67rclSElK3YzbbC+tUIxsY1gbmdSXT/8AkqHNx80PHHu6i2yNaOGAQJtLwIJOFuHLnJnLI9VCyRkrcn89DPDOLSUFy0uXzbKV9lpU30nUatSoyq1475zxMLdoHNTp80Mi3QdonWabNp5PHljUlXXwyQtZhI1v9n9+CWXTBdmYIjJcxqnR007VkSpqVBJoOH6ZFMk7uJHSAPoVv0yqJh1LuRqOHfbd7v1CsydFcOyj4xqOqVqjCe5TDQBOuIAkgbnP4LBkfuo34kttmGp1H03hzSWvYZBGxG6rXBa+ez2u6raK1GnVGj2g9DuPIyPJbE7VmGSp0SDSadlJBHtlla5pEZbqYycXaFlFSVMonMrPq06YJFcEhj2gQ6lDnYSwCDEEYYggwdAt8ZQ2OX9P+GYJRnvUf6vH2JTbO6yRWe8ltV57Wm9nZvpOLnAVcMnulwcMto1ySSks3siuUuH3f5FsYvD72+H2uq/MvQViNYIA4rU5CCTI3vYsDsQHdPwPJKyuSICgUEAZpXmkEACAHKFB7zDGlx8AT8lAFrZeGbS7UBg/Mc/QSo3IDb8P2HsqTaZdiLd4jIknSdkt2Ky1QKCAG7Q4hriMyAYSZG1BtCzbUW0Ut2ucKgc1zWubm3FmCeXpK4sbuzn4nKM9ydNEqtfjqeLtKbwRiDOzOBhY5tIdnPtMaOxae6Z2y1TPLXZ0cfq88MZ74W27TfVr/fzIFgqVbTXNWo6cIA5AbBoHICVdpIueTe/BgwSnmyvLNmka3YBdRtJcnRSb6ObPSBrFpnNk8s2lzf8A7Skljjk4Zbjzzw24/b/f0JtSztbEePoc4y1315qzFp4R+SvUazJPuv8Afj4Ka86lKg+y1XANYyo4ZNEDHTfoBvIHqk1OFLGoY1XPgbS6iUsrnlbbrtlFare6vVqVS3C1xGEbwBGfjkFbgxvHBRK881Oe4SzUw6rSY4SHEyPAAn6Kn1DK8WmnKPdD6PGsmeMX0aR90Wd2tCmT7jZ+S8QtVnb4m/1PV/QxJfhRV/8AhaymXOpNEkYY07wxAmDynLaF0sebOo3KX7mSWLE3SiVlsotY7C3SNtNxl4ZL0XpmeebDc+06OF6hhjiy1HyrJ3Dvtu936hbcnRlh2VvF1ANqdoWhwcC3OciR3XZbjP0WLKubNuCXFGEvSlDg7n8x+wqS83H2ZXjNOpQJzYcbfddqPJ2f+JX4pWqM2aNOzaq4oBAFfbqDg5tSmcNRhlh5HcHwIVmOaXtl0+xMkW+Y9rozHHnEdsrNYyq1rY7wDWwDtOpk+GiHlx6a/pct+WTHFk1POXhLwjQ8MXwy1UA8QHNhr2j7rgNvynUf0VEZqStl0sbi6RbJxAQQQ7fZQ5pB0Ov6qCezIWmgWOLTt8RzSlLVMaQBV2W47S/SmQObu7881daNJb2XhE/9SpHg0fU/ol3BZc2Phuzt0p4jzd3vhp8FFtkWW9KxwIENHIfoFBFj7bM3qpIsda0DQIIOggDutRLTB/cKnDnjlui/Ngliq/JGtL4aT+wrWUo82vW/Kgc97TkTDQdI0GXQSsOSEZuy6WlxzVNf38lpc1G0WizdtADQ8tALtYgFwnaZHkVilie/ZHk5+f0vLGG+LuJqLjsnZs8d+v8ATJdXT4vpwryWYMX04V58lzYquF7T4wehyTZo7oNGrDLbkTOLe7DbqI/HSqeogn4NCp0M/bRo10EnZPrjJdOPZyp9DX9ko1GEVafaQQQIkSNMjlPVYdfOcap0jd6fCDu1bMXeLv49UCmabQ6A07ZCdMtc8ua0adt41bsp1CSyOlQXWJtFLwDz/pWH1l1pJf2/yavS1eoRtWuY1pzJkcs/nsf3ovKReKEe+z0LU5S66M3aLS55zP8AWJgmNTmc0Sm5dkxiolPbz3/IL1no0a0q+7POeqP+Yf2RN4d9t3u/ULo5OjFDsl8SWPtKLo1GnXUfHLzWaatGjG6Z5pbaWJh5jMeSymw44UvHsLVSeTDScD/dflPkYPkmg6YmSNxPZFrMQiAO6TQTBErJrJuGO4ujZooRnlqSsZva4qFobhe2IzBbkQfkuWtTkXbs7D0mJ9KjH0rhtd21+3og16JyqNaO/gmZwbkaiJ30lWvLHLHa+GUrDPDLcuUbmswRiGh+q06PUuT+nLvwZNdpVFfVguPIyuic0CEAUt83fjGXtD2fEclDQslZmUpUbhtlG5TUaLHW0mjZSQdoIBAAgAQArRJSZJqMHJlmKDnNRRJtUkjc5rmaGcYbpSZ1fUMcpbYRRnuMbV2Vnwz3qndA/L94+mX+JaP4pZG1FcfJm/g3jSlN8/BgLFw/a7a54s7AW0oxEuDQHO0GepgKJTUexoxb6PRaF3voMZQjKm0ADY/my3Jkq/CoNbo+TNmlkvbN9E+kyAAtBnH7KO+3qPmqs3GN/Ysw/wDYvuTr3aIpvjNtRme4Dz2Zz/xhc/SSrKkdLWRvExauhXcT5ODLlHFjtbMNQdsxsZnvNkeOeQ8+S53qFOSpc0dH060nbpWYW3VGOr1iyqaoLgcZjPujQtyMZjLkFr03/WuDNqa+o6dkS0uLS14mWmcjHxCsyY1OLi/JXjm4SUkLxLxJU7WbPULWGm3uw3J2cgyNdB5Lhw9NwxTU4cnceslL3RfBW3Pe1pqFwLwQI+6N55DwV2P0vTzb4/8ASjNr80EqZYucSZOZXXxYo4oKEVwjkZMksknKXbLTh323e79QjJ0TDsvqjJBHNUlp5xfVjNOo7Lukkjl4jyMrJONM2Y5WiqHDNcuEgNaSNTmGk6x4DZc+XqOCM9rf/h1I+lamcN6S+18nrrHAgEGRsuzGSlHdHo4M4ShJxkqa8CphByzk4h5rn+oVsX3On6Ze+VdUTFxztApJEcJEJoScZJoTJBTi4vyRm2V5nC0ujkJyXew6iGRWjzubS5MTp/qRaNoY6Q1wJBIIBzBGRBGyvM/J1VZIQBS17rpOcSQZOsGM1FEbUXikAQAIAEACABAD1lGa5/qEqgl8s6XpsLyN/CJS5B2zy7jW9e0rvIMsp9xviRqfN3wAXTwQ2w+5ydRPfP8AJcGn+yqxU22V1fHVbUqOd2gMhhDScJAIh2RnEOZG0JcrbltQY1Stl7VdLiZxTudxsuliioxSo5mWblNu7OFYVndGcTY1kfNJkrY7Hx3vVFxeFkFWm6mSQHDUaggggjzAXFjLa7R3JR3KmVNLhennjq1Hzriwn5gwr3qZspWmgjL8WXZYaZFKnTxVjEuc5x7NuukxJ6aeS1aWM8j3S6MupnDGtseyDQohrQAuolRy27Oi5uJmOcJc0OjM4SRMDcxKibai67CCTkr6JHG9xWGlQNWlUw1JAFIkkuByJwu7zSBnyXIx5ckpe47LxwivaVHBl0uq0q72e01zAB+IQ4kdcwtEdTHFNRl0/JRk00ssN0e14+Syu+ympVZT0xHPwABJ+AK2Zsyx43MwYMLyZFA0ZslClWwU5ns5fnOrhhGe8Z+YWXT5MmTHun88GnU48ePJtgSVcUkG32QGXZcyCqNRFyxSS7pmjSzUc0HLq0RqzWU2h+Tn7Z+zMQfn6ryDUca3Pl/4PdRcsrcFwv8AJIuaqXMJMe0dNsgY8NfivQejyk9P7vl0eX9ehCOq9vwrJ66xxTio6IzWPW45Th7VfJu9Pywx5HudcDrLQ4eK4tUeg4fI821jcKAo7FobzQRTLGnaBSsta0T7LXOHjhBgebsl0dFDi/k5eulzXweMMeZnEQZ9qSDJ1MhdVulwcur7Lqhe9pZih4qsZEk56+Mz81nhqotRU04uXSZZLB3XKRJHFLd6Ofg7/tWko2moQICABAAgAQBKsFidVdhGW5PIdN0spKI8IOToffZDTcWnX6bLj6zK5ypro7mhwqELTuys4jvA0LPUePajC33nZA+Wvks+GG+aRpzz2QbPF71q6N8z9F1Tjns92W99CzWeg4Bz6dJjSRkBDQI8VTiwvK9z6Ls2ZYltXZ01sCF0zlMbtVobTY57zDWiTv8AJAUX/CF4WavRJpHFB78tIIdyz1y5LPlTfZox+3otK1k3b6LFPB5ibseo8SMdxFxQaL3UaTMVQAS45NaSJ0+8YIVmDSOa3SfAmfVqDqK5MhSY6XPecT3ElxO5K68IKKpHHnNydsdTij920nur0Axwa7HMkSO6C7TfTwVGoklibZdp4uWVJFn9qVWoLIxrqbC01B/EBzBAJgNIykTnJ0XJ06W7g7GYjfZWz/y1U86p+DGfqq9W/ci7Sr2s1Dbspit24kOwkEbGY70c8o81U9RN4/pvodaeCy/UXZSQf7ZX6D0hi7Oma/h4nE1V/wARInqwpJths1N4cHCTyzGXl5rFqss4NV0btLhxzTvshXvwt2jXdjVNJxG4D2zzzzHr5LmSx45y3TidjHnzY4bYS/cpOC2Wqy1XWG1ta5tTFUpPDg7E7LGOcRBEgRBWnhLdj4oxNuT25ObNFbLPgdGxzC6ODL9SN+Tm6jD9OVeCNUpgq4pI5pub0VOTBCf4kX4tRkx/hYgrnkskvT4vpm6Hqk1+JI6FfwVMvT5Je1l8PU4N+5UPfaZazZ7upUm61HtaejQajv8AUGjzW3S464+DFqcm5uXyeUMtp3HotlGSx+namnKSPBQ48k2PKAP/2Q==");
  return value;
  
}

  async function loadDenuncias() {
    const response = await api.get('http://127.0.0.1:200/despesas') 
    setD(response.data)
  }
  useEffect(() => {
    loadDenuncias()
  }, [])
  async function DeleteNoticias(id) {
    alert('Tem Certeza Que Dezeja Deletar?')
    await api.delete(`/noticias/${id}`)
    window.location.reload()
  }

  async function cadastrar(titulo,descricao,orgaoo,namehash, imagem) {
    const data = {
      title: titulo,
      description: descricao,
      orgao: orgaoo,
      name_hash: namehash,
      image: imagem
    }
    await api.post('/noticias', data);
    alert('Notícia Cadastrada com Sucesso');
    //history.push('/');
  }

  return (
    <>
      <Header />
      <div className="container-main">
        {d.map(item =>
          <article key={item._id}>
            <div className="row">
              <div className="column">
                <div className="text">
                  <p>{categoriaEconomica(item.categoria_economica)}</p>
                  <p>{grupoNatureza(item.natureza_despesa)}</p>
                  <p>{modalidadeAplicacao(item.modalidade_aplicacao)}</p>
                  <p>{elementoDespesa(item.elemento_despesa)}</p>
                  <p>{subitemNatureza(item)}</p>
                </div>
                <div className="row-icons">
                  <Link to={`/noticias/${item._id}`}>< FaAngleDoubleRight /></Link>
                  <Link to='/' onClick={() => DeleteNoticias(item._id)}><FaTrashAlt /></Link>
                  <Link to={`/editarnoticias/${item._id}`}><FaEdit/></Link>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
      <Footer />
    </>
  )
}
