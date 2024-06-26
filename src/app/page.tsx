
/* eslint-disable @next/next/no-img-element */
import AnimeCard from "@/components/ui/anime/AnimeCard";
import HighlightedAnime from "@/components/ui/anime/HighlightedAnime";
import { getCurrentUser } from "@/lib/supabase/supabase-server";
import { getAnimeLikes, getTopAnime } from "@/services";
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function Home() {

  const user = await getCurrentUser();

  // Fetch data from your API or other source
  const responseResult = await getTopAnime({ limit: 7 });

  const animeData = responseResult.data;

  let animeLikesMap;

  try {
     animeLikesMap = animeData.length > 0 ? await getAnimeLikes(animeData[0].mal_id.toString()) : [];
  } catch (error) {
    console.error(error);
    redirect('/error?message=Something went wrong D:')
  }
 

  return (
    <main className='flex-1 h-full p-8 w-full flexStartStart flex-col gap-4'>

      {/* HIGHLIGHTED ANIME */}
      {
        animeData.length > 0 && (
          <HighlightedAnime
            anime={animeData[0]}
            likes={animeLikesMap}
            isInAnimePage={false}
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
          animeData.slice(1, 7).map((anime, index: number) => {

            return (
              <AnimeCard
                key={`anime_card_${anime.mal_id}_${index}`}
                anime={anime}
                isLoggedIn={!!user}
              />
            )

          })
        }

      </div>

    </main>
  )
}


