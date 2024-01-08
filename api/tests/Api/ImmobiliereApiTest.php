<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

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

        $this->assertResponseStatusCodeSame(201);
    }





}
