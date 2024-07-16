const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.get('/auth/telegram', (req, res) => {
    const { hash, ...data } = req.query;
    const secret = crypto.createHash('sha256').update('7234342159:AAGTFIf098ddtEhkVjaxQsRVmq4ERUo41SA').digest();

    const checkString = Object.keys(data)
        .sort()
        .map(k => (`${k}=${data[k]}`))
        .join('\n');

    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

    if (hmac === hash) {
        // Успешная авторизация
        res.send(`Hello ${data.first_name}!`);
    } else {
        // Ошибка авторизации
        res.send('Authorization failed');
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
