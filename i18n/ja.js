window.i18n_ja = {
  "name": "八谷航太（ヤタガイ コウタ）",
  "intro": "慶應義塾大学環境情報学部3年．リアルタイム通信に関わるソフトウェアを書いています．",
  "fieldLabels": {
    "languages": "使用言語",
    "protocols": "プロトコル"
  },
  "featured": {
    "title": "主なプロジェクトとOSSへの貢献",
    "entries": [
      {
        "title": "Receiver Audio Subscription in Jitsi Meet",
        "desc": "OSSビデオ会議ツールJitsiのメディアリレーサーバーであるjitsi-videobridgeに，会議参加者が受信する音声ストリームを選べる音声購読機能を実装しました。この貢献はGSoC 2025の支援を受けたものです。",
        "links": [
          {"label": "PRs", "url": "https://github.com/jitsi/jitsi-videobridge/pulls?q=is%3Apr+author%3Akota-yata"},
          {"label": "GSoC Profile", "url": "https://summerofcode.withgoogle.com/programs/2025/projects/aBy319rB"}
        ]
      },
      {
        "title": "P2P ConferencingにおけるWiFiからセルラーへの切り替え時の中断時間削減",
        "desc": "学術研究プロジェクトとして、特定条件下のTeamsおよびZoomのP2P VoIPトラフィックをパケットレベルで解析し、垂直ハンドオーバー時の主なボトルネックが繰り返されるサーバーハンドシェイクにあることを特定しました。これに対して、WiFiからセルラーへの切り替え時にサーバー中継経路へ即座にフォールバックできるよう、connection migrationを活用したQUICベースの復帰機構を提案しました。またこの研究の一環として、Teams独自拡張に対応するためWiresharkのTURN dissector修正にも貢献しました。",
        "links": [
          {"label": "Paper (Awaiting Review)", "url": "/assets/qswitch.pdf"},
          {"label": "Repository", "url": "https://github.com/kota-yata/p2p-quic-migration"},
          {"label": "Wireshark PRs", "url": "https://gitlab.com/wireshark/wireshark/-/merge_requests/?sort=created_date&state=all&author_username=kota-yata&first_page_size=20"}
        ]
      },
      {
        "title": "moqtail と MoQコミュニティへの貢献",
        "desc": "Media over QUIC (MoQ) は、2022年からIETFのmoq WGで議論されているメディア転送プロトコルです。私はmoqtailと名付けたTypeScript製のMoQクライアントを実装し、GoogleやMetaなどの企業実装を含めてもクライアント実装が4つしかなかったIETF120の相互接続試験に持ち込みました。この相互接続試験は成功し、moqtailは更新版とともにIETF122および123でも相互接続試験に参加しました。仕様ドラフトへの直接の貢献は小さなtypo修正だけでしたが、moq-wasmやmoq-obsなど複数のMoQ関連ソフトウェアにも貢献しています。",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/posts/moqt-experiment/"},
          {"label": "moq-wasm PRs", "url": "https://github.com/nttcom/moq-wasm/pulls?q=is%3Apr+author%3Akota-yata"},
          {"label": "moq-obs PRs", "url": "https://github.com/DDRBoxman/moq-obs/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      }
    ]
  },
  "personal": {
    "title": "個人プロジェクト",
    "entries": [
      {
        "title": "os-in-1000上のネットワークプロトコルスタック",
        "desc": "ICMPおよびARPメッセージを処理できるネットワークプロトコルスタックを実装しました。まず operating-system-in-1000-lines を読みながら32-bit RISC-V OSを書き、その上にプロトコルスタックを実装しました。",
        "languages": "C",
        "links": [
          {"label": "Presentation", "url": "https://speakerdeck.com/kota_yata/2024nian-qiu-zhong-cun-yan-wipfa-biao-zi-liao"},
          {"label": "Repository", "url": "https://github.com/kota-yata/small-nick-os"}
        ]
      },
      {
        "title": "TCP Simultaneous Open",
        "desc": "TCP接続を素早く確立するTCP Simultaneous OpenのC実装です。",
        "languages": "C",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/tcp-simultaneous-open"}
        ]
      }
    ]
  },
  "fun-fact": {
    "title": "ちょっとした自慢",
    "entries": [
      {
        "desc": "高校時代に見つけた化石が新種と判明し、私の名前が付きました。Ceratophyus yatagaii です。"
      },
      {
        "desc": "ベンチプレス110kg、スクワット140kgです。デッドリフトは怖いのでやりません。"
      }
    ]
  },
  "work": {
    "title": "職務経験（インターンシップ）",
    "entries": [
      {
        "title": "Mirrativ Inc.（2025年12月 - 現在）",
        "desc": "HLS配信をMPEG-TSからfMP4へ移行しました。mmapによる手動メモリアロケーションを実装してGoのGCオーバーヘッドを削減し、性能評価も行いました。",
        "languages": "Go",
        "protocols": "HLS、MPEG-TS、fMP4"
      },
      {
        "title": "AbemaTV（2025年2月 - 4月）",
        "desc": "DAZNなどの外部ライブフィード向けに広告挿入を実装しました。",
        "languages": "Go、TypeScript、Rust",
        "protocols": "HLS、SCTE-35"
      },
      {
        "title": "RightTouch Inc.（2024年4月 - 11月）",
        "desc": "自動音声応答のためのプロキシサーバーを実装しました。業務の一環としてGo製SIPライブラリにも貢献しました。",
        "languages": "Go、Java、TypeScript",
        "protocols": "SIP/SDP、RTP",
        "links": [
          {"label": "sipgo PRs", "url": "https://github.com/emiago/sipgo/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "SORACOM（2024年8月 - 10月）",
        "desc": "モバイル利用を想定した帯域制限環境で、Media over QUICとWebRTCの性能比較を行いました。",
        "languages": "TypeScript",
        "protocols": "MoQ、WebRTC"
      },
      {
        "title": "PLAID Inc.（2023年3月 - 10月）",
        "desc": "MongoDBからBigQueryへのログデータのリアルタイム移行を実装しました。",
        "languages": "Java"
      }
    ]
  },
  "lang-toggle": "English",
  "blog-link-href": "https://blog.kota-yata.com"
};
