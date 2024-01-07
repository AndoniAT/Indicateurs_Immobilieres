async function graphQlCall<T>(query: string, variables?: { [key: string]: any }) {
    return fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify({ query, variables }), // Include variables here
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    }).then(response => response.json()).then(data => data)
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
    let response = graphQlCall<{ seriesGraph: SeriesGraph[] }>(query).then(data => data);
    return response;
}



// {
//     ventesRegions {
//       totalVente
//       region,
//       anne
//     }
//   }

/**
 * Obtian all the informations for the graph
 * @returns 
 */
export async function getVentesRegionsInformation() {
    let query = `{
        ventesRegions {
          totalVente
          region,
          anne
        }
      }`;
    let response = graphQlCall<{ ventesRegions: VentesRegions[] }>(query).then(data => data);
    return response;
}



export async function getMutationsPeriodesInformation(start, end) {
    let query = `query GetMutationsPeriodes($start: String!, $end: String!) {
        mutationsPeriodes(start: $start, end: $end) {
            totalVente
            date
        }
    }`;

    // Prepare the variables object
    let variables = {
        start: start,
        end: end
    };

    // Make the GraphQL call with the query and variables
    let response = graphQlCall<{ mutationsPeriodes: Diagramme[] }>(query, variables).then(data => data);
    return response;
}
