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
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $dateMutations;

    #[ORM\Column(type: 'float')]
    private float $price;

    #[ORM\Column(type: 'integer')]
    private int $squareMeters;

    public function __construct( int $id, \DateTime $date, float $price, int $meters) {
        $this->id = $id;
        $this->dateMutations = $date;
        $this->price = $price;
        $this->squareMeters = $meters;
    }

    public function getDateMutations(): \DateTime
    {
        return $this->dateMutations;
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

    public function getSquareMeters(): int
    {
        return $this->squareMeters;
    }

    public function setSquareMeters(int $squareMeters): self
    {
        $this->squareMeters = $squareMeters;

        return $this;
    }

    public function toString(): string
    {
        return 'Series' . PHP_EOL . 
        'Id : ' . $this->getId() . PHP_EOL .
        'Prix : ' . $this->getPrice() . PHP_EOL .
        'Date mutation : ' . $this->getDateMutations()->format('Y-m-d H:i:s') . PHP_EOL .
        'Mettre carrés : ' . $this->getSquareMeters();
    }


}
