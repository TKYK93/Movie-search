export const truncate = (words: string, n:number) => {
    return words?.length > n ? words.substr(0, n-1) + " ..." : words;
};