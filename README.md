# UploadService（上传微服务）
# 安装
git clone https://github.com/wansj/UploadService.git

cd /path/to/UploadService

npm install
# 启动
npm run dev
# 说明
对于小于16兆的文件，会存储在mongodb数据库中（已实现），对于较大的文件，存储在gridfs中（尚未实现）
