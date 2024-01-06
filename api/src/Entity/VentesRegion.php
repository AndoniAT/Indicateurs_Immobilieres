<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Resolvers\VentesRegionResolver;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\GraphQl\QueryCollection;

#[ApiResource(
    mercure: true,
    operations: [
        new GetCollection(paginationEnabled: false)
	],
    graphQlOperations: [
        new QueryCollection(
            resolver: VentesRegionResolver::class,
            read: false,
            paginationEnabled: false
        ),
    ],
)]
#[ORM\Entity]
/** @internal */
class VentesRegion
{   
    private ?int $id = null;
    private string $region;
    private float $totalVente;
    private string $annee;


    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getRegion(): string
    {
        return $this->region;
    }

    public function setAnne(string $annee): self
    {
        $this->annee = $annee;

        return $this;
    }

    public function getAnne(): string
    {
        return $this->annee;
    }

    public function getId(): float
    {
        return $this->id;
    }

    public function setTotalVente(float $TotalVente): self
    {
        $this->totalVente = $TotalVente;

        return $this;
    }
    public function getTotalVente(): float 
    {
        return $this->totalVente;
    }

    public function toString(): string
    {
        return 'Series' . PHP_EOL . 
        'Id : ' . $this->getId() . PHP_EOL .
        'region : ' . $this->getRegion() . PHP_EOL .
        'TotalVente : ' . $this->getTotalVente() . PHP_EOL .
        'Anne : ' . $this->getAnne();
    }


}
