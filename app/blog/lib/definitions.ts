export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published" | "archived";
  category: "news" | "advocacy_event" | "announcement";
  createdAt: string; // or Date, depending on your db client
  updatedAt: string;
};
