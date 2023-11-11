
type Props = {
    width?: number;
    hasOr?: boolean;
}
export default function HorizontalSeparator({
    width,
    hasOr,
}: Props) {

    if (hasOr) {
        return (
            <div style={{
                width: `${width ? width : 100}%`,
            }} className="flexCenterCenter gap-2">
                <div style={{
                    width: `${width ? (width / 2) - 10 : 40}%`,
                }} className="h-[2px] bg-separatorColor">

                </div>

                <p className="text-white">OR</p>

                <div className="h-[2px] bg-separatorColor" style={{
                    width: `${width ? (width / 2) - 10 : 40}%`,
                }}>

                </div>
            </div>
        )
    }

    return (
        <div
            className='h-[2px] bg-separatorColor'
            style={{
                width: `${width ? width : 100}%`
            }}
        >

        </div>
    )
}