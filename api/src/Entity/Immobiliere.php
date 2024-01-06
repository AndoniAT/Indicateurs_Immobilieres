<?php
/**  Generer la table dans la base de donnees 
 *   > php bin/console make:migration
 *   > php bin/console doctrine:migrations:generate
 * */

namespace App\Entity;

//use ApiPlatform\Core\Annotation\ApiResource;
//use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Resolvers\ImmoCollectionResolver;
use App\Resolvers\ImmoResolver;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\GraphQl\QueryCollection;


//#[ApiResource(operations: [])]

#[ApiResource(
    mercure: true,
    operations: [
        new GetCollection(paginationEnabled: false)
	],
    graphQlOperations: [
        new QueryCollection(
            resolver: ImmoCollectionResolver::class,
            read: false,
            paginationEnabled: false
            )
        ],
)]
#[ORM\Entity]
class Immobiliere
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

    #[ORM\Column(type: 'string')]
    private string $code_type_local;

    public function __construct( ) {
        $this->dateMutations = new \DateTime();
        $this->code_type_local = 'unknown';
        $this->price = 0.0;
        $this->squareMeters = 0;
    }

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

    public function getCodeTypeLocal(): ?string
    {
        return $this->code_type_local;
    }

    public function setCodeTypeLocal(string $code_type_local): self
    {
        $this->code_type_local = $code_type_local;

        return $this;
    }

    public function toString(): string
    {
        return 'Immobilier' . PHP_EOL . 
        'Prix : ' . $this->getPrice() . PHP_EOL .
        'Date mutation : ' . $this->getDateMutations()->format('Y-m-d H:i:s') . PHP_EOL .
        'Departement : ' . $this->getCodeDepartment() . PHP_EOL .
        'Region : ' . $this->getRegion() . PHP_EOL .
        'Mettre carrés : ' . $this->getSquareMeters() . PHP_EOL .
        'Type local : ' . $this->getCodeTypeLocal() . PHP_EOL;
    }


}
