import { useEffect, useState } from "react";

//fetchMovies
// fetchMovieDtails

// useFetch(fetchMovies)


const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        const result = await fetchFunction();

        setData(result);

    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
        setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  }

  useEffect(() => {

    if (autoFetch){
        fetchData();
    }
  }, []);
  return { data, loading, error, refetch: fetchData, reset  };


};

export default useFetch;