type Category =
  | "Clothes"
  | "Electronics"
  | "Furniture"
  | "Toys"
  | "Books"
  | "Other";

type Schedule = {
  openingTime: string;
  closingTime: string;
};

type Vendor = {
  id: string;
  name: string;
  lattitude: number;
  longitude: number;
  category: Category;
  schedule: Schedule;
};

export type { Category, Vendor, Schedule };
