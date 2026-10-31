# THE SJH FILES Demo v7

이 버전은 `data/data.json`에 가상의 더미 데이터가 적용된 완성 예제입니다.

## 데이터 파일

수정할 파일은 하나입니다.

```text
data/data.json
```

## 전체 구조

```json
{
  "updatedAt": "2026-10-31",
  "kakaoChatUrl": "",
  "claims": [],
  "seopseopClub": []
}
```

### claims

```json
{
  "id": "claim-001",
  "name": "제보자 A",
  "damageDate": "2026-10-01",
  "amount": 3000000,
  "story": "비고 또는 사연"
}
```

- `id`: 중복되지 않는 내부 식별자
- `name`: 화면에 표시할 이름
- `damageDate`: `YYYY-MM-DD`
- `amount`: 숫자만 입력. 쉼표나 `원`을 넣지 않음
- `story`: 비고/사연

`amount`를 기준으로 자동 내림차순 정렬되고 등급도 자동 계산됩니다.

### seopseopClub

```json
{
  "id": "seopseop-001",
  "name": "섭섭이 A",
  "story": "사연"
}
```

### 카카오톡 링크

실제 오픈채팅 링크가 생기면:

```json
"kakaoChatUrl": "https://open.kakao.com/o/실제코드"
```

빈 문자열이면 버튼은 비활성화됩니다.

## 등급

- S CLASS: 3,000,000원 이상
- A CLASS: 1,000,000원 이상
- B CLASS: 500,000원 이상
- C CLASS: 500,000원 미만

## 주의

현재 데이터는 모두 가상 데이터입니다. 실데이터로 교체할 때 전화번호, 계좌번호, 주소, 신분증 등 개인정보나 민감정보는 공개 JSON에 넣지 않는 것을 권장합니다.


## 금전 피해 없는 접촉 사례

`contacts` 배열에 넣습니다.

```json
{
  "id": "contact-001",
  "name": "홍*동",
  "contactDate": "2026-10-25",
  "contactMethod": "카카오톡",
  "summary": "거래 제안을 받았으나 실제 송금이나 금전 피해는 발생하지 않았습니다."
}
```

- `name`: 공개용 마스킹 이름 권장
- `contactDate`: 연락이 온 날짜
- `contactMethod`: 카카오톡 / 문자 / 전화 / SNS DM 등
- `summary`: 실제 금전 피해가 없었다는 점을 포함해 사실 위주로 간단히 작성

`contacts`는 피해 주장 금액 합계나 피해액 순위에 포함되지 않습니다.


## v9 경고 테마 변경

- 메인 타이틀: `SJH-GATE`
- 빨강/주황 중심 경고 컬러
- 상단에 빨강/파랑 교차 점멸 경광등 애니메이션
- `prefers-reduced-motion` 환경에서는 애니메이션 자동 비활성화
- 실제 사이렌 소리는 자동재생하지 않음
