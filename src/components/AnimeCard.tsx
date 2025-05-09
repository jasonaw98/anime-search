import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useNavigate } from 'react-router';

export type Anime = {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
};

type AnimeCardProps = {
  anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center cursor-pointer" onClick={() => navigate(`/anime/${anime.mal_id}`)}>
      <CardContainer className="h-full">
        <CardBody className="relative group/card flex flex-col items-center hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-gradient-to-br from-gray-800 to-gray-900 border-white/[0.2] sm:w-[20rem] h-full rounded-xl p-4 border">
          <CardItem translateZ="70" className="flex flex-col items-center">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="rounded-2xl" />
          </CardItem>
          <CardItem translateZ="50" className="md:text-lg font-bold text-white text-center mt-2">
            {anime.title}
          </CardItem>
          <div className="flex justify-between items-center mt-2">
            <CardItem
              translateZ={40}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="rounded-xl text-xs md:text-sm font-normal text-white">
              <p>Score: {anime.score}</p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
