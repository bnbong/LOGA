# ⚡ LOL Roster Gacha

리그오브레전드 프로 선수 랜덤 가챠 게임! 당신만의 드림팀을 소환하고, 우승 로스터를 완성하세요!

## 🎮 Features

- **랜덤 선수 가챠**: FIFA 스타일의 카드 리빌 애니메이션으로 프로 선수를 랜덤하게 뽑기
- **우승 로스터 감지**: 실제 우승팀 로스터를 완성하면 특별한 축하 애니메이션 표시
- **🏆 우승자 배지**: 월드 챔피언십, MSI 등 주요 대회 우승자에게 트로피 배지 표시 (년도 및 대회 정보 포함)
- **🌍 다국어 지원**: 한글/영어 언어 전환 기능
- **📱 커뮤니티 공유**: 다른 사용자들과 로스터 공유 및 좋아요/댓글 기능
- **LOL 테마 디자인**: 헥스테크 배경, 골드 컬러 등 리그오브레전드 공식 디자인 테마
- **인터랙티브 UI**: Framer Motion을 사용한 부드러운 애니메이션 효과
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🏆 지원하는 대회 데이터

- **LCK** (2013-2025)
- **LPL** (2013-2025)
- **LEC** (2013-2025)
- **LCS** (2013-2025)
- **Worlds Championship** (2013-2025)
- **MSI** (2015-2025)

우승 및 준우승 로스터를 정확히 완성하면 특별한 애니메이션과 함께 축하 메시지가 표시됩니다!

## ✨ 새로운 기능

### 우승자 배지 개선

- 왕관 아이콘에서 트로피 아이콘으로 변경
- 카드 모서리에 걸치는 형태로 배치
- 우승 대회 및 년도 정보 툴팁 표시
- 골드 그라데이션 및 발광 효과

### 다국어 지원

- 우측 상단의 언어 전환 버튼으로 한글/영어 변경 가능
- UI 텍스트, 버튼, 메시지 등 전체 번역
- 로컬 스토리지에 언어 설정 저장

### 공유 스토리지 솔루션

- 로컬 스토리지와 Firebase 지원
- 다른 사용자들과 로스터 실시간 공유
- 좋아요 및 댓글 기능
- 자세한 설정 방법은 [STORAGE_SOLUTION.md](STORAGE_SOLUTION.md) 참조

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 이상
- npm, yarn, pnpm 또는 bun

### Installation

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

### Build

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deployment**: Vercel (권장)

## 🎨 Design Features

### LOL 브랜드 컬러

- **골드**: `#C89B3C` - 메인 강조 색상
- **블루**: `#0AC8B9` - 서브 강조 색상
- **다크**: `#010A13` - 배경 색상

### 특수 효과

- 헥스테크 육각형 패턴 배경
- 골드 글로우 효과 (우승 관련 요소)
- 챔피언십 펄스 애니메이션
- FIFA 스타일 카드 리빌 애니메이션

## 📂 Project Structure

```
lol-roster-gacha/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 가챠 페이지
│   ├── community/         # 커뮤니티 페이지 (개발 예정)
│   └── globals.css        # 글로벌 스타일 (LOL 테마)
├── components/            # React 컴포넌트
│   ├── PlayerCard.tsx     # 선수 카드 컴포넌트
│   ├── GachaModal.tsx     # 가챠 애니메이션 모달
│   └── ChampionshipCelebration.tsx  # 우승 축하 애니메이션
├── data/                  # 데이터 파일
│   ├── players.ts         # 선수 데이터 (2020-2024)
│   └── championships.ts   # 우승 로스터 데이터
└── types/                 # TypeScript 타입 정의
    └── index.ts
```

## 🎯 How to Play

1. **선수 소환**: 포지션 슬롯을 클릭하거나 "Summon Random Player" 버튼 클릭
2. **카드 확인**: FIFA 스타일 리빌 애니메이션으로 선수 확인
3. **선택**: 마음에 들면 "Confirm", 다시 뽑으려면 "Reroll" 클릭
4. **로스터 완성**: 5개 포지션 (TOP, JUNGLE, MID, ADC, SUPPORT) 모두 채우기
5. **우승 확인**: 실제 우승 로스터를 완성하면 특별한 축하 애니메이션 등장!

## 🌟 Upcoming Features

- [ ] 로스터 공유 기능 (URL 링크 생성)
- [ ] 커뮤니티 페이지 (다른 사용자 로스터 보기)
- [ ] 댓글 시스템
- [ ] 우승 로스터 갤러리
- [ ] 더 많은 선수 데이터 추가
- [ ] 선수 검색 및 필터 기능

## 📝 Data Sources

현재 약 40-50명의 주요 선수 데이터가 포함되어 있습니다:

- 2020-2024년 주요 대회 우승/준우승팀 선수
- T1, Gen.G, JDG, BLG, G2 등 주요 팀

더 많은 선수 데이터를 추가하려면 [data/players.ts](data/players.ts) 파일을 수정하세요.

## 🤝 Contributing

이 프로젝트에 기여하고 싶으신가요?

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

이 프로젝트는 교육 및 팬 프로젝트 목적으로 만들어졌습니다.
Riot Games의 지적 재산권을 존중하며, 상업적 용도로 사용되지 않습니다.

## 👏 Acknowledgments

- **Riot Games** - League of Legends 브랜드 및 디자인
- **Leaguepedia** - e-sports 데이터 참고
- **원본 사이트** - 아이디어 영감 제공

---

Made with ⚡ by League of Legends fans
