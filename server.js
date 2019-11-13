const express = require('express');
const bodyParser = require('body-parser');
const app = express();


let alphabets = null;
let combinationsResult = null;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

function genCharArray(charA, charZ) {
    var a = [],
        i = charA.charCodeAt(0),
        j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

alphabets = genCharArray("a", "z");

function combinations(chars) {
    var result = [];
    var f = function (prefix, chars) {
        for (var i = 0; i < chars.length; i++) {
            result.push(prefix + chars[i]);
            f(prefix + chars[i], chars.slice(i + 1));
        }
    }
    f('', chars);
    return result;
}

function getCombinations(sa) {
    alphabets = alphabets.concat(sa);
    combinationsResult = combinations(sa);
}


app.post('/', (req, res) => {

  if (req.body['phoneNumber'] !== undefined) {
    getCombinations(req.body.phoneNumber);
  }
  const page = req.body.pageNumber;
  const pageSize = 10
  const combinationsToBeSent = combinationsResult.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  res.send({
    combinations: combinationsToBeSent,
    totalCount: combinationsResult.length,
    page
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
