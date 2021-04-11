
export interface Course {

  titles: {
    description:string;
    longDescription: string;
  };

  spec1: String;
  spec2: String;
  spec3: String;

  imageUrl: string;
  categories: string[];
  difficult: string[];

  price: number;
}
