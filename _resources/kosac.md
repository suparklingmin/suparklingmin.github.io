---
title: "KOSAC 감성 사전"
description: "KOSAC 코퍼스에서 도출한 형태소 단위 한국어 감성 사전"
---

**KOSAC 감성 사전**(Korean Sentiment Lexicon)은 **KOSAC**(KOrean Sentiment Analysis
Corpus)에서 도출한 형태소 단위 한국어 감성 사전입니다. KOSAC 자체는 세종 구문분석
말뭉치의 신문기사 332건·7,713문장에 KSML(Shin et al., 2012) 주석 체계로 감성 표현을
주석한 **코퍼스**이고, 이 사전은 그 코퍼스의 핵심 주관 표현(Seed)에서 어휘 차원의 감성
정보를 끌어내어 한국어 감성 분석에 폭넓게 쓸 수 있게 한 **파생 자원**입니다.

## 구축 방법

표제어는 Seed에서 추출한 형태소 N-gram입니다. 한 Seed가 다른 Seed를 포함할 때는
상위 Seed가 하위 Seed를 인용·부정·강조하며 감성값을 바꿀 수 있으므로, 감성값의 일관성을
위해 **다른 Seed와 겹치지 않는 최하위 Seed의 형태소만** 사용했습니다. 비(非)한글 문자나
문장부호가 포함된 것을 제외하고 가능한 모든 형태소 N-gram을 추출했습니다.

- 표제어 **16,362개** — unigram 3,476 · bigram 6,579 · trigram 6,307
- 의미 자질별 CSV **6개 파일**(`lexicon.zip`). 각 행은 한 N-gram의 감성 특성:
  - `ngram` — N-gram 표제어를 이루는 형태소
  - `freq` — 해당 N-gram을 포함한 Seed의 수
  - (의미 자질값) — 그 N-gram을 포함한 Seed 중 해당 값을 가진 비율
  - `max.value` — 비율이 가장 높은 값의 이름
  - `max.prop` — 그 최고 비율의 수치

## 정보

- **유형**: 감성 사전(lexicon) — KOSAC 코퍼스 파생 자원
- **언어**: 한국어
- **저장소**: [github.com/snunlp/KOSAC](https://github.com/snunlp/KOSAC) (`lexicon/`)

## 인용

KOSAC 코퍼스·감성 사전을 사용하면 다음을 인용해 주세요.

```bibtex
@article{kosaccorpus,
  title   = {KOSAC(Korean Sentiment Analysis Corpus): 한국어 감정 및 의견 분석 코퍼스},
  author  = {김문형 and 장하연 and 조유미 and 신효필},
  journal = {Information and Computation},
  year    = {2013},
}

@inproceedings{kosacguideline,
  title     = {Annotation Scheme for Constructing Sentiment Corpus in Korean},
  author    = {Shin, Hyopil and Kim, Munhyong and Jo, Yu-Mi and Jang, Hayeon and Cattle, Andrew},
  booktitle = {Proceedings of the 26th Pacific Asia Conference on Language, Information, and Computation (PACLIC 26)},
  year      = {2012},
}
```
