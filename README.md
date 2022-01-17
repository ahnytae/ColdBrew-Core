# ColdBrew API for TypeScript

[ColdBrew API 상세 스펙](https://www.notion.so/as333/ColdBrew-Core-Api-40112f1562ee488fbfa89c624e2a8519)

[ColdBrew NPM](https://www.npmjs.com/package/coldbrew-core)

[ColdBrew 백엔드 + 시그널링 서버](https://github.com/ahnytae/ColdBrew-BE)



## ColdBrew

ColdBrew 프로젝트는 <b>webRTC</b>를 쉽게 사용하게 만든 API 입니다.

React.js / Vue.js / Svelte 등 import 해서 사용 하면 됩니다.

현재는 최소한의 기능이지만 계속해서 기능 추가/ 업데이트 할 계획 입니다.

(화이트보드기능 추가, UI 애니메이션, nginx추가 등)



## Setup

with npm: `npm install coldbrew-core`

with yarn: `yarn add coldbrew-core`



## 실행

1. 같은 네트워크 망 에서 사용 (= 와이파이)

   > (chrome) 탭 2개 띄우고 같은 방 이름으로 접속. 

   

2. 다른 네트워크 망에서 사용 (LTE <-> 와이파이) (*불가*)

   > [stun 이슈 링크](https://github.com/ahnytae/ColdBrew-Core/issues /1)



## 프로젝트 (초기)Prototype 버전

[ColdBrew Prototype 버전](https://github.com/ahnytae/ColdBrew-Core_old)



## 사용 기술

## <img src="https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555"> <img src="https://img.shields.io/badge/node-16.13.0-339933?logo=node.js">  <img src="https://img.shields.io/badge/Socket.io-4.3.2-010101?logo=Socket.io">



## DEMO (임시)

[ColdBrew Demo](https://coldbrew-demo.herokuapp.com) (급하게 만든 임시 버전이며 새롭게 다시 만들 예정)



[video]

[![Demo Video](https://i9.ytimg.com/vi/g4fElaWmBhk/mqdefault.jpg?sqp=CPjj9I4G&rs=AOn4CLBpI-3GCJp6vYx0NUfyy_CxDLYoMw)](https://youtu.be/g4fElaWmBhk) 



## 기능

- 방입장/나가기 
- 장치 변경 (카메라/마이크)
- 카메라/마이크 on/off
