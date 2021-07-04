'use strict';
const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');
const puppeteer = require('puppeteer');
const b64 = require('base-64');

const app = express();

app.use(cors({
  origin: '*'
}));

const routes = express.Router();


routes.use(function(req, res, next) {
    console.log('Data/Hora: ', moment().tz("America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'));
    //console.log('Data/Hora: ', moment().format('YYYY-MM-DD HH:mm:ss'));
    console.log(req.method, req.url);
    next(); 
});

routes.get('/verificar', async (req, res) => {
    res.send('O serviço está funcionando no Heroku!');
});


routes.get('/pdf/:parametros', async(request, response) => {
    const { parametros } = request.params;

    const objetos = JSON.parse(b64.decode(parametros));

    const { url, waitUntil, pdf } = objetos;

    //response.send(objetos);
    //console.log('url = ', url);
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil
    });

    const relatorio = await page.pdf(pdf);
    // const relatorio = await page.pdf({
    //     printBackground: true,
    //     format: 'A4'
    // })

    await browser.close();

    response.contentType("application/pdf");

    return response.send(relatorio);
    
});



module.exports = routes;