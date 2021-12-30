---
title: SSIの論文を和訳してみる
date: 2020-12-20
category: Research
description: SSIの論文、'Self-sovereign Identity − Opportunities and Challenges for the Digital Revolution'を和訳します
ogp: /ogp.jpeg
---

# 訳者によるまえがき

今回和訳する論文は2017年のSSIに関する論文[Self-sovereign Identity − Opportunities and Challenges for the Digital Revolution](https://arxiv.org/abs/1712.01767)である。

なお、原文内で「Self-sovereign degital identity」と書かれている部分は「自己主権型デジタルアイデンティティ」と訳し、「Self-sovereign Identity」と書かれている部分は「SSI」と訳している。

# 訳文

## 要約（Abstract）

人とサービス、端末の相互接続性はデジタル革命における一つの決定的な側面であり、安全なデジタルアイデンティティは合法的に情報交換をするための前提条件である。

現状、このセキュアなアイデンティティ管理を提供しているのは中央集権的なIDプロバイダ、例えば国家機関やオンラインサービスのプロバイダに限られている。そのため、データをプロバイダ間で移行する手順はなく、新しいサービスに移行する、もしくは居住地を変更する場合は新たにIDを作らなければならない。

自己主権型デジタルアイデンティティは今までと違い、個人によるアイデンティティの作成・管理とサービスプロバイダや国のeIDインフラから独立したデジタルアイデンティティの維持を可能にする。

## 目次（Table of Contents）

1. 障壁のないデジタルアイデンティティ（Digital Identities without Barriers）
2. 個人のための自己主権型デジタルアイデンティティ（Self-sovereign Digital Identities for Persons）
3. ISÆN: 人類のためのSSI標準化（Standardizing Self-sovereign Identities for Human Beings）
4. Outlook: 物、組織のためのSSI（Self-sovereign Identities for Things and Institutions）

## 1. 障壁のないデジタルアイデンティティ

デジタルアイデンティティはヨーロッパだけでなく世界中で日常生活の一部になっている。ネット上のサービスでは、従来はユーザー名とパスワードで十分だったが、チップやセキュリティトークン、eIDなど特殊なソフト・ハードウェアによるユーザーの安全な識別が求められている。人間の識別に加えて、人間でないもの: 企業やデバイスなどの認識も、情報交換において重要になり、データや情報のソースの検証も重要になっている。IoTやConnected Carなどの経済発展には、信頼に値するシステムや人間の識別が鍵である。

各デジタルアイデンティティは、アイデンティティの断片から構成され、通常は特定のサービスへのアクセスや別のエンティティとのデータ・情報交換など、特定の目的のもと作成される。それぞれのデジタルアイデンティティにおいて、記述の正確さや抽象化の度合いなどの情報の詳細さは異なる。加えて、デジタルアイデンティティは明確な時間軸を持ち、ある程度の変更は許容される必要がある（住所や口座情報、身長や最終学歴など）。つまり**あるエンティティに対してのアイデンティティは一つだが、デジタルアイデンティティは複数存在しえる**。人間の場合はこのデジタルアイデンティティが瞬く間に膨大な数に達する。

「セキュアなデジタルアイデンティティ」という言葉はプライバシーと信頼性の条件をまとめたものである。プライバシーとは、認証された人、組織、システムのみがデジタルアイデンティティにアクセスできること、その許可はデジタルアイデンティティに記述されているエンティティによって与えられることを意味する。信頼性とは、デジタルアイデンティティを含む情報の正確性、つまり情報が実際に一定の保証を受けたエンティティに属することを表す。

以下の3つの例は世界規模で安全なデジタルアイデンティティとは何なのかを説明する例である。

官民パートナーシップ「ID2020」は全ての人類に個人的・永続的・プライベートでポータブルなデジタルアイデンティティを提供することを目的としている。この取り組みは特に、これまでこういったアイデンティティを得られなかった1億人以上の人々を特に重要視しており、2030年までに全ての人に合法的なアイデンティティを付与することを目的とした「国連持続可能な開発計画」を踏襲している。

2015年時点で、2億4400万人以上が、生まれた国とは別の国に暮らしている。理由はそれぞれ異なるが、ID管理の要件は、「以前の」ID（本来アイデンティティは単一であるべきであり、「以前の」IDなどあってはならないのである）へのアクセスを保持していなければならないという点においてどのケースでも同様である。前の居住地で収集された健康データは更なる治療計画に必要であり、資格証明書は新たな居住地における雇用の前提条件である。この問題は海外留学の途中である学生や、複数の居住地を持つ人にも当てはまる。

EUはヨーロッパのデジタル統一市場を強化することに注力している。越境可能なデジタルアイデンティティは、EU加盟国間の経済的、組織的な壁を取り除き、個人や企業がよりアグレッシブにヨーロッパ内の市場で経済活動できるようにすることを目的としたeIDAS規則や一般データ保護規制（以下GDPR）と並んで成功の鍵である。

上記の例は人間のデジタルアイデンティティに関するものだが、現在のIoTなどの発展は、これが人間でないエンティティ、企業やデバイス、車などにも当てはまることを示している。相互接続されたデバイスの高度な分散型アーキテクチャーは、稼働場所に関わらない安全なデジタルアイデンティティが条件となる。

これは国家的、地理的に制限されたアイデンティティ管理手法の限界を指摘している。一般的に、この問題を解決する方法は2つ、管理主体のグローバル化、もしくは自己主権型への移行のための規模縮小である。一つ目の方法はすでに常套手段になりつつある。責任は、快適さを与える一方でプライバシーの侵害を受け入れ、不透明な行動をし、経済的な理由で顧客の利益に反することをするビジネスから、グローバルに活動する組織に移りつつあるのだ。自己主権型デジタルアイデンティティはこれとは逆の方法、つまりアイデンティティの管理責任はエンティティ自身に転嫁されるのである。この記事では個々のデジタルアイデンティティを管理するための新しいアプローチの機会と課題を議論し、ISÆNのコンセプトに基づいた実装について説明する。最終的には人間の概念を他のエンティティに拡張する可能性についても第4章で議論する。

## 2. 個人のための自己主権型デジタルアイデンティティ

非中央集権型という概念は、世界規模のデジタルアイデンティティの問題を解決するためのアイデンティティ管理法として目に見えて浸透してきている。WWWの初期、IPアドレスはInternet Assigned Numbers Authorityによって付与されていた。この種の中央集権型アイデンティティは連合型アイデンティティによって淘汰された。その例として、Microsoft Passportは一つのアカウントで複数のインターネットサービスを利用できるようになった。その他企業はアイデンティティのベストプラクティスを探るべくLiberty Allianceを設立した。非中央集権への次のステップは、OpenIDのような取り組みに後押しされ、ユーザー自身が個人情報を管理することに重きを置き、アイデンティティ管理はサービスの利用から独立するべきであると強調したユーザー中心のアイデンティティの出現だった。しかし、現在でも未だ、デジタルアイデンティティを作成するのはGoogleやFacebookなど少数の、強大なサービスプロバイダである。結果的に、アイデンティティは個人ではなく企業によって管理されるという結果に落ち着いてしまっている。これにより、プロバイダ側がアイデンティティを取り消したり、ユーザーの介在なしに他サービスと連携することができてしまうようになった。

SSIは、個人がデジタルアイデンティティを作成し、管理できる次のステップになるはずである。SSIは以下の10の条件によって特徴付けられる。

- プロバイダやアイデンティティ管理団体から独立してた個人のアイデンティティの存在
- 自らのアイデンティティを管理できる
- 自らのアイデンティティに完全にアクセスできる
- システムとアルゴリズムに透明性がある
- デジタルアイデンティティに永続性がある
- デジタルアイデンティティがポータブルである
- デジタルアイデンティティが相互接続可能である
- データエコノミーが実施されている
- 人権が保護されている

SSIは個人が自らのデジタル情報を管理できるようにするが、言い換えればそれは各々のデータのプライバシーと信頼性を確立し、保持するための対策に個々が責任を持つということになる。デジタルアインデンティティが第三者による発行でないため、その信頼性は、デジタルアイデンティティの中の情報の正確性の根拠を持つ個人によってのみ達成されるのである。そしてその根拠は必要に応じて個人が提供する必要がある。例えば、デジタルアイデンティティに含まれる住所は登録団体で確認することができ、デジタルアイデンティティの本人は必要に応じてプロバイダにそれを提出することができる。すでに本人確認書類に対して自動確認を行う技術を提供しているIDカードも存在している。

これは信頼性の問題にもシフトしている。これまでのように情報の真正性を証明するのではなく、個人が「情報の根拠の真正性」を証明しなければならないからだ。これは第三者がその真正性を証明するために署名をすることで達成される。そしてこれらの根拠は、デジタルアイデンティティの情報の一部は変更可能であるがために、一定期間しか有効でないこともある。また、デジタルアイデンティティを有する個人が、どこの馬の骨かも分からない第三者から真正性の署名をもらい、それをプロバイダに提出することも考えられる。これに対して個人情報の受信者、つまりサービスプロバイダは「EUの公的機関の確認」など、取引に必要な一定レベルの信頼性を要求することができ、ユーザーはそれに適した署名を含む文書を提出することができる。

### SSIの可能性

上の10の条件に準じて、個人は、どこに住んでいようと、どのサービスプロバイダを選びどのSNSを使っていようと、無制限に自分のデジタルアイデンティティにアクセスできる。つまりSSIは個人の自由を拡大し、「Big Five」（Apple, Microsoft, Google, Amazon, Facebook）によってほとんどのデジタルアイデンティティが管理されている今日のインターネットの寡占構造を壊すことができるのである。

またこの10の条件は、すでに先述のID2020の基準: 人格、永続性、プライバシー、ポータビリティの要件を満たしている。もし、デジタルアイデンティティの信頼性が地域の政府機関に縛られなくなったら、移民や複数の居住地を持つ人は移住後も同じアイデンティティを保ち続けられるのである。この独立性は、紛争地域や腐敗した地域に住む人々に良いインパクトを与えるはずだ。

2018年から有効になる新しいEU一般データ保護規制（GDPR）では、データエコノミーとデータポータビリティ、より厳しい透明性を求めることで人権を保護している。この規制はまた、できるだけ高いデータ保護設定をデフォルトとする「Privacy by default」やプライバシー保護を重要な設計目標として掲げる「Privacy by design」の実装を呼びかけている。SSIは最大限のデータアクセスを個人に与えるだけでなく、Privacy by default/designを支持するプロバイダとの間で個人情報の選択的開示を可能にするのである。自己管理による透明性の確保はヨーロッパの不信の壁を取り除き、デジタル単一市場を活性化させることができる。企業にとっても、SSIは顧客に有益な情報を提供する義務を果たすための新たな方法になる。

### SSIの課題

ある個人がFacebook Connectのようなアイデンティティプロバイダを利用していた場合、その人は全てのアイデンティティ管理をそのサービスに委任することになる。このアイデンティティ管理にはプライバシーを守り、データの信頼性を担保する責任も含まれる。しかし、ほとんどの場合その人は自分のデジタルアイデンティティの扱いについてほとんど意見がない。むしろ自らのデジタルアイデンティティを引き換えに快適さを得ようとさえするのである。したがって、SSIのコアな課題は、個人が自分のデータを管理する努力を助けるソリューションを提供すること、言い換えれば**SSIを利用可能にするだけでなく、快適に利用できるようにすることである**。これには個人の複数のデジタルアイデンティティの生成と管理、情報の信頼性の根拠の管理、そして他人との取引やログの記録の方法が含まれる。これまでの信頼できる第三者を避けるためにはより多くの、以下のような問題が発生する。

- 利用権利の取引におけるプライバシー保護。特に、第三者のプロファイリングを禁止するなどの複雑な問題におけるプライバシー保護
- 取引中の個人とサービス間の透明性。特に取引規約や内容の同意をとることなど
- 長期的な透明性を保つための、取引ログやデジタルアイデンティティの永続性
- デジタルアイデンティティと、それを保証する根拠の信頼性
- 取引規約と実際のデータの使い方の一貫性
- デジタルアイデンティティを安全にやりとりするためのデータフォーマットと標準化されたインターフェース

これらの問題は全てが新しいものではなく、SSIだけの問題ではないものもあるが、この新しいアイデンティティの管理方法には、少なくとも現状のシステムに適応する新しい解決策が必要である。このうちいくつかの問題を解決するために、ブロックチェーンのような分散型台帳やスマート・コントラクトが、ログ記録、そしてデジタルアイデンティティの検証と個人情報や利用権の取引のための実装として提案されている。

一見、デジタルアイデンティティは管理区域とは無関係に存在しているように見える。しかし、取引で利用される法的枠組みの特定は、取引が行われている場所が「どこ」かという問に答えることが難しいばかりに、重要な問題になっているのである。このため、GDPRでは取引の実際の場所ではなく、取引に関係している人物の市民権に法的範囲を移すLex Loci Solutionsを導入している。つまりSSIを普及させるためには、**個人やサービス提供者が適用される法的範囲を理解し、合法的に行動できるようにサポートする必要がある**。

## 3. ISÆN: 人類のためのSSI標準化

標準化の取り組みである、「個人データ所有、管理のための自己主権型識別子」のCENワークショップ84は2016年、人類のためのデジタルアイデンティティ管理方法としてISÆNコンセプトを提案した。このゴールはGDPRにそったSSI全体をカバーしたコンセプトにすることである。この標準化は以下をカバーすることを意図している。

- 人間によるコア・アイデンティティの生成
- 上のコア・アイデンティティからの取引を元にしたアイデンティティの派生
- 人間による明示的同意のリクエスト、承認の実装
- 公開されている分散型台帳の全てのログの記録

上記のコア・アイデンティティとは人間の特徴から構成され、名前などの識別機能だけでなくより生物的な特徴、フィンガープリントや顔認識データを含む。他のアイデンティティは取引一つ一つと結びつけられ、コア・アイデンティティからの一方向性関数で構成される。これにより、外部の人間が異なる取引のリンクを確立することなくアイデンティを証明することができる。そして改竄が防止されたメモリーへのログ記録は、誰がそのデータを処理したかの概要を把握することを可能にする。同時に、企業はデータの開示義務を果たすためにこういった取引プロトコルを活用でき、合法的なやりとりを立証できるのである。このコンセプトはドイツ連邦経済技術省の研究によって評価され、開発を進めることが推奨された。

## 4. Outlook: 物、組織のためのSSI

IoTは中央管理実体を必要としない、モノを識別する強力なネットワークである。IoTにおけるモノの識別方法はデジタルアイデンティティを参照するバーコードやRFIDチップが主で、人間と同様にデジタルアイデンティティの非中央集権型管理も興味深いところである。

スマートコントラクトプロトコルはイーサリウムなどの公開された分散型台帳を通じたビジネスの取引の自動処理を可能にし、安全なデジタルアイデンティティはこのスマートコントラクトプロトコルを悪用した取引の実行を防ぐ。人間やモノに加えて、企業や組織のデジタルアイデンティティもSSIにおいて中心的な役割を果たすことになるだろう。

人間にSSIを適用する方法はすでに複数存在するが、人間以外のエンティティへ拡張するには新たな問題が生まれる。どうすればモノや組織に対するSSIを考案、実行できるのか？どうすればモノや組織は自身のアイデンティティを認識できるのか？モノや組織のどのような特徴を利用すれば、人間の生物的特徴のように固有で模倣が難しいアイデンティティを生み出せるのか？

## 参照

- Christopher Allen. (2016). The Path to Self-Sovereign Identities. from [https://www.coindesk.com/path-self-sovereign-identity](https://www.coindesk.com/path-self-sovereign-identity)
- CEN WS ISÆN. (2016). Self-Sovereign Identifier(s) for Personal Data Ownership and Usage Control. from [https://www.cen.eu/work/areas/ICT/Pages/WS-ISÆN.aspx](https://www.cen.eu/work/areas/ICT/Pages/WS-IS%C3%86N.aspx)
- Civic. (2017). [Civic.com](http://civic.com/). Retrieved from [https://www.civic.com](https://www.civic.com)
- Ethereum Foundation. (2017). ethereum - Blockchain App Platform. Retrieved from [https://www.ethereum.org/](https://www.ethereum.org/)
- EUR-Lex. (2014, July 23). Verordnung (EU) Nr. 910/2014 des Europäischen Parlaments und des Rates vom 23. Juli 2014 über elektronische Identifizierung und Vertrauensdienste für elektronische Transaktionen im Binnenmarkt und zur Aufhebung der Richtlinie 1999/93/EG. Retrieved October 31, 2017, from [http://eur-lex.europa.eu/legal-](http://eur-lex.europa.eu/legal-) content/DE/ALL/?uri=CELEX:32014R0910
- EUR-Lex. (2016, April 4). Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates vom 27. April 2016 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, zum freien Datenverkehr und zur Aufhebung der Richtlinie 95/46/EG (Datenschutz-Grundverordnung). Retrieved October 31, 2017, from http://eur- [lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679](http://lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679)
- ævatar.coop. (2017). [aevatar.com](http://aevatar.com/). Retrieved from [https://aevatar.com](https://aevatar.com/)
- Humaniq. (2017). [Humaniq.com](http://humaniq.com/). Retrieved from [https://humaniq.com](https://humaniq.com/)
- ID2020. (2017). An Alliance Committed to Improving Lives Through Digital Identity. Retrieved from [http://id2020.org/](http://id2020.org/)
- Jähnichen, S., Weinhardt, C., Müller-Quade, J., Huber, M., Rödder, N., Karlin, D., . . . Shaar, P. (2017). Sicheres Identitätsmanagement im Internet: Eine Analyse des ISÆN-Konzepts (Individual perSonal data Auditable addrEss) durch die Smart-Data-Begleitforschung im Auftrag des Bundesministeriums für Wirtschaft und Energie. http://www.digitale- [technologien.de/DT/Redaktion/DE/Downloads/Publikation/smartdata_studie_isaen.html](http://technologien.de/DT/Redaktion/DE/Downloads/Publikation/smartdata_studie_isaen.html).
- Jacobovitz, O. (2016). Blockchain for Identity Management. The Lynne and William Frankel Center for Computer Science Department of Computer Science. Beer Sheva, Israel: Ben-Gurion University.
- Keesing Technologies. (2017). AuthentiScan; Professional Authentication. Straight forward solution. Retrieved October 31, 2017, from [https://www.keesingtechnologies.com/automated-id-checking/](https://www.keesingtechnologies.com/automated-id-checking/)
- Meitinger, T. H. (2017). Smart Contracts. Informatik-Spektrum(40), 371-375.
Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System. Retrieved 2017, from [http://bitcoin.org/bitcoin.pdf](http://bitcoin.org/bitcoin.pdf)
- Pilkington, M. (2016). Blockchain Technology: Principles and Applications. In F. X. Olleros, & M. Zhegu (Eds.),
Handbook of Research on Digital Transformations.
- Rannenberg, K., Camenisch, J., & Sabouri, A. (Eds.). (2015). Attribute-based Credentials for Trust: Identity in the
Information Society. Springer.
- United Nations. (2015). UN Sustainable Development Goals. Retrieved October 31, 2017, from
[http://www](http://www/) .un.org/sustainabledevelopment/
- United Nations. (2016, January 2016). 244 million international migrants living abroad worldwide, new UN statistics reveal . Retrieved October 31, 2017, from UN Sustainable Goals: [http://www](http://www/) .un.org/sustainabledevelopment/blog/2016/01/244-million-international-migrants-living- abroad-worldwide-new-un-statistics-reveal/
- Verifiable Claims Working Group. (2017). About the Verifiable Claims Working Group. Retrieved from [https://www.w3.org/2017/vc/WG/](https://www.w3.org/2017/vc/WG/)