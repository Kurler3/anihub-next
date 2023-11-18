/* eslint-disable @next/next/no-img-element */
import HighlightedAnime from "@/components/ui/HighlightedAnime";
import StarRating from "@/components/ui/StarRating";
import { JIKAN_API_URL } from "@/lib/constants"
import { AnimeItem, ApiResponse } from "@/types/anime.types";
import Image from "next/image";

export default async function Home() {

  // Fetch data from your API or other source
  const res = await fetch(`${JIKAN_API_URL}/top/anime?limit=10`, { next: { revalidate: 60 * 10 } });

  if (!res.ok) {
    throw new Error("Failed to fetch anime");
  }

  // If the content has changed, parse the JSON response and return it as props
  const responseResult = await res.json() as ApiResponse;

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
      <h1 className="text-2xl">
        Top Airing
      </h1>

      {/* TOP AIRING LIST */}
      <div className="flex gap-10 flex-wrap">

        {
          animeData.slice(1, 7).map((anime, index) => {

            return (
              <div
                key={`anime_card_${anime.mal_id}_${index}`}
                className='flexCenterCenter flex-col overflow-hidden rounded-md w-[225px]'
              >

                <img
                  src={anime.images.jpg.image_url}
                  alt={`${anime.title}'s image`}
                  className='object-cover max-h-80 min-w-full'
                />

                <div className="w-full bg-bgColor flexCenterStart flex-col p-2 truncate">
                  <div className="w-full truncate text-sm">
                    {anime.title}
                  </div>
                  <div className="text-xs">
                    {anime.episodes} episodes
                  </div>

                </div>

                {/* <div className="w-full bg-bgColor flexCenterStart flex-col h-14 p-2">

                  <p className="text-sm truncate w-full">
                    {anime.title}
                  </p>

                  <p className="text-xs">
                    {anime.episodes} episodes
                  </p>

                </div> */}

              </div>
            )

          })
        }

      </div>

    </main>
  )
}


