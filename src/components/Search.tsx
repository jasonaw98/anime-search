import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import type { Anime } from './AnimeCard';
import AnimeCard from './AnimeCard';
import { Button } from './ui/button';

export default function Search() {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=9&q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data || []);
        setHasNextPage(data.pagination?.has_next_page ?? false);
        setTotalPages(data.pagination?.last_visible_page ?? 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query, page]);

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex flex-col p-4 items-center w-full gap-4">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-gray-50 via-gray-100 to-gray-400 text-6xl font-extrabold py-4 text-center">
          Anime Search App
        </h1>
        <Input
          placeholder="Search Anime"
          className="max-w-4xl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full items-center">
        {!loading ? (
          <>
            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-4 h-full md:grid-cols-3">
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <Button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-neutral-50 hover:text-black">
                    Previous
                  </Button>
                  <span className="text-white">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    onClick={handleNext}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-neutral-50 hover:text-black">
                    Next
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="page-select" className="text-white">
                    Go to page:
                  </label>
                  <select
                    id="page-select"
                    value={page}
                    onChange={(e) => setPage(Number(e.target.value))}
                    className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-600">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <option key={pageNum} value={pageNum}>
                        {pageNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_) => (
              <div className="py-4">
                <div className="border border-white/30 rounded-2xl w-76 h-96 flex flex-col p-7 gap-5">
                  <div className="w-full h-60 animate-pulse bg-gray-700 rounded-lg"></div>
                  <div className="w-full h-5 animate-pulse bg-gray-700 rounded-md"></div>
                  <div className="w-full h-5 animate-pulse bg-gray-700 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
