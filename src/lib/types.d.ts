export interface TextLinks {
  text: string,
  url?: string
}

export interface News extends TextLinks {
  date: string,
  thumbnail: string,
  title: string
}
