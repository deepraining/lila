
const fs = require('fs');
const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const app = module.exports = new Koa();
const extname = path.extname;

app.use(views(path.join(__dirname, '/project/dev'), {
    map: {
        html: 'handlebars'
    }
}));


const stat = file => {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stat) => {
            if (err) {
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
};

app.use(async ctx => {
    if (ctx.path === '/')
        await ctx.render('test/index/index', {
            list: [
                {name: 'lila', desc: 'tool'},
                {name: 'senntyou', desc: 'author'}
            ],
            title: 'Hello world and everyone!'
        });
    else {
        const fpath = path.join(__dirname, 'project', ctx.path);
        const fstat = await stat(fpath);

        if (fstat.isFile()) {
            ctx.type = extname(fpath);
            ctx.body = fs.createReadStream(fpath);
        }
    }
});


if (!module.parent) app.listen(3000);
