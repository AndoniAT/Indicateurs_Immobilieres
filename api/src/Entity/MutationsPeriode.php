<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Resolvers\MutationsPeriodeResolver;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\GraphQl\QueryCollection;

#[ApiResource(
    mercure: true,
    operations: [
        new GetCollection(paginationEnabled: false)
	],
    graphQlOperations: [
        new QueryCollection(
            resolver: MutationsPeriodeResolver::class,
            args: [
                'start' => [ 'type' => 'String!' ],
                'end' => [ 'type' => 'String!' ]
            ],
            read: false,
            paginationEnabled: false
        ),
    ],
)]
#[ORM\Entity]
/** @internal */
class MutationsPeriode
{   
    private ?int $id = null;
    private float $totalVente;
    private string $annee;
    //private string $mois:
    private string $mois;
    private \Datetime $date;
    private string $typeGroup;

    public function __construct() {
        $this->totalVente = 0;
        $this->annee = '';
        $this->typeGroup = '';
        $this->mois = '';
        $this->date = new \DateTime();
    }

    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getTypeGroup(): string
    {
        return $this->typeGroup;
    }

    public function setTypeGroup(string $typeGroup): self
    {
        $this->typeGroup = $typeGroup;

        return $this;
    }

    public function setTotalVente(string $totalVente): self
    {
        $this->totalVente = $totalVente;

        return $this;
    }

    public function getTotalVente(): string
    {
        return $this->totalVente;
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

    public function getMois(): string
    {
        return $this->mois;
    }

    public function setMois(string $mois): self
    {
        $this->mois = $mois;

        return $this;
    }
  
    public function setDate(\DateTime $date): self
    {
        $this->date = $date;

        return $this;
    }


}
