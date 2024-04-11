import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { baseUrl } from "../../api/kinopoisk.api";
import { ReviewsResponse } from "../../api/types.api";
import ReviewDescription from "../ReviewDescription/ReviewDescription";
import cls from "./Review.module.scss";

interface ReviewsProps {
  movieId: string | undefined;
}

const Reviews = ({ movieId }: ReviewsProps) => {
  const { ref } = useInView();
  const queryClient = useQueryClient();
  // Делается 2 запроса!!
  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: async ({ pageParam }): Promise<ReviewsResponse | undefined> => {
      try {
        const { data } = await axios.get<ReviewsResponse>(
          `${baseUrl}review?movieId=${movieId}&page=${pageParam}`,
          {
            headers: {
              "X-API-KEY": "WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M",
            },
          },
        );
        console.log(data);
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
    // Очистить кеш при размонтировании компонент
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

  const formatDate = (dateFormat: string): string => {
    const date = dateFormat.substr(0, 10).split("-").reverse().join(".");
    return date;
  };

  return (
    <ul className={cls.reviews}>
      {data?.pages.map((page) => (
        <React.Fragment key={page?.page}>
          {page?.docs.map((review) => (
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
          ))}
        </React.Fragment>
      ))}
      <Button
        className={cls.moreBtn}
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Посмотреть ещё
      </Button>
    </ul>
  );
};

export default Reviews;
