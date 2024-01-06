async function graphQlCall<T>(query: string) {
    return fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    }).then(response => response.json() ).then( data => data )
}


/**
 * Obtian all the informations for the graph
 * @returns 
 */
export async function getSeriesGraphInformation() {
    let query = `{
        seriesGraphs {
            dateMutations
            price
                    }
                }`;
    let response = graphQlCall<{ seriesGraph: SeriesGraph[] }>( query ).then( data => data );
    return response;
}

