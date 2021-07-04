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
    try {
        const { parametros } = request.params;
    
        const objetos = JSON.parse(b64.decode(parametros));
        console.log('objetos =', objetos);
    
        const { url, waitUntil, pdf } = objetos;
    
        //response.send(objetos);
        //console.log('url = ', url);
        
        console.log('const browser = await puppeteer.launch();');
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });
        console.log('const page = await browser.newPage();');
        const page = await browser.newPage();
    
        console.log('await page.goto(url, { waitUntil });');
        await page.goto(url, {
            waitUntil
        });
    
        console.log('const relatorio = await page.pdf(pdf);');
        const relatorio = await page.pdf(pdf);
        // const relatorio = await page.pdf({
        //     printBackground: true,
        //     format: 'A4'
        // })
    
        console.log('await browser.close();');
        await browser.close();
        
        console.log('response.contentType("application/pdf");');
        response.contentType("application/pdf");
        
        console.log('return response.send(relatorio);');
        return response.send(relatorio);
    } catch (error) {
        console.log('Ocorreu um erro ao tentar executar o gerar-pdf. Erro:',  error);
        return response.send(error);
    }
    
});



module.exports = routes;