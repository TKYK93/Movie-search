export interface Movie {
    id: number
    image: string
    title: string
    seasonNumber?: number
    episodeNumber?: number
    summary: string
    detailUrl: string
}

export interface MovieDetail extends Movie{
    genres: string[]
    rating: number
}