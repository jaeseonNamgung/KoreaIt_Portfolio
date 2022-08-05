const express = require('express');
const app = express();
const cors = require('cors');
const POST = '3500';
const axios = require('axios');
const api = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbsunnamgung1544001&QueryType=ItemNewAll&MaxResults=10&Start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/', async (req, res)=>{
    let data;
    data = await axios.get(api);
    console.log(data);
    let json = await data.json();
    res.send(json);
})

app.listen(POST, ()=>{
    console.log('start node');
});