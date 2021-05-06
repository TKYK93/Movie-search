export interface Movie {
    id: number
    image: string | undefined
    title: string
    seasonNumber?: number | undefined
    episodeNumber?: number | undefined
    summary: string
    detailUrl: string
}

export interface MovieDetail extends Movie{
    genres: string[]
    rating: number
}