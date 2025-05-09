import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { NumberTicker } from './magicui/number-ticker';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Anime = {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
};

export default function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <main className="bg-gray-900 min-h-screen text-white p-12 flex justify-center">
      <section className="max-w-7xl w-full">
        <Button
          className="group my-6 text-lg cursor-pointer"
          variant="ghost"
          onClick={() => navigate('/')}>
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          Back
        </Button>
        {!loading && anime ? (
          <div className="flex gap-12 flex-col md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="rounded-lg shadow-xl shadow-white/30 md:min-w-64"
              />
              <h1 className="text-xl font-bold text-center">{anime.title}</h1>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold">Synopsis</p>
              <p className="mt-4 text-sm text-justify lg:text-base">{anime.synopsis}</p>

              <div className="grid md:grid-cols-4 gap-8 mt-8">
                <div className="border border-white/30 rounded-lg flex flex-col items-center justify-center p-4 font-bold gap-2">
                  <NumberTicker
                    value={anime.score}
                    decimalPlaces={2}
                    className={cn(
                      'whitespace-pre-wrap text-4xl font-medium tracking-tighter',
                      anime.score > 7 ? 'text-emerald-400' : 'text-amber-400'
                    )}
                  />
                  <p
                    className={cn(
                      'text-xl',
                      anime.score > 7 ? 'text-emerald-400' : 'text-amber-400'
                    )}>
                    {anime.scored_by.toLocaleString()}&nbsp;votes
                  </p>
                </div>
                <div className="border border-white/30 rounded-lg flex flex-col items-center justify-center p-4 font-bold gap-2">
                  <NumberTicker
                    value={anime.rank}
                    className={cn(
                      'whitespace-pre-wrap text-4xl font-medium tracking-tighter',
                      anime.rank < 700 ? 'text-emerald-400' : 'text-amber-400'
                    )}
                  />
                  <p
                    className={cn(
                      'text-xl',
                      anime.rank < 700 ? 'text-emerald-400' : 'text-amber-400'
                    )}>
                    Ranking
                  </p>
                </div>
                <div className="border border-white/30 rounded-lg flex flex-col items-center justify-center p-4 font-bold gap-2 text-purple-400">
                  <NumberTicker
                    value={anime.popularity}
                    className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-purple-400"
                  />
                  <p className="text-xl">Popularity</p>
                </div>
                <div className="border border-white/30 rounded-lg flex flex-col items-center justify-center p-4 font-bold gap-2 text-cyan-400">
                  <NumberTicker
                    value={anime.members}
                    className="whitespace-pre-wrap text-4xl font-medium tracking-tighte text-cyan-400"
                  />
                  <p className="text-xl">Members</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="min-w-72 min-h-40 rounded-lg bg-gray-700 animate-pulse"></div>
            <div className="mt-2 w-full">
              <p className="text-lg font-bold">Synopsis</p>
              <div className="flex flex-col gap-8 mt-6">
                <div className="min-w-full min-h-7 rounded-md bg-gray-700 animate-pulse"></div>
                <div className="max-w-3/4 min-h-7 rounded-md bg-gray-700 animate-pulse"></div>
                <div className="max-w-2/4 min-h-7 rounded-md bg-gray-700 animate-pulse"></div>
              </div>

              <div className="grid md:grid-cols-4 gap-8 mt-12">
                {Array.from({ length: 4 }).map((_) => (
                  <div className="border border-white/30 rounded-lg flex flex-col items-start justify-around p-4 gap-4 font-bold min-w-40">
                    <div className="min-w-full min-h-6 rounded-md bg-gray-700 animate-pulse"></div>
                    <div className="min-w-3/4 min-h-6 rounded-md bg-gray-700 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
