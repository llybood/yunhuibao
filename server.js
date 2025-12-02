// 云服务器折扣信息聚合网站 - 简单静态文件服务器
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 处理前端路由 - 将所有路由请求都返回index.html
// 这样可以支持SPA（单页应用）的路由功能
app.get('*', (req, res) => {
    // 对于API请求或资源文件请求，不进行路由处理
    if (req.url.startsWith('/api') || 
        req.url.endsWith('.json') || 
        req.url.endsWith('.css') || 
        req.url.endsWith('.js') || 
        req.url.endsWith('.png') || 
        req.url.endsWith('.jpg') || 
        req.url.endsWith('.jpeg') || 
        req.url.endsWith('.gif') || 
        req.url.endsWith('.svg') || 
        req.url.endsWith('.ico')) {
        // 让静态文件中间件处理这些请求
        res.status(404).send('File not found');
    } else {
        // 对于其他所有路由，返回index.html以支持前端路由
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`云服务器折扣信息聚合网站运行在端口 ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
});