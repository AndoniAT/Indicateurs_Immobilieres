<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity]
class Immobilieres
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $dateMutations;

    #[ORM\Column(type: 'float')]
    private float $price;

    #[ORM\Column(type: 'text')]
    private string $codeDepartment;

    #[ORM\Column(type: 'text')]
    private string $region;

    #[ORM\Column(type: 'integer')]
    private int $squareMeters;

    public function getId(): ?int
    {
        return $this->id;
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

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCodeDepartment(): string
    {
        return $this->codeDepartment;
    }

    public function setCodeDepartment(string $codeDepartment): self
    {
        $this->codeDepartment = $codeDepartment;

        return $this;
    }

    public function getRegion(): string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

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

}
