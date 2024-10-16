const indexMessagesGet = (req, res, next) => {
    //TODO: db call for all messages (Limit 10)
    res.render('index', {
        title: 'Message Board - Home'
    });
}

module.exports = {
    indexMessagesGet
}