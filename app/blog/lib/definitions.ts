export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published" | "archived";
  category_id: number;
  createdAt: string; // or Date, depending on your db client
  updatedAt: string;
  is_rtl: boolean;
};
