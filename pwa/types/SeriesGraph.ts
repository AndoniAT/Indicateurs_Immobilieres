declare type SeriesGraph = {
    dateMutations: string;
    price: number;
}

declare type GraphQLResponse<T> = {
    data: T;
}