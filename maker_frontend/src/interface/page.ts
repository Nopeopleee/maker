interface HomeBanner {
  image_1: string;
  image_2: string;
}

interface HomeAbout {
  home_details: HomeDetails;
}

interface HomeDetails {
  title: string;
  subtitle: string;
  content_1: string;
  content_2: string;
  content_3: string;
  content_4: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  link_1: string;
  link_2: string;
  link_3: string;
}

export type { HomeBanner, HomeAbout, HomeDetails };
