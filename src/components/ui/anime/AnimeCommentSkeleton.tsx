

const AnimeCommentSkeleton = () => {

    return (
        <div className="flexStartStart gap-2 w-full">

            {/* LEFT PART */}
            <div className="flex items-center gap-1 min-w-fit h-full flex-col">

                {/* AVATAR */}
                <div className="rounded-full w-[40px] h-[40px]  pulsatingSkeleton">

                </div>

            </div>

            {/* RIGHT PART */}
            <div className="flex h-full w-full justify-start items-start flex-col gap-2">

                {/* USERNAME + TIME CREATED */}
                <div className="flex justify-start items-center gap-3 w-full">

                    <div className='w-40 p-2 rounded-md pulsatingSkeleton'>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="w-full h-full pulsatingSkeleton rounded-md p-6">

                </div>


            </div>
        </div>
    )
}

export default AnimeCommentSkeleton;