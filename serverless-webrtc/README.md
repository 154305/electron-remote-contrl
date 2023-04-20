## 本demo运行步骤
```bash
# 1. 安装依赖包
npm install 
or
yarn
# 2. 安装http-server包
npm install -g http-server
# 3. 根据自身情况配置根目录下的config.js文件，指定本地host和信令服务器port，以及自定义一些配置,在浏览器中需要https打开摄像头,故此需要https
# 4. 启动http服务（默认8080端口）
http-server -S -C cert.pem
# 5. 启动信令服务器
node server.js
# 6. 浏览器开启两个tab访问localhost:8080（局域网内的其他电脑访问也行），一方点击呼叫，另一方点击接受即可开始音视频通话
```
