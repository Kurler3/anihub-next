/* eslint-disable @next/next/no-img-element */
import AnimeCard from "@/components/ui/anime/AnimeCard";
import HighlightedAnime from "@/components/ui/anime/HighlightedAnime";
import { JIKAN_API_URL } from "@/lib/constants"
import { getTopAnime } from "@/services";
import { ApiResponse } from "@/types/anime.types";
import Link from "next/link";

export default async function Home() {

  // Fetch data from your API or other source
  const responseResult = await getTopAnime({ limit: 7 });

  const animeData = responseResult.data;

  return (
    <main className='flex-1 border-red-300 h-full p-8 w-full flexStartStart flex-col gap-4'>

      {/* HIGHLIGHTED ANIME */}
      {
        animeData.length > 0 && (
          <HighlightedAnime
            anime={animeData[0]}
          />
        )
      }

      {/* TOP AIRING TITLE */}
      <div className='flex justify-between items-center w-full'>
        <h1 className="text-xl">
          Top Airing
        </h1>

        <Link href="/search">
          <div className="text-smallInfoColor cursor-pointer p-2 transition rounded-md hover:text-highlightedColor hover:bg-bgColor">
            View more {'>'}
          </div>
        </Link>
      </div>


      {/* TOP AIRING LIST */}
      <div className="flex gap-10 flex-wrap">

        {
          animeData.slice(1, 7).map((anime, index) => {

            return (
              <AnimeCard
                key={`anime_card_${anime.mal_id}_${index}`}
                anime={anime}
              />
            )

          })
        }

      </div>

    </main>
  )
}


