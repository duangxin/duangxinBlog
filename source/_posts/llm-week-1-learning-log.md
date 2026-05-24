---
title: Week 1 学习记录（4.14 - 4.19）
date: 2026-04-19 20:00:00
categories:
  - 每周学习总结
tags:
  - llm
  - learning
  - llava
source: https://github.com/duangxin/LLM-learing/blob/main/week1/week1_log.md
---

> 来源：[duangxin/LLM-learing week1/week1_log.md](https://github.com/duangxin/LLM-learing/blob/main/week1/week1_log.md)

## 文献阅读

### LLaVA
- 阅读了 LLaVA（Large Language and Vision Assistant）相关文献
- LLaVA 通过扩展 **CLIP** 视觉编码器，将视觉特征与大语言模型对齐，实现多模态理解
- 了解了 CLIP 在多模态场景下的作用：通过对比学习将图像与文本映射到统一的表征空间

## 知识学习

### 全监督学习（Fully Supervised Learning）
- 训练数据均带有标注标签
- 模型直接通过有标签数据进行监督训练

### 自监督学习（Self-Supervised Learning）
- 无需人工标注，利用数据本身的结构构造监督信号
- 典型方法：对比学习（如 CLIP）、掩码预测（如 MAE、BERT）

### 微调（Fine-tuning）
- 在预训练模型基础上，用特定任务的数据进行进一步训练
- 可分为全参数微调和参数高效微调（如 LoRA、Adapter）
