const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const routes = require('./routes');

let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you donâ€™t know what is ES6, itâ€™s a new JavaScript implementation.',
            comments: [
                { text: 'Cruelâ€¦..var { house, mouse} = No type optimization at all' },
                { text: 'I think youâ€™re undervaluing the benefit of â€˜letâ€™ and â€˜constâ€™.' },
                { text: '(p1,p2)=>{ â€¦ } ,i understand this ,thank you !' }
    ]
  }
]
};

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());
app.use((req, res, next) => {
    req.store = store;
    next();
});

app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPost);
app.put('/posts/postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.removePost);

app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts/:postId/comments', routes.comments.addComment);
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment);

app.listen(process.env.PORT, process.env.IP);
