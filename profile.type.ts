export type Profile = {
  avatar: string;
  username: string;
  bio: string;
  location?: string;
  readme?: string;
  socialAccounts: {
    dribbble?: string;
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
    mail?: string;
  };
  announcement?: {
    title: string;
    text: string;
  };
  links: {
    url: string;
    title: string;
  }[];
  rss?: string;
};