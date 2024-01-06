<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Resolvers\SeriesResolver;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\GraphQl\QueryCollection;

#[ApiResource(
    mercure: true,
    operations: [
        new GetCollection(paginationEnabled: false)
	],
    graphQlOperations: [
        new QueryCollection(
            resolver: SeriesResolver::class,
            read: false,
            paginationEnabled: false
        ),
    ],
)]
#[ORM\Entity]
/** @internal */
class SeriesGraph
{   
    private ?int $id = null;
    private \DateTime $dateMutations;
    private float $price;

    public function __construct() {
        $this->dateMutations = new \DateTime();
    }

    public function getDateMutations(): \DateTime
    {
        return $this->dateMutations;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function setDateMutations(\DateTime $dateMutations): self
    {
        $this->dateMutations = $dateMutations;

        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getId(): float
    {
        return $this->id;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function toString(): string
    {
        return 'Series' . PHP_EOL . 
        'Id : ' . $this->getId() . PHP_EOL .
        'Prix : ' . $this->getPrice() . PHP_EOL .
        'Date mutation : ' . $this->getDateMutations()->format('Y-m-d H:i:s');
    }


}
