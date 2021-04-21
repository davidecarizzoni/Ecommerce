
export interface Course {
  id?: string;
  description:string;
  longDescription: string;

  spec1: String;
  spec2: String;
  spec3: String;

  imageUrl: string;
  url: string;
  categories: string[];
  difficult: string[];

  price: number;
}
