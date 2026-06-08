---
title: "KR-SBERT"
description: "한국어 문장 임베딩(Sentence-BERT) 모델 · 768차원"
---

**KR-SBERT**는 한국어에 특화된 Sentence-BERT 문장 임베딩 모델입니다. 문장이나 단락을
**768차원** 밀집 벡터로 변환하여, 문장 간 의미 유사도 계산·의미 기반 검색·문장 군집화
등에 활용할 수 있습니다. 여기서 소개하는 버전은
`snunlp/KR-SBERT-V40K-klueNLI-augSTS`입니다.

## 구조와 학습

- BERT 인코더(`max_seq_length` 128) 위에 **평균 풀링**(mean pooling)을 얹어 768차원 문장
  임베딩을 만듭니다.
- 40K 어휘(V40K) 모델을 기반으로 **KLUE-NLI**와 증강 **STS**(klueNLI-augSTS) 데이터로
  미세조정했습니다.
- 문서 분류 튜토리얼 기준 정확도 **0.8628**로, 공개된 KR-SBERT 변형들 가운데 가장 높습니다.

## 사용법

[sentence-transformers](https://www.sbert.net)로 간단히 불러와 쓸 수 있습니다.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')
embeddings = model.encode(["이것은 예시 문장입니다", "각 문장이 벡터로 변환됩니다"])
print(embeddings)
```

## 정보

- **유형**: 문장 임베딩 모델 (Sentence-BERT, 768차원)
- **언어**: 한국어
- **모델**: [huggingface.co/snunlp/KR-SBERT-V40K-klueNLI-augSTS](https://huggingface.co/snunlp/KR-SBERT-V40K-klueNLI-augSTS)
- **저장소**: [github.com/snunlp/KR-SBERT](https://github.com/snunlp/KR-SBERT)

## 인용

```bibtex
@misc{kr-sbert,
  author       = {Park, Suzi and Shin, Hyopil},
  title        = {KR-SBERT: A Pre-trained Korean-specific Sentence-BERT model},
  year         = {2021},
  publisher    = {GitHub},
  journal      = {GitHub repository},
  howpublished = {\url{https://github.com/snunlp/KR-SBERT}}
}
```
