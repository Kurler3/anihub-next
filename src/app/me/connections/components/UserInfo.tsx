import { IUser, IUserWithConnections } from "@/types";
import Image from "next/image";
import Link from "next/link";


interface IProps {
    user: IUser;
    currentUser?: IUserWithConnections,
}

export default function UserInfo({ user, currentUser }: IProps) {
    return (
        <Link href={`/user/${user.id}`} className='hover:bg-bgLight rounded-md p-1 transition'>
            <div className="flexCenterCenter gap-4">
                {/* AVATAR */}
                <Image
                    src={user.avatarUrl ?? ''}
                    alt='Follower avatar'
                    width={50}
                    height={50}
                    className="rounded-full"
                />

                {/* NAME */}
                <div>
                    {user.username}

                    {
                        currentUser?.id === user.id ?
                            ' (You)'
                            :
                            ''
                    }
                </div>
            </div>
        </Link>
    )
}