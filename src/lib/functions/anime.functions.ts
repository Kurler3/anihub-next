export const getSearchAnimeOptions = (options: string[]) => {
    return options.map((option: string) => {
        return {
            id: option,
            name: option.charAt(0).toUpperCase() + option.slice(1),
        }
    })
}
