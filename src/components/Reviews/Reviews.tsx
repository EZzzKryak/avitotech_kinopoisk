import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import React, { useEffect } from "react";
import { ReviewStatus, ReviewsResponse } from "../../api/types.api";
import Negative from "../../assets/images/negative.svg";
import Neutral from "../../assets/images/neutral.svg";
import Positive from "../../assets/images/positive.svg";
import axiosInstance from "../../config/axiosInstance";
import Error from "../Error/Error";
import Placeholder from "../Placeholder/Placeholder";
import ReviewDescription from "../ReviewDescription/ReviewDescription";
import cls from "./Review.module.scss";

interface ReviewsProps {
  movieId: number | undefined;
}

const Reviews = ({ movieId }: ReviewsProps) => {
  // const { ref } = useInView(); Для инфинит скрола
  const formatDate = (dateFormat: string): string => {
    const date = dateFormat.substring(0, 10).split("-").reverse().join(".");
    return date;
  };
  const queryClient = useQueryClient();
  const {
    data,
    error,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: async ({ pageParam }): Promise<ReviewsResponse | undefined> => {
      try {
        const { data } = await axiosInstance.get<ReviewsResponse>(
          `v1.4/review?movieId=${movieId}&page=${pageParam}`,
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
  }, [queryClient]);
  // Для инфинит скрола, заменил кнопкой "Показать еще"
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, inView]);

  if (error) {
    return <Error refreshQuery={refetch} />;
  }

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
                  {review.type === ReviewStatus.POSITIVE ? (
                    <img className={cls.smile} src={Positive} alt="" />
                  ) : review.type === ReviewStatus.NEUTRAL ? (
                    <img className={cls.smile} src={Neutral} alt="" />
                  ) : (
                    <img className={cls.smile} src={Negative} alt="" />
                  )}
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
      {data?.pages[0]?.total !== 0 &&
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
