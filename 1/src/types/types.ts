// app/(shop)/(content)/categories/[slug]/types.ts

export interface ShopNowPageProps {
    params: {
      slug: string | string[];
    };
    searchParams: {
      q?: string;
      page?: string;
      category?: string | string[];
      attribute?: string | string[];
      sort?: string;
      sale?: string | string[];
      unit?: string | string[];
    };
  }
  