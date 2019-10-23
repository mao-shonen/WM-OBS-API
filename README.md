# WM-OBS-API
公司用的

## 安裝
```bash
git clone https://github.com/mao-shonen/WM-OBS-API.git
cd WM-OBS-API
npm install
cp config.js.example config.js
```

## 執行
```bash
node app.js 3000
```

## 使用
切換場景
```http
POST http://127.0.0.1:3000/{OBS_alias}/SetCurrentScene/{scene_name}}
POST http://127.0.0.1:3000/{OBS_IP_and_port}/SetCurrentScene/{scene_name}}
```
