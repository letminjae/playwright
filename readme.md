# Playwright

![License](https://img.shields.io/github/license/letminjae/playwright)
![Stars](https://img.shields.io/github/stars/letminjae/playwright?style=social)

Playwright를 입문하기 위해 공부한 레포지토리입니다. E2E 테스트 및 API 테스트, Allure Reporting과 Cucumber.js 사용 또한 연습해보았습니다.

## 🛠 기술 스택

- **Testing Framework**: Playwright, Cucumber.js
- **Programming Language**: TypeScript, JavaScript
- **Test Reporting**: Allure Report
- **Data Handling**: ExcelJS
- **Automation Tools**: ts-node

## 📂 프로젝트 구조

```
features
 ├── step_definitions
 │   ├── steps.js
 │   ├── steps.ts
 │   ├── support
 │   │   ├── hooks.js
 │   ├── Ecommerce.feature
 │   ├── ErrorValidation.feature
 ├── page_object
 │   ├── CartPage.ts
 │   ├── DashboardPage.ts
 │   ├── LoginPage.ts
 │   ├── OrdersHistoryPage.ts
 │   ├── OrdersReviewPage.ts
 │   ├── POManager.ts
 ├── tests
 │   ├── homework
 │   │   ├── TistoryLogin.spec.ts
 │   │   ├── UIbasics.spec.ts
 │   ├── utils
 │   │   ├── ClientApp.spec.ts
 │   │   ├── ClientAppPO.spec.ts
 │   │   ├── EcommerceE2ETest.spec.ts
 │   │   ├── GetByX.spec.ts
 │   │   ├── NetworkTest.spec.ts
 │   │   ├── NetworkTest2.spec.ts
 │   │   ├── Upload-Download.spec.ts
 │   │   ├── WebAPIPart1.spec.ts
 │   │   ├── WebAPIPart2.spec.ts
 ├── .gitignore
 ├── package-lock.json
 ├── package.json
```

## 🚀 설치 및 실행 방법

### 1. 레포지토리 클론
```sh
git clone https://github.com/letminjae/playwright.git
cd playwright
```

### 2. 패키지 설치
```sh
npm install
```

### 3. 테스트 실행

- **Regression 테스트 실행**
```sh
npm run regression
```

- **Web 테스트 실행**
```sh
npm run webTest
```

- **API 테스트 실행**
```sh
npm run APITest
```

- **Cucumber Regression 실행**
```sh
npm run CucumberRegression
```

## 📌 주요 기능

- Playwright를 활용한 UI 및 API 자동화 테스트
- Cucumber BDD 기반 테스트 적용
- Page Object Model (POM) 패턴 구현
- ExcelJS를 활용한 데이터 관리
- Allure Report를 통한 테스트 리포트 제공

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📞 문의

궁금한 점이 있다면 [Issues](https://github.com/letminjae/playwright/issues)에 등록해주세요.
