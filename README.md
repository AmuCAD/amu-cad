# AmuCAD

![logo](https://user-images.githubusercontent.com/85783423/180281254-17e5d78c-0e8f-4b3b-a293-86241b9533b8.png)

**[AmuCAD - Easy & Light 3D Design](https://amu-cad.vercel.app/)**

## 🙌 소개

누구나 간편하게 3D 디자인을 체험해 볼 수 있는 웹 애플리케이션 입니다.

https://user-images.githubusercontent.com/85783423/180281535-a4ff3500-6006-4966-9d0b-1829c5af6290.mp4

## 💡 프로젝트 동기

학창 시절 3D 캐드를 접해볼 기회가 있었습니다.

당시 개인적으로 실습을 해보기 위해서 20기가에 육박하는 무거운 프로그램을 다운로드해야 했던 기억이 있습니다. 그래서 간단한 작업이나 학습 용도로 누구나 가볍게 체험해 볼 수 있는 웹 3D 캐드를 구상하게 되었습니다.

특히 기존에 three.js에 대한 호기심이 있었는데, 이 프로젝트를 통해 three.js를 제대로 경험해 볼 수 있을 것 같다는 생각에 진행을 결정하게 되었습니다.

## 🗓️ 작업 기간

[22.06.27 - 22.07.15](https://www.notion.so/9437e4a604bc45b6b5caee3635b040b6)

- 1주차: 기획 및 초기 작업
- 2 - 3주차: 기능 구현

## ✨ Feature

- 작업면을 선택 원하는 모양으로 스케치 할 수 있습니다.
  - 삭제 및 뒤로가기 기능을 지원합니다.

https://user-images.githubusercontent.com/85783423/180281558-4c0dbafb-9383-48ad-850e-6f480566b8ff.mp4

- 작성한 스케치를 선택하여 돌출 기능을 수행할 수 있습니다.
  - 돌출 사이즈와 방향을 설정할 수 있습니다.
  - 돌출 타입을 설정할 수 있습니다.
  * 합집합 돌출: 기존 형상에 돌출 형상을 합치는 작업
  * 차집합 돌출: 기존 형상에 돌출 형상과 겹치는 부분이 제거되는 작업

https://user-images.githubusercontent.com/85783423/180281583-e565a874-facc-4d6c-9e06-65082fb8978c.mp4

- 작성한 스케치를 선택하여 회전 돌출 기능을 수행할 수 있습니다.
  - 회전 반지름을 설정할 수 있습니다.
  - 돌출 타입을 설정할 수 있습니다.

https://user-images.githubusercontent.com/85783423/180281594-f28f42e2-2a0f-414a-b3b6-ef4e45b3250a.mp4

- 작업물을 저장하거나 기존 파일을 불러올 수 있습니다.
  - glTF, STL 형식을 지원합니다.

https://user-images.githubusercontent.com/85783423/180281617-25568a21-1e9c-4c2b-b52c-34552c3d5940.mp4

## 🎨 Stack

- ES6+
- React
  - React-router-dom
  - Styled Compontent
- Three.js
  - react-three-Fiber
  - react-three/drei
  - three-csg-ts
- Zustand
- React Testing Library
- react-three/test-renderer

## 📁 설치 방법

다운로드 후, 프로젝트 루트 디렉토리에서 다음 명령어를 입력합니다.

```jsx
npm install

npm start
```

## 🏔️ Challenge

### Three.js의 메커니즘 이해

HTML Canvas도 경험해보지 않은 상태에서 three.js를 접하면서,기존 DOM 중심의 작업과의 괴리감을 많이 느꼈습니다. 특히 geometry와 material로 이루어진 mesh, scene, camera로 구성되는 three.js의 기본 메커니즘에 적응하기 어려웠습니다.

그러나 react-three-fiber를 도입하면서 geometry, material, mesh를 jsx 문법으로 작성할 수 있었고 three.js의 각 요소를 좀 더 직관적으로 바라보면서, 전반적인 메커니즘을 쉽게 그려나갈 수 있었습니다. 이를 통해 선언형 프로그래밍의 이점을 다시금 느낄 수 있었습니다.

### 무에서 유를 창조하는 과정

대부분의 three.js 레퍼런스는 개발자가 코드를 수정해서 static한 하나의 오브젝트를 만들어내는 것이었습니다. 하지만 제 프로젝트는 사용자가 인터페이스를 통해 의도한 방식대로 오브젝트를 가공할 수 있어야 한다는 점에서 큰 차이가 있었고 나름의 방식을 구상해서 문제를 해결해야 하는 경우가 많아 어려움이 있었습니다.

대표적으로 extrude를 위한 사용자의 스케치 작성은 3차원에서 발생하지만, 스케치를 통해 만들어저야 하는 shape는 2차원으로만 정의할 수 있었습니다.

이를 해결하기 위해 이벤트로 받은 point들을 순회하면서 현재 작업면의 기준 좌표를 확인하였고, 이 기준 좌표에 따라 3차원 좌표를 2차원 좌표로 조작해서 shape을 만들어주었습니다. 그리고 사용자에게 보여지는 mesh는 rotation 값을 주어 스케치한 위치 그대로 작업이 실행된 것처럼 보이도록 처리해야 했습니다.

### 수학을 바탕으로 해결해야 했던 문제들

그동안 웹 개발을 경험하면서 수학 지식을 요하는 경우는 드물었지만, three.js 특성 상 섬세한 구현을 위해서는 흔히 게임 수학이라 불리는, 공간에 대한 수학 지식이 필요했습니다. 저의 얕은 수학 지식으로 3차원 공간에서 필요한 연산들을 구현해야 했고, 특히 자바스크립트는 수학적인 문제를 해결하는 레퍼런스가 충분하지 않아 더욱 어려움이 있었습니다.

이를 극복하기 위해 어떤 문제가 발생했을 때 그 문제를 수학적으로 해결하는 방법에 대한 키워드를 찾아 C++이나 파이썬 같은 다른 언어로 구현한 방법을 탐색했습니다. 다른 언어일지라도 프로그래밍 언어인 이상 결국 유사한 맥락을 가지고 있다는 것을 느낄 수 있었습니다.

### 함수형 프로그래밍

주요 컴포넌트의 비즈니스 로직을 유틸리티 함수, 혹은 상태나 side effect가 존재하는 경우 커스텀 훅으로 분리하여 선언형 프로그래밍을 지향하였습니다. 또한 유틸리티 함수의 역할이 비대해지는 경우 단일 책임 원칙을 고려하여 각각의 역할을 가진 여러 개의 함수로 분리하였습니다.

이를 통해 로직의 재사용성이 높아지고 컴포넌트의 가독성이 개선되는 것을 확인할 수 있었습니다. 특히 그동안 낯설게 느껴왔던 커스텀 훅을 활용하고 그 장점을 느낄 수 있었다는 점에서 의미 있는 시간이었습니다.

## ✍️ 소감

### 팀 프로젝트와의 차이

팀 프로젝트에서는 저 자신의 상황과 코드를 저보다 객관적으로 살펴줄 수 있는 팀원이 있었다면, 개인 프로젝트에서는 모든 상황에 대해 온전히 스스로 책임져야 하는 데에서 더욱 부담이 있었던 것 같습니다.

때문에 blocking 상황에서 생각의 늪에 빠지지 않고, 최대한 이성적이고 현실적으로 상황을 바라보고 현재 가능한 방법, 가능한 케이스에 탄력적으로 대응하고자 노력했습니다.

### 아쉬운 점

디자인 패턴이나 프로그래밍 설계 원칙에 대해서 적극적으로 적용해보려는 노력이 분명 필요하다는 사실을 알고 있었지만, 새로운 기술을 이용해서 주어진 일정 안에 구현해야 한다는 압박감에 밀려 제대로 적용하지 못한 점이, 마무리 하면서 많은 아쉬움으로 남았습니다.

성숙한 개발자가 되기 위해서 어려운 상황일수록 본질에 집중해야 한다는 것을 기억하고, 반드시 개선해야 할 부분이라고 느꼈습니다.

### 마무리 하며..

처음 3D 캐드를 구현해 보겠다고 생각했을 때 정말 많은 의구심이 있었지만, 하나의 도전으로 생각하고 시작했던 것 같습니다. 물론 기능적인 제한도 많고 완성도 면에서 아쉬운 점도 많지만 결국 만들어냈다는 점에서 개발에 대한 자신감을 더하게 되었습니다. 두 번의 프로젝트를 통한 경험은 앞으로 큰 자산이 될 것 같습니다.
