const baseUrl = process.env.NEXT_PUBLIC_BOOK_API_BASE_URL;

type SubCategory = {
  book_list: {
    author: string;
    create_at: string;
    has_contents: number;
    has_purchased: boolean;
    id_book: string;
    img_url: string;
    is_unlimited: number;
    name_book: string;
    publisher: string;
  }[];
  id_category: string;
  is_ranking: boolean;
  name_category: string;
  need_load_more: boolean;
};

export type Book = {
  id_top_category: string;
  name_category: string;
  sub_category_list: SubCategory[];
};

export type AllBooks = {
  top_category_list: Book[];
};

export const fetchAllBooks = (): Promise<AllBooks> => {
  return fetch(`${baseUrl}/mock/book/all`).then((response) => response.json());
};
