# UploadService（上传微服务）
# 安装
git clone https://github.com/wansj/UploadService.git

cd /path/to/UploadService

npm install
# 启动
npm run dev
# 说明
对于小于16兆的文件，会存储在mongodb数据库中（已实现），对于较大的文件，存储在gridfs中（尚未实现）

直接修改src/下面的文件不会起效，因为micro-dev使用的是dist/目录下面编译后文件，所以最好在webstorm中配置一个babel File Wather，这样当src/下面的源文件改动后会自动编译到dist目录下面。因为在项目源码中大量使用了es6语法，所以编译是必须的。
