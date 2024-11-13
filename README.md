# OneAIChat v1.0.3更新
### 1.修复一键重新重置对话无法生效的BUG
### 2.修复单条对话重新生成按钮无法生效的BUG
### 3.新增一键测试模型功能
### 4.修复单个对话窗口无法编辑模型的BUG
### 5.新增测试模型进度条，提升用户体验
### 6.新增测试模型的动画，提升用户体验
### 7.完善项目README.md
# 项目介绍
用户可以通过本平台一键调用、测试多个模型的对话效果。
## 配置全局调用的key
在该界面可以直接选择配置默认的key，进行模型的调用（建议填写oneAPI的KEY，或者购买Sealos的AIProxy的集成key）
<img width="1789" alt="image" src="https://github.com/user-attachments/assets/399c0e2c-38e8-4fc6-b004-17a898c5748d">
### 如何购买集成的APIkey服务？
Sealos链接（杭州可用去）：https://hzh.sealos.run/
注册账号会赠送5元的余额，选择AIProxy服务
![image](https://github.com/user-attachments/assets/ec654c97-3c6f-4c34-8bc6-cb0b90a0da98)
新建一个key，把key的地址和调用地址复制到本项目的输入框即可
<img width="1791" alt="image" src="https://github.com/user-attachments/assets/be77ad25-3f92-4770-9c2b-3af5afb94968">
## 测试全局key的可用性
点击测试会展示一个进度条和模型的测试结果，结束测试后会在窗口展示
<img width="1782" alt="image" src="https://github.com/user-attachments/assets/ffce619e-dec9-4a7f-b56f-fb3ab7f4be30">
## 选择模型界面
在该界面可以选择不同模型的尝试
<img width="1779" alt="image" src="https://github.com/user-attachments/assets/c4d3ddbc-99c9-4d69-ab48-f137fb3c9a52">
## 配置单个模型请求地址
点击单个模型的对话窗口的编辑按钮，可以进行单个模型的请求的key和url的配置，配置完毕后，该模型的请求的url和key就不会走全局的配置
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/7d314c86-d0d9-44a5-882e-c42b22ae302f">
## 对话
在下方的输入框输入对话 即可一键请求多个模型
<img width="1791" alt="image" src="https://github.com/user-attachments/assets/b07f8181-1d55-4650-af4e-5d783e0283a3">
## 功能按钮简介
输入框右侧的按钮分别是一键重新对话、删除所有模型的对话记录
左侧按钮分别为是否开启流式输出、是否携带上下文发起请求
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/7c3ab5f1-300d-4a0c-8fcf-3b2920b748db">
## 添加其他渠道模型请求
如果需要使用FastGPT、dify等平台搭建的工作流进行对话，可以直接使用添加其他模型创建
<img width="969" alt="image" src="https://github.com/user-attachments/assets/fcb12156-c040-4bdf-8ee9-5bb0ea876cb1">
配置模型请求地址和APIkey，如图填写FastGPT的即可
<img width="959" alt="image" src="https://github.com/user-attachments/assets/6cca2630-8761-4392-828d-35a61edc7ec8">
最终就可以直接请求FastGPT搭建的工作流
<img width="1789" alt="image" src="https://github.com/user-attachments/assets/3d9ae06b-1ba1-43d5-85ba-fab443a30dfe">
## 关联项目
FastGPT：https://github.com/labring/FastGPT
OneAPI：https://github.com/songquanpeng/one-api
Sealos：https://github.com/labring/sealos

