export interface workBodyContents {
  title: string,
  github: string,
  lang: string,
  date: string,
  note: string,
  articles?: { text: string, url: string }[],
};

export interface workBody {
  name: string,
  color: string,
  contents: workBodyContents[]
}

export interface localization {
  profile: {
    name: string,
    bio: string
  };
  topics: { category: string; description: string }[];
  works: {
    th: {
      lang: string,
      date: string,
      note: string
    };
    body: workBody[]
  }
};
