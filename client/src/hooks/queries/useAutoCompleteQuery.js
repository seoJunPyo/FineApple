import React from 'react';
import { useQuery } from '@tanstack/react-query';

const staleTime = 3000;

/**
 * @param {{
 * inputValue: string
 * queryFn: () => promise
 * }} props
 */
const useAutoCompleteQuery = ({ inputValue, queryFn, category, subCategory, isRouteHome }) => {
  const [value, setValue] = React.useState([]);

  const { data: posts, isFetched } = useQuery({
    queryKey: ['posts', inputValue, category, subCategory, isRouteHome],
    queryFn: async () => {
      const data = await queryFn({ keyword: inputValue, category, subCategory, isRouteHome });
      return data;
    },
    staleTime,
    select: posts => posts.map(post => ({ ...post, value: post.id })),
  });

  React.useEffect(() => {
    if (isFetched) setValue(posts);
  }, [posts, isFetched]);

  return value;
};

export default useAutoCompleteQuery;
