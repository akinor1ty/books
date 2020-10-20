import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Book as BookType, fetchAllBooks } from "../../services/api/books";

const Book = ({ data }: { data: BookType }) => {
  const router = useRouter();
  const handleBack = () => router.push("/");
  const toggleBook = () => {
    // TODO: Implement this
  };

  return (
    <>
      <div className="border-b-2 p-5 shadow-md">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer mr-3 "
          onClick={handleBack}
        />
        書籍紹介
      </div>
      <div className="flex p-5">
        <img src={data.img_url} className="mx-8" alt="book" />
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xl font-medium">{data.name_book}</div>
            <div className="mt-1 text-lg text-gray-700">
              著者：{data.author}
            </div>
            <div className="mt-1 text-lg text-gray-700">
              出版社：{data.publisher}
            </div>
          </div>
          <div className=" justify-self-end">
            <div className="flex  justify-end">
              <button
                type="button"
                className="w-1/2 rounded-md border-2 px-3 py-1 border-red-600 text-red-600 focus:outline-none"
              >
                MyBooks追加
              </button>
              <button
                type="button"
                className="w-1/2 ml-3 rounded-md bg-red-600 text-white px-3 py-1 focus:outline-none"
              >
                購入
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchAllBooks();

  // Get fully flattened books list
  const books = data.top_category_list.flatMap((topCategories) => {
    return topCategories.sub_category_list.flatMap(
      (subCategories) => subCategories.book_list
    );
  });

  return {
    props: { data: books.find((book) => book.id_book === context.params.id) },
  };
};

export default Book;
