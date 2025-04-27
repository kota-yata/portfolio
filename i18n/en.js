window.i18n_en = {
  "name": "Kota Yatagai",
  "intro": "Software engineer developing real-time communication systems. 3rd-year undergrads at Keio Univ.",
  "projects": {
    "title": "Personal Projects",
    "entries": [
      {
        "title": "Low-latency live streaming demo using Media over QUIC Transport",
        "desc": "Implemented a MoQT client and participated in interop tests at IETF 120 and 122",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/en/posts/moqt-experiment-en/"}
        ]
      },
      {
        "title": "Network protocol stack development",
        "desc": "Implemented a minimal ICMP and ARP handling network stack on a self-built RISC-V based OS",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/small-nick-os"}
        ]
      },
      {
        "title": "P2P communication over QUIC",
        "desc": "Implemented a method to establish P2P communication over QUIC by tunneling through ICE protocol",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/p2p-aioice-aioquic"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/en/posts/quic-p2p-en/"}
        ]
      }
    ]
  },
  "oss": {
    "title": "Open Source Contributions",
    "entries": [
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
      {
        "title": "quinn-rs/quinn",
        "desc": "Enhanced documentation and ensured sample code builds successfully in the Rust QUIC library",
        "links": [
          {"label": "PRs", "url": "https://github.com/quinn-rs/quinn/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      }
    ]
  },
  "work": {
    "title": "Work Experience",
    "entries": [
      {
        "title": "Streaming Engineer Intern at AbemaTV, Inc. (Feb - Apr 2025)",
        "desc": "Developed ad insertion systems for live streams from external sources like DAZN and WOWOW using Go and TypeScript"
      },
      {
        "title": "Software Engineer Intern at RightTouch Inc. (Apr - Nov 2024)",
        "desc": "Worked on synonym search integration, SSR site generation, and a proxy server handling SIP/SDP/RTP protocols"
      },
      {
        "title": "Summer Intern at SORACOM (Aug - Oct 2024)",
        "desc": "Evaluated Media over QUIC Transport and WebRTC performance under constrained mobile network conditions using TypeScript"
      },
      {
        "title": "Software Engineer Intern at PLAID, Inc. (Mar - Oct 2023)",
        "desc": "Developed a real-time data synchronization system from MongoDB to BigQuery, designing high-reliability data transfer mechanisms in Java"
      }
    ]
  },
  "lang-toggle": "日本語",
  "blog-link-href": "https://blog.kota-yata.com/en"
};