window.i18n_en = {
  "name": "Kota Yatagai",
  "intro": "Third-year undergraduate student at Keio University.",
  "projects": {
    "title": "Personal Projects",
    "entries": [
      {
        "title": "moqtail: a client implementation of Media over QUIC",
        "desc": `Implemented a MoQT client and participated in interop tests at IETF 120 and 122. Moqtail
         provides generic serializers/deserializers for MoQT draft-11 control messages, along with an abstract
         WebWorker interface for transport communication.`,
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/en/posts/moqt-experiment-en/"}
        ]
      },
      {
        "title": "Seamless connection migration in P2P QUIC",
        "desc": `Developed a new method to reduce interruption time when a peer's IP address changes
         during a direct p2p connection. This system immediately routes the media through an intermediate server
          upon address change, guaranteeing continuous service, and then quietly re-establishes the direct 
          peer-to-peer link in the background. Utilizing QUIC makes this \"immediate fallback\" approach possible 
          and quick thanks to its connection migration feature.`,
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/p2p-quic-migration"}
        ]
      }
    ]
  },
  "oss": {
    "title": "Open Source Contributions",
    "entries": [
      {
        "title": "jitsi/jitsi-videobridge",
        "desc": "Implemented a selective audio forwarding in a WebRTC SFU server",
        "links": [
          {"label": "PRs", "url": "https://github.com/jitsi/jitsi-videobridge/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "wireshark/wireshark",
        "desc": "Added support for parsing Data Indication message in MS-TURN protocol",
        "links": [
          {"label": "PRs", "url": "https://gitlab.com/wireshark/wireshark/-/merge_requests/23814"}
        ]
      },
      {
        "title": "ntt-com/moq-wasm",
        "desc": "Enhanced the Publisher implementation of Media over QUIC Transport",
        "links": [
          {"label": "PRs", "url": "https://github.com/nttcom/moq-wasm/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "emiago/sipgo",
        "desc": "Added parsing support for Refer-To and Referred-By headers in SIP messages",
        "links": [
          {"label": "PRs", "url": "https://github.com/emiago/sipgo/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "mozilla/srihash.org",
        "desc": "Improved the UI for better usability of the SRI hash generator tool",
        "links": [
          {"label": "PRs", "url": "https://github.com/mozilla/srihash.org/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
    ]
  },
  "qualifications": {
    "title": "Qualifications, Adoptions, Awards, etc.",
    "entries": [
      {
        "title": "IPA Fundamental Information Technology Engineer (2021)",
        "desc": "Acquired in the second year of high school",
        "links": [
          {"label": "Syallabus", "url": "https://www.ipa.go.jp/en/it-examinations/nph2g600000007uh-att/000009637.pdf"}
        ]
      },
      {
        "title": "Google Summer of Code (2025)",
        "desc": "Selected for the Jitsi project and implemented selective audio forwarding in Jitsi Videobridge",
        "links": [
          {"label": "GSoC Profile", "url": "https://summerofcode.withgoogle.com/programs/2025/projects/aBy319rB"}
        ]
      },
      {
        "title": "IPA Security Camp (2025)",
        "desc": "Implemented L4LB and cache servers in the self-built CDN seminar and constructed a small-scale PoP on actual machines.",
        "links": []
      },
      {
        "title": "Digital Agency Hackathon - Data Provision Award (2025)",
        "desc": "Defined XML schema for notifications and circulars, and implemented a parser.",
        "links": [
          {"label": "Official report", "url": "https://www.digital.go.jp/en/news/9fb5ef8e-c631-4974-96d9-0b145304c553#:~:text=to%20accumulate%20cases.-,Laws%20and%20regulations%20Data%2Dsharing%20Award,-Notice%20and%20release"}
        ]
      }
    ]
  },
  "work": {
    "title": "Work Experience",
    "entries": [
      {
        "title": "Streaming Engineer Intern at AbemaTV, Inc. (Feb - Apr 2025)",
        "desc": "Developed ad insertion systems for live streams from external sources such as DAZN or WOWOW."
      },
      {
        "title": "Software Engineer Intern at RightTouch Inc. (Apr - Nov 2024)",
        "desc": "Worked on synonym search integration, SSR site generation, and a VoIP proxy server handling SIP/SDP and RTP streams"
      },
      {
        "title": "Summer Intern at SORACOM (Aug - Oct 2024)",
        "desc": "Evaluated Media over QUIC Transport and WebRTC performance under constrained mobile network conditions."
      },
      {
        "title": "Software Engineer Intern at PLAID, Inc. (Mar - Oct 2023)",
        "desc": "Developed a real-time data synchronization system from MongoDB to BigQuery"
      }
    ]
  },
  "lang-toggle": "日本語",
  "blog-link-href": "https://blog.kota-yata.com/en"
};
