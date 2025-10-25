window.i18n_ja = {
  "name": "八谷航太（ヤタガイ コウタ）",
  "intro": "慶應義塾大学環境情報学部3年。リアルタイム通信に関わるソフトウェアを書いています。",
  "projects": {
    "title": "個人プロジェクト",
    "entries": [
      {
        "title": "Media over QUIC Transportを用いた低遅延ライブ配信デモ",
        "desc": "メディアプロトコルMoQTのクライアントを実装し，IETF120および122の相互接続試験に参加",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/posts/moqt-experiment/"}
        ]
      },
      {
        "title": "ネットワークプロトコルスタック開発",
        "desc": "「1000行で作るOS」のRISC-VベースOS上に，ICMPおよびARPプロトコルを処理するミニマルなネットワークスタックを実装",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Presentation", "url": "https://speakerdeck.com/kota_yata/2024nian-qiu-zhong-cun-yan-wipfa-biao-zi-liao"}
        ]
      },
      {
        "title": "P2P QUICにおけるアドレス変更時の通信維持機構の実装",
        "desc": "一時的に中間サーバーで通信を中継することで，QUICを用いたP2P通信のアドレス変更時の中断時間を大幅に削減",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/p2p-quic-migration"},
        ]
      }
    ]
  },
  "oss": {
    "title": "主なOSSへの貢献",
    "entries": [
      {
        "title": "jitsi/jitsi-videobridge",
        "desc": "WebRTC SFUサーバーにおける音声の選択的転送機能の実装",
        "links": [
          {"label": "PRs", "url": "https://github.com/jitsi/jitsi-videobridge/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "ntt-com/moq-wasm",
        "desc": "Media over QUIC TransportのPublisher実装の改善",
        "links": [
          {"label": "PRs", "url": "https://github.com/nttcom/moq-wasm/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "emiago/sipgo",
        "desc": "SIPメッセージのRefer-ToおよびReferred-Byヘッダーのパース機能を追加",
        "links": [
          {"label": "PRs", "url": "https://github.com/emiago/sipgo/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "mozilla/srihash.org",
        "desc": "SRIハッシュ生成サイトのUI改善",
        "links": [
          {"label": "PRs", "url": "https://github.com/mozilla/srihash.org/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
    ]
  },
  "work": {
    "title": "職歴",
    "entries": [
      {
        "title": "株式会社AbemaTV ストリーミングエンジニアインターン (2025年2月～4月)",
        "desc": "DAZNやWOWOWなど外部ソースからのライブ配信に対する広告挿入システム開発"
      },
      {
        "title": "株式会社RightTouch ソフトウェアエンジニアインターン (2024年4月～11月)",
        "desc": "SIP/SDPのネゴシエーションとRTPストリームの中継を行うVoIPプロキシサーバーの開発",
        "links": [
          {"label": "Blog post", "url": "https://zenn.dev/righttouch/articles/bb0c8fe06a2b8c"}
        ]
      },
      {
        "title": "株式会社ソラコム 夏季インターン (2024年8月～10月)",
        "desc": "帯域制限環境を想定したモバイルネットワーク上でのMedia over QUIC TransportとWebRTCの性能比較",
        "links": [
          {"label": "Blog post", "url": "https://blog.soracom.com/ja-jp/2024/11/27/webrtc-and-media-over-quic-transport-moqt/"}
        ]
      },
      {
        "title": "株式会社プレイド ソフトウェアエンジニアインターン (2023年3月～10月)",
        "desc": "MongoDBからBigQueryへのリアルタイムマイグレーション機構の開発",
        "links": [
          {"label": "Blog post", "url": "https://tech.plaid.co.jp/mongo-atlas-to-bigquery"}
        ]
      }
    ]
  },
  "lang-toggle": "English",
  "blog-link-href": "https://blog.kota-yata.com"
};
