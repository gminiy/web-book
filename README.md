## 공용 도서 관리

### 목적

 공용 도서 보유 현황 파악 및 각 도서에 대한 사용자들의 리뷰와 평가(좋아요, 싫어요)를 보여준다.

### 권한 및 기능

계층적 상속을 하는 사용 권한 구조

- 회원이 아닌 일반 유저
  - 회원 가입
  
- 회원
  - 로그인/아웃
  - 도서 및 리뷰에 좋아요/싫어요
  - 리뷰 달기/삭제
  - 리뷰에 댓글 달기/삭제
  - 회원 탈퇴
  
- 관리자
  - 도서 목록 관리

### WireFrame

- 로그인하지 않은 메인 화면

![Untitled Diagram](https://user-images.githubusercontent.com/25456956/61349638-badfb400-a89f-11e9-9f5d-5397a1d0f191.jpg)


- 로그인 후 도서 자세히 보기

![Untitled Diagram (1)](https://user-images.githubusercontent.com/25456956/61349667-e06cbd80-a89f-11e9-9320-599cae64bac1.jpg)

### Pages

- 메인 페이지
- 도서 상세 페이지
- 관리자 도서 등록 페이지
- 회원 가입 페이지
- 로그인 페이지

### DB

- User

| Key       | Value           |
| --------- | --------------- |
| id        | 사용자 id   |
| password  | 사용자 비밀번호 |
| nickname        | 사용자 닉네임 |
| privilege | 사용자 권한     |

- Book

| Key              | Value            |
| ---------------- | ---------------- |
| title            | 도서 제목        |
| id               | 도서 고유 아이디 |
| registrationDate | 등록 날짜        |
| publisher        | 출판사           |
| author           | 도서 저자        |
| publicationDate    | 발행일           |
| description      | 부가 설명        |
| likes            | 좋아요 개수      |
| hates            | 싫어요 개수      |

- Review

| Key              | Value                   |
| ---------------- | ----------------------- |
| id               | Review 고유 아이디      |
| bookId           | Review 달린 도서 아이디 |
| writerId         | 글쓴이 아이디           |
| likes            | 좋아요 개수             |
| hates            | 싫어요 개수             |
| content          | 내용                    |
| registrationDate | 등록 날짜               |

- Comment

| Key              | Value                      |
| ---------------- | -------------------------- |
| id               | Comment 고유 아이디        |
| reviewID         | comment 달린 review 아이디 |
| writerID         | 글쓴이 아이디              |
| content          | 내용                       |
| registrationDate | 등록날짜                   |

### URL
* 회원 가입 요청 : POST /auth/register
* 로그인 : POST /auth/login
* 로그아웃 : POST /auth/logout
* 도서등록 : POST /book
* 도서수정 : PUT /book
* 도서삭제 : DELETE /book



### 추후 확장

- 회원 정보 개인 페이지
- 대여 반납 시스템
- 회원 정보 변경 페이지
- 좋아요 및 리뷰 개수 기반 랭킹 추천 페이지
- 관리자 회원 관리 페이지
- 관리자 도서 개수, 리뷰 및 좋아요 통계 확인 페이지
- 회원 읽고 싶은 도서 목록 관리 페이지