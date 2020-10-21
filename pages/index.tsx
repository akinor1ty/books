import { useState } from "react";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AllBooks, fetchAllBooks } from "../services/api/books";

export default function Home({ data }: { data: AllBooks }) {
  const topCategories = data.top_category_list;
  const tabs = topCategories.map((topCategory) => topCategory.id_top_category);
  const router = useRouter();
  const [tab, setTab] = useState(router.query?.category ?? tabs[0]);

  const subCategories = topCategories.find(
    (topCategory) => topCategory.id_top_category === tab
  ).sub_category_list;

  return (
    <div className="">
      <div className="flex flex-no-wrap overflow-scroll border">
        {data.top_category_list.map((category) => {
          const topCategoryId = category.id_top_category;
          const handleClickTab = () => {
            setTab(topCategoryId);
            router.push({
              search: `?category=${topCategoryId}`,
            });
          };
          const isSelected = tab === topCategoryId;

          return (
            <span
              className={classNames(
                "text-gray-600 text-center px-6 py-2 cursor-pointer flex-shrink-0",
                {
                  "text-red-600": isSelected,
                  "border-red-600": isSelected,
                  "border-b-2": isSelected,
                }
              )}
              onClick={handleClickTab}
            >
              {category.name_category}
            </span>
          );
        })}
      </div>
      <div className="p-5">
        {subCategories.map((sub, index) => {
          // console.log(sub);
          const isNotFirstSubCategory = index !== 0;
          return (
            <>
              <div
                className={classNames("text-xl font-bold pb-5", {
                  "pt-5": isNotFirstSubCategory,
                })}
              >
                {sub.name_category}
              </div>
              <div className="flex flex-row overflow-scroll">
                {sub.book_list.map((book, index) => {
                  const handleClickBook = () => {
                    router.push(`/books/${book.id_book}`);
                  };

                  return (
                    <span
                      className="mr-5"
                      style={{
                        minWidth: "100px",
                        // height: "auto",
                      }}
                    >
                      <img
                        className="shadow cursor-pointer w-full"
                        src={book.img_url}
                        alt="book"
                        onClick={handleClickBook}
                      />
                    </span>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchAllBooks();

  return {
    props: { data },
  };
};
