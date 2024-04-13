import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { ReviewsResponse } from "../../api/types.api";
import { API_TOKEN, baseUrl } from "../../utils/constants";
import Placeholder from "../Placeholder/Placeholder";
import ReviewDescription from "../ReviewDescription/ReviewDescription";
import cls from "./Review.module.scss";

interface ReviewsProps {
  movieId: number | undefined;
}

const Reviews = ({ movieId }: ReviewsProps) => {
  const formatDate = (dateFormat: string): string => {
    const date = dateFormat.substring(0, 10).split("-").reverse().join(".");
    return date;
  };
  // const { ref } = useInView();
  const queryClient = useQueryClient();
  // Делается 2 запроса!!
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: async ({ pageParam }): Promise<ReviewsResponse | undefined> => {
      try {
        const { data } = await axios.get<ReviewsResponse>(
          `${baseUrl}v1.4/review?movieId=${movieId}&page=${pageParam}`,
          {
            headers: {
              "X-API-KEY": API_TOKEN,
            },
          },
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage?.page ?? undefined,
    getNextPageParam: (lastPage) => (lastPage?.page as number) + 1 ?? undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: ["reviews"], exact: true });
    };
  }, []);
  // Для инфинит скрола, заменил кнопкой "Показать еще"
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, inView]);

  return (
    <ul className={cls.reviews}>
      {data?.pages.map((page) => (
        <React.Fragment key={page?.page}>
          {page?.docs?.length ? (
            page?.docs.map((review) => (
              <li className={cls.reviewItem} key={review.id}>
                <div className={cls.reviewHeader}>
                  <p className={cls.reviewAuthor}>{review.author} пишет:</p>
                  <h5 className={cls.reviewTitle}>
                    {review.title ? `«${review.title}»` : ""}
                  </h5>
                </div>
                <ReviewDescription text={review.review} />
                <p className={cls.reviewDate}>
                  Дата публикации: {formatDate(review.date)}
                </p>
              </li>
            ))
          ) : (
            <Placeholder text="Пока нет комментариев и рецензий" />
          )}
        </React.Fragment>
      ))}
      {data?.pages[0]?.docs?.length ||
      data?.pages[0]?.page !== data?.pages[0]?.total ? (
        <Button
          className={cls.moreBtn}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Посмотреть ещё
        </Button>
      ) : null}
    </ul>
  );
};

export default Reviews;
