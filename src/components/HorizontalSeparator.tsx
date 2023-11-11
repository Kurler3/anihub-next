
type Props = {
    width?: number;
}
export default function HorizontalSeparator({
    width
}: Props) {
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