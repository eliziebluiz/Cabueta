const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
const fs = require('fs');
const url = require('url');
var cors = require('cors');

const app = express();
app.use(cors());

app.set('port', (process.env.PORT || 200));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
});

app.get('/despesas', (req, res) => {
    const eventoURL = "https://api.tce.ce.gov.br/index.php/sim/1_0/despesa_categoria_economica?codigo_municipio=003&exercicio_orcamento=201000";//req.query.url;
    request(eventoURL, function(error, response, html) {
        const despesa = despesas(error, response, html);
        res.json(despesa);
        //res.json("Sucesso\n");
        //return sorteado;
    });
});

app.get('/despesascategorizadas', (req, res) => {
    const eventoURL = "https://api.tce.ce.gov.br/index.php/sim/1_0/despesa_categoria_economica?codigo_municipio=003&exercicio_orcamento=201000";//req.query.url;
    request(eventoURL, function(error, response, html) {
        const despesa = despesascategoridas(error, response, html);
        res.json(despesa);
        //res.json("Sucesso\n");
        //return sorteado;
    });
});

function find_equals(object, itemcode) {
    var result = []
    for (var prop in object) {
        var code = select_code(object[prop].codigo_despesa)
        if(code == itemcode) {
            result.push(object[prop]);
        }
     }
     return result;
}

function select_code(s) {
    return s[0] + s[1] + s[2] + s[3] + s[4];
}
function find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      const code = select_code(item.codigo_despesa);
      if(!object[code])
          object[code] = 0;
        object[code] += 1;
    })

    for (var prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }
    return result;

}

function despesascategoridas(error, response, html) {
    if(error) {
        console.log(error);
    }
    
    let participantes = [];
    
    const $ = cheerio.load(html);
    $('tr').each((i, element) => {
        const cheerioElement = $(element);
        const despesa = cheerioElement.find('td.codigo_elemento_despesa').text().trim();
        const nome_elemento_despesa = cheerioElement.find('td.nome_elemento_despesa').text().trim();
        const valor_total_fixado = cheerioElement.find('td.valor_total_fixado').text().trim();
        if (despesa) {
        //var title = $(this).find('nomedateg x').text().trim();
            const modalidade = (despesa[2] - '0')*10 + (despesa[3] - '0');
            const elemento = (despesa[4] - '0')*10 + (despesa[5] - '0');
            const subitem = (despesa[6] - '0')*10 + (despesa[7] - '0');
            participantes.push({"codigo_despesa": despesa, 
                                "categoria_economica": (despesa[0] - '0'),
                                "natureza_despesa": (despesa[0] - '0'),
                                "modalidade_aplicacao": modalidade,
                                "elemento_despesa": elemento,
                                "subitem_natureza": subitem,
                                "nome_elemento_despesa": nome_elemento_despesa,
                                "valor_total_fixado": valor_total_fixado 
            });
      }
    });
    var result = find_duplicate_in_array(participantes)
    var list = []
    for (var prop in result) {
        var duplicates = find_equals(participantes, result[prop])
        list.push(duplicates)
     }
    return list;
}

function despesas(error, response, html) {
    if(error) {
        console.log(error);
    }
    
    let participantes = [];
    
    const $ = cheerio.load(html);
    $('tr').each((i, element) => {
        const cheerioElement = $(element);
        const despesa = cheerioElement.find('td.codigo_elemento_despesa').text().trim();
        const nome_elemento_despesa = cheerioElement.find('td.nome_elemento_despesa').text().trim();
        const valor_total_fixado = cheerioElement.find('td.valor_total_fixado').text().trim();
        if (despesa) {
        //var title = $(this).find('nomedateg x').text().trim();
            const modalidade = (despesa[2] - '0')*10 + (despesa[3] - '0');
            const elemento = (despesa[4] - '0')*10 + (despesa[5] - '0');
            const subitem = (despesa[6] - '0')*10 + (despesa[7] - '0');
            participantes.push({"codigo_despesa": despesa, 
                                "categoria_economica": (despesa[0] - '0'),
                                "natureza_despesa": (despesa[0] - '0'),
                                "modalidade_aplicacao": modalidade,
                                "elemento_despesa": elemento,
                                "subitem_natureza": subitem,
                                "nome_elemento_despesa": nome_elemento_despesa,
                                "valor_total_fixado": valor_total_fixado 
            });
      }
    });
    return participantes;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

app.listen(app.get('port'), () => {
    console.log(`Servidor disponível em: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});