declare type SeriesGraph = {
    dateMutations: string;
    price: number;
}

declare type Diagramme = {
    date: string;
    sales: number;
}

declare type GraphQLResponse<T> = {
    data: T;
}