<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\SeriesGraph;
class ImmobiliereApiTest extends ApiTestCase
{
    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/immobilieres');

        $this->assertResponseStatusCodeSame(200);
        // Ajouter des assertions supplémentaires ici si nécessaire
    }

    public function testCreateImmobiliere(): void
    {
        $client = static::createClient();
        $client->request('POST', '/immobilieres', ['json' => [
            'dateMutations' => '2020-01-01T00:00:00Z',
            'price' => 100000.0,
            'codeDepartment' => '01',
            'region' => 'Auvergne-Rhône-Alpes',
            'squareMeters' => 100,
            'code_type_local' => 'House',
            'nature_mutation' => 'Sale'
        ]]);

        $this->assertEquals(201);
    }

    /**
     * Test Series Graph Graphql
     */
    public function testCheckSeriesGraph(): void
    {
        $client = static::createClient();
        $query = '
        {
            seriesGraphs {
                dateMutations
                price
            }
        }
        ';
        $headers = [
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ];
        $response = $client->request('POST', '/graphql', 
        ['json' => [ 'query' => $query ],
         'headers' => $headers
        ]);
        $data = $response->toArray();
        $seriesGraphs = $data['data']['seriesGraphs'][0];
        $price = is_float((float)$seriesGraphs['price']);
        $date = $seriesGraphs['dateMutations'];
        $dateTimeObject = \DateTime::createFromFormat('Y-m-d\TH:i:sP', $date);

        $obj = new SeriesGraph();
        $obj->setDateMutations(new \DateTime($date))
        ->setPrice($price)
        ->setId(1);
        $this->assertInstanceOf(SeriesGraph::class, $obj);
        $this->assertTrue($price);
        $this->assertInstanceOf(\DateTime::class, $dateTimeObject);
        $this->assertTrue($dateTimeObject && $dateTimeObject->format('Y-m-d\TH:i:sP') === $date);
    }

    public function testCheckMuation(): void
    {
        $client = static::createClient();
        $query = '
        {
            mutationsPeriodes(start: "2019-01-01", end: "2023-01-01") {
                totalVente
                date
            }
        }
        ';
        $headers = [
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ];

        $response = $client->request('POST', '/graphql', 
        ['json' => [ 
            'query' => $query
        ],
         'headers' => $headers
        ]);
        $data = $response->toArray();
        $this->assertIsArray($data['data']['mutationsPeriodes']);
    }

    public function testCheckVentes(): void
    {
        $client = static::createClient();
        $query = '
        {
            ventesRegions {
              region
            }
          }
        ';
        $headers = [
            'accept' => 'application/json',
            'content-type' => 'application/json'
        ];

        $response = $client->request('POST', '/graphql', 
        ['json' => [ 
            'query' => $query
        ],
         'headers' => $headers
        ]);
        $data = $response->toArray();
        $this->assertIsArray($data['data']['ventesRegions']);
    }
}
