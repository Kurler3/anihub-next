import { getCurrentUser } from "@/lib/supabase/supabase-server";
import { IConnectionsPageSearchParams, IFollow, IFollowRequest, IUserWithConnections } from "@/types";
import Link from "next/link";
import FollowersList from "./components/FollowersList";
import FollowRequestsList from "./components/FollowRequestsList";
import FollowingList from "./components/FollowingList";
import SearchUsers from './components/SearchUsers';

const TABS = {
    FOLLOWERS: {
        id: 'followers',
        label: 'Followers',
    },
    FOLLOWING: {
        id: 'following',
        label: 'Following',
    },
    FOLLOW_REQUESTS: {
        id: 'followRequests',
        label: 'Follow Requests',
    },
    FIND_PEOPLE: {
        id: 'findPeople',
        label: 'Find People',
    },
}

const TAB_LIST = Object.values(TABS);

interface IProps {
    searchParams: IConnectionsPageSearchParams;
}

export default async function ConnectionsPage({
    searchParams: {
        tab,
        q,
        page,
    },
}: IProps) {

    const user = await getCurrentUser({
        followers: true,
        following: true,
        followerRequests: true,
        followingRequests: true,
    }) as unknown as IUserWithConnections;

    const currentTab = tab && TAB_LIST.find((t) => t.id === tab) ? tab : TABS.FOLLOWERS.id;

    return (
        <div className="w-full h-full flexStartCenter flex-col p-4 gap-3">
            <div role="tablist" className="tabs tabs-boxed tabs-lg p-4 bg-bgColor">
                {
                    Object.values(TABS).map(tab => {
                        return (
                            <Link
                                href={`/me/connections?tab=${tab.id}`}
                                key={`connection_tab_${tab}`}
                                role="tab"
                                className={`tab w-36 h-16 text-sm ${currentTab === tab.id ? 'tab-active' : ''}`}
                            >
                                {
                                    tab.label
                                }

                                {
                                    tab.id === TABS.FOLLOW_REQUESTS.id && user!.followerRequests.length > 0 ? ` (${user!.followerRequests.length})` : ''
                                }
                            </Link>
                        )
                    })
                }
            </div>

            <div className="h-full w-full flexStartStart flex-col mt-5">
                {
                    currentTab === TABS.FOLLOW_REQUESTS.id ? (
                        <FollowRequestsList
                            followRequests={user!.followerRequests as unknown as IFollowRequest[]}
                        />
                    ) : currentTab === TABS.FOLLOWERS.id ? (
                        <FollowersList
                            followers={user!.followers as unknown as IFollow[]}
                            currentUser={user!}
                        />
                    ) : currentTab === TABS.FOLLOWING.id ? (
                        <FollowingList
                            following={user!.following as unknown as IFollow[]}
                        />
                    ) : (
                        <SearchUsers
                            q={q}
                            page={page}
                            currentUser={user!}
                        />
                    )
                }
            </div>
        </div>
    )

}