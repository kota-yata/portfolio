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
        "title": "P2P会議におけるWiFiからセルラーへの切り替え時の中断時間の削減（学術研究）",
        "desc": "回線切り替え時のP2P通話の中断を最小化するため、QUICベースの復帰機構を実装",
        "links": [
          {"label": "Paper (Awaiting Review)", "url": "/assets/qswitch.pdf"},
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
          {"label": "PRs", "url": "https://github.com/jitsi/jitsi-videobridge/pulls?q=is%3Apr+author%3Akota-yata"},
          {"label": "Blog post", "url": "https://jitsi.org/blog/introducing-receiver-audio-subscriptions/"},
        ]
      },
      {
        "title": "wireshark/wireshark",
        "desc": "MS-TURNのData Indicationメッセージ判別の実装",
        "links": [
          {"label": "PRs", "url": "https://gitlab.com/wireshark/wireshark/-/merge_requests/?sort=created_date&state=all&author_username=kota-yata&first_page_size=20"}
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
  "qualifications": {
    "title": "資格，採択・受賞歴等",
    "entries": [
      {
        "title": "基本情報処理技術者 (2021年取得)",
        "desc": "高校2年次に取得",
        "links": []
      },
      {
        "title": "Google Summer of Code (2025年度採択)",
        "desc": "Jitsiプロジェクトに採択され，Jitsi Videobridgeの音声選択的転送機能を実装",
        "links": [
          {"label": "GSoC profile", "url": "https://summerofcode.withgoogle.com/programs/2025/projects/aBy319rB"}
        ]
      },
      {
        "title": "セキュリティ・キャンプ全国大会 (2025年度修了)",
        "desc": "CDN自作ゼミにてL4LB，キャッシュサーバーを実装し実機で小規模なPoPを構築",
        "links": [
          {"label": "Report", "url": "https://blog.kota-yata.com/posts/seccamp25/"}
        ]
      },
      {
        "title": "デジタル庁ハッカソン 法令等データ提供賞 (2025年度受賞)",
        "desc": "通知，通達文書のXMLスキーマを定義し，パーサーを実装",
        "links": [
          {"label": "Official report", "url": "https://www.digital.go.jp/news/9fb5ef8e-c631-4974-96d9-0b145304c553#:~:text=%E3%81%A8%E3%81%97%E3%81%A6%E6%B4%BB%E7%94%A8%E5%8F%AF%E8%83%BD%E3%80%82-,%E6%B3%95%E4%BB%A4%E7%AD%89%E3%83%87%E3%83%BC%E3%82%BF%E6%8F%90%E4%BE%9B%E8%B3%9E,-%E9%80%9A%E7%9F%A5%E3%83%BB%E9%80%9A%E9%81%94Lawtext"}
        ]
      }
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
