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

2. 다른 네트워크 망에서 사용 (LTE <-> 와이파이) (_불가_)

   > [stun 이슈 링크](https://github.com/ahnytae/ColdBrew-Core/issues /1)

## 프로젝트 (초기)Prototype 버전

[ColdBrew Prototype 버전](https://github.com/ahnytae/ColdBrew-Core_old)

## 사용법 예시

```js
- 방 입장: /join/{roomName}/{nickName} (백엔드 API 이용)
  response: "SUCESS" 일때 방 입장 처리

- 방 진입 후 Video Stream 얻기: GetUserDevices.getDeviceStream()
  response: strteam 객체 반환

- 방 입장: SignalingController.joinRoom()
- 방 정보 조회: SignalingController.getRoomInfo()
- 장치변경: SignalingController.changeCamera("video" or "mic");

- 방 나가기: SignalingController.SignalEvent("leave", () => { /* callback 작성 */ })

```

## 사용 기술

## <img src="https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555"> <img src="https://img.shields.io/badge/node-16.13.0-339933?logo=node.js"> <img src="https://img.shields.io/badge/Socket.io-4.3.2-010101?logo=Socket.io">

## DEMO (임시)

[ColdBrew Demo](https://coldbrew-demo.herokuapp.com) (임시 버전이며 새롭게 다시 만들 예정)

## 1. 방 입장

> 일반탭, 시크릿탭 2개 띄어놓은 후 동일한 방 제목으로 입장 합니다.

<img src="https://user-images.githubusercontent.com/62460298/150132518-6e82c09e-f785-4991-bfd6-28e66bc9faa3.png">

## 2. 방 입장

> 본인과 원격 사용자 stream을 얻어 video를 띄웁니다.

<img src="https://user-images.githubusercontent.com/62460298/150132532-f265b326-c331-4156-9f97-f5634ab38004.png">

## 3. 장치 on/off (카메라,마이크)

> 본인과 원격 사용자의 장치 on/off를 제어할 수 있습니다.

<img src="https://user-images.githubusercontent.com/62460298/150132535-35c453f0-bb70-41c2-9e1f-ca388842d360.png">

## 4. 장치 변경

> 본인의 장치를 연결된 다른 장치로 변경 가능 하며 원격 사용자에게 변경된 장치로 동기화 시킵니다.

<img src="https://user-images.githubusercontent.com/62460298/150132537-3056a64d-b34f-45de-8d0f-f6f30e64690c.png">

## 5. 방 나가기

> Socket 연결을 끊고 방을 나갑니다. (+ front에서 별도 종료페이지로 이동 처리)

<img src="https://user-images.githubusercontent.com/62460298/150132538-6ffa701d-5ea4-49e8-9fb2-9f1bd636cdbf.png">

[video]

[![Demo Video](https://i9.ytimg.com/vi/g4fElaWmBhk/mqdefault.jpg?sqp=CPjj9I4G&rs=AOn4CLBpI-3GCJp6vYx0NUfyy_CxDLYoMw)](https://youtu.be/g4fElaWmBhk)

## 기능

- 방입장/나가기
- 장치 변경
- 카메라/마이크 on/off
