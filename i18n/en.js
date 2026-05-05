window.i18n_en = {
  "name": "Kota Yatagai",
  "intro": "Fourth-year undergraduate student at Keio University. Loves random packet watching on Wireshark.",
  "fieldLabels": {
    "languages": "Languages",
    "protocols": "Protocols"
  },
  "featured": {
    "title": "Featured Projects and OSS Contributions",
    "entries": [
      {
        "title": "Receiver Audio Subscription for Jitsi Meet",
        "desc": "Jitsi Meet is an open source video conferencing system. I have implemented an audio subscription feature at Jitsi's media-relay server (jitsi-videobridge) so participants in a meeting can choose which audio stream to receive. This contribution was funded by GSoC 2025.",
        "links": [
          {"label": "Blog post", "url": "https://jitsi.org/blog/introducing-receiver-audio-subscriptions/"},
          {"label": "PRs", "url": "https://github.com/jitsi/jitsi-videobridge/pulls?q=is%3Apr+author%3Akota-yata"},
          {"label": "GSoC Profile", "url": "https://summerofcode.withgoogle.com/programs/2025/projects/aBy319rB"}
        ]
      },
      {
        "title": "Reducing Interruption Time under WiFi-to-Cellular Transitions in P2P Conferencing",
        "desc": "This is an academic research project. I performed packet-level analysis of P2P VoIP traffic (Teams/Zoom under certain conditions) and identified repetitive server handshakes as the main bottleneck in vertical network handover. To address this, I proposed a QUIC-based recovery system utilizing connection migration for near-instant fallback to server-relayed paths during WiFi-to-Cellular transitions. As part of this research, I contributed a fix to Wireshark's TURN dissector to support proprietary Teams extensions.",
        "links": [
          {"label": "Paper (Awaiting Review)", "url": "/assets/qswitch.pdf"},
          {"label": "Repository", "url": "https://github.com/kota-yata/p2p-quic-migration"},
          {"label": "Wireshark PRs", "url": "https://gitlab.com/wireshark/wireshark/-/merge_requests/?sort=created_date&state=all&author_username=kota-yata&first_page_size=20"}
        ]
      },
      {
        "title": "moqtail and Contribution at MoQ Community",
        "desc": "Media over QUIC (MoQ) is a media transport protocol that has been discussed at IETF moq WG since 2022. I implemented a TypeScript client of MoQ which I named moqtail, and first brought it to IETF120 for interop, where there were only 6 client implementations from companies like Google or Meta. The interop was a success and moqtail was also interopped at IETF122 and 123 with updated versions respectively. While I only contributed a small typo fix to the draft spec, I have contributed to several MoQ-related softwares such as moq-wasm or moq-obs.",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/moqtail"},
          {"label": "Blog post", "url": "https://blog.kota-yata.com/en/posts/moqt-experiment-en/"},
          {"label": "moq-wasm PRs", "url": "https://github.com/nttcom/moq-wasm/pulls?q=is%3Apr+author%3Akota-yata"},
          {"label": "moq-obs PRs", "url": "https://github.com/moq-dev/obs/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      }
    ]
  },
  "personal": {
    "title": "Personal Projects",
    "entries": [
      {
        "title": "Byrd: Memory-efficient MP3 Decoder in Go",
        "desc": "MP3 decoder in pure Go. Byrd reduces memory allocation by reusing buffers for decoding each frame as much as possible.",
        "languages": "Go",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/byrd-mp3"}
        ]
      },
      {
        "title": "Network Protocol Stack on os-in-1000",
        "desc": "Network protocol stack implementation that can handle ICMP and ARP messages. I wrote a 32-bit RISC-V OS first, reading operating-system-in-1000-lines, and then wrote the protocol stack on it.",
        "languages": "C",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/small-nick-os"}
        ]
      },
      {
        "title": "Kyache: RFC9111-compliant cache server",
        "desc": "Kyache is an HTTP shared cache server. It supports HTTP/2 and HTTP/3, and is compliant with most header attributes defined in RFC9111.",
        "languages": "Go",
        "links": [
          {"label": "Repository", "url": "https://github.com/kota-yata/kyache"}
        ]
      }
    ]
  },
  "work": {
    "title": "Work Experiences (Internships)",
    "entries": [
      {
        "title": "Mirrativ Inc. (December 2025 - Present)",
        "desc": "Migrated HLS streaming from MPEG-TS to fMP4. Reduced Go GC overhead by implementing manual memory allocation via mmap and conducted performance benchmarking.",
        "languages": "Go",
        "protocols": "HLS, MPEG-TS and fMP4"
      },
      {
        "title": "AbemaTV (February - April 2025)",
        "desc": "Implemented ad insertion for external live feeds, such as DAZN.",
        "languages": "Go, TypeScript and Rust",
        "protocols": "HLS, SCTE-35"
      },
      {
        "title": "RightTouch Inc. (April - November 2024)",
        "desc": "Implemented a proxy server for automated telephone response. Contributed to a SIP library in Go as part of the work.",
        "languages": "Go and TypeScript",
        "protocols": "SIP/SDP and RTP",
        "links": [
          {"label": "sipgo PRs", "url": "https://github.com/emiago/sipgo/pulls?q=is%3Apr+author%3Akota-yata"}
        ]
      },
      {
        "title": "SORACOM (August - October 2024)",
        "desc": "Conducted a performance comparison between Media over QUIC and WebRTC in bandwidth-restricted environments, such as those encountered in mobile usage scenarios.",
        "languages": "TypeScript",
        "protocols": "MoQ, WebRTC"
      },
      {
        "title": "PLAID Inc. (March - October 2023)",
        "desc": "Implemented real-time migration of logging data from MongoDB to BigQuery.",
        "languages": "Java"
      }
    ]
  },
  "fun-fact": {
    "title": "Some Braggings",
    "entries": [
      {
        "desc": "1. I discovered a fossil back in high school that turned out to be a new species, and it now carries my name! - Ceratophyus Yatagaii.",
      },
      {
        "desc": "2. I bench press 110kg and squat 140kg. No I don't do deadlifts because I'm scared."
      }
    ]
  },
  "lang-toggle": "日本語",
  "blog-link-href": "https://blog.kota-yata.com/en"
};
