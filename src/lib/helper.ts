//function to take str and optional maxSize as argument and return same str if str length less or equal to maxSize else return substring of maxsize - 3 with ...

export function truncateStr(str: string, maxSize: number = 100): string {
    if (str.length <= maxSize) {
        return str;
    } else {
        return `${str.slice(0, maxSize - 3)}...`;
    }
}