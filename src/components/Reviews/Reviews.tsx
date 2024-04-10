import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { baseUrl } from "../../api/kinopoisk.api";
import { ReviewsResponse } from "../../api/types.api";

interface ReviewsProps {
  movieId: string | undefined;
}

const Reviews = ({ movieId }: ReviewsProps) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

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
    refetch,
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
    staleTime: Infinity,
  });

  useEffect(() => {
    // Очистить кеш при размонтировании компонент
    // ОБНОВЛЯЕТСЯ ВСЯ СТРАНИЦА ПРИ ОТКРЫТИИ ТАБА!! все запросы делаются заного
    return () => {
      queryClient.resetQueries();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {data?.pages.map((page) => (
        <React.Fragment key={page?.page}>
          {page?.docs.map((review) => (
            <li key={review.id}>
              <h5>{review.title}</h5>
              <p>{review.title}</p>
              <p>{review.author}</p>
              <span>{review.date}</span>
            </li>
          ))}
        </React.Fragment>
      ))}
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Посмотреть ещё
      </button>
    </div>
  );
};

export default Reviews;
