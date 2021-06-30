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


routes.get('/pdf/:parametros', async(request, response) => {
    const { parametros } = request.params;

    const pagina = JSON.parse(b64.decode(parametros));


    response.send(pagina);
    /*
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/livros/relatorio/token', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'A4'
    })

    await browser.close();

    response.contentType("application/pdf");

    return response.send(pdf);
    */
});



module.exports = routes;