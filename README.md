# 子供支援サービス「ぶらすま！」
## 概要
第4回 東京都知事杯オープンデータハッカソンにて、アイデア部門で  
参加した作品のチャットボット機能をアプリ化したもの.  
Google Gemma2 にてファインチューニングをした3つのモデルを用意.  
用途別で利用が可能.  
- 相談型: 優しい保健室の先生をイメージ
- 勉強型: 優しく誠実な講師をイメージ
- 遊び型: わんぱくな小学生をイメージ

## 開発メンバー
  - ワン ([@WXA0718](https://github.com/WXA0718)) / 全体リーダー・フロント&バックエンド担当
  - 石井 ([@Sanchi7412](https://github.com/Sanchi7412)) / 開発リーダー・バックエンド・インフラ・AIチューニング担当
  - 小澤 ([@rupori](https://github.com/rupori)) / AIチューニング・資料担当
  - 西澤 ([@jun05006](https://github.com/jun05006)) / AIチューニング・資料担当
  - 磯井 ([@kodaiisoi](https://github.com/kodaiisoi)) / フロントエンド担当

## 使用技術
| | |
| ------------- | ------------- |
| 言語 | TypeScript, JavaScript, HTML, CSS, Python3, Ruby(dev) |  
| フレームワーク | Next.js, Bootstrap 5, Ruby on Rails(dev) |
| タスク管理 | Notion |
| バージョン管理 | GitHub |
| AIモデル | Gemma2 7b, Gemini 1.5 pro |
| ローカル駆動 | Ollama(dev) |
| その他 | Tailscale(funnel) |

## 開発について
フレームワークについて、Vue3とNextで検討し、  
1. 情報量が豊富  
2. 使ったことがないものを触ってみたい(vue3はインターンで経験)
   
ということからNext.jsでの開発を採用.  
2週間の学習期間からハンズオンという形で作成を開始.  
また、当初はlocalLLMをやってみたいねということで、  
自宅vmにollamaを構築しそことのやり取りを行っていた.([API](https://github.com/Sanchi7412/chatai-api/tree/master))  
しかし、推論時間が長すぎて断念. 以降Google AI Studioを利用.  
それぞれ経験が浅かったため、GitHubやNode.jsについての勉強会を実施し、相互理解を深めることで開発についてのモチベーションを維持.  
結果として、実際に動作するものが完成し発表と同時に実演を披露.  
8チーム中2位の成績で終了.  

## リンク集
- [企画書](https://peridot-playground-76d.notion.site/planning?pvs=4)
- [タスク管理](https://peridot-playground-76d.notion.site/task?v=4ac5ae28f7f340e88f7013413935f8e2&pvs=4)
- [提出資料(ハッカソン)](https://drive.google.com/file/d/1Cj9RW3KVWyKUNHCz8rSzxFfHEJI93ASq/view?usp=sharing)
- [提出資料(本作品)](https://drive.google.com/file/d/18p_ot3ftAegNo3Oe0zBVKxvbNC0H1pUy/view?usp=drive_link)
