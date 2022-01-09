const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const app = express();
const cors = require('cors');
app.use(cors());

const scrapperUrl = 'https://www.thehindu.com/';

app.get('/', (req, res) => {
    res.json('This is web scrapper');
});

app.get('/top-picks', (req, res) => {
    axios(scrapperUrl).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const topPicks = [];
        $('.toppicks-new .story33x1-container', html).each(function () {
            const url = $(this).find('a').attr('href');
            const title = $('.story33x1-text', $(this)).find('h3').text();
            const author = $('.story33x1-text .person-name', $(this)).text();
            topPicks.push({url, title, author});
        });
        res.json(topPicks);
    }).catch(e => {
        console.log({e});
        res.error();
    });
});

app.listen(PORT, () => console.log(`Server is Up on PORT ${PORT}....`));
