import type { TextLinks, News } from '$lib/types';

export interface I18N {
  biography: TextLinks[],
  qualifications: TextLinks[],
  communication: TextLinks[],
  interests: string,
  works: {
    algorithmImplementations: TextLinks[],
    webApps: TextLinks[],
    others: TextLinks[]
  },
  news: News[]
}
