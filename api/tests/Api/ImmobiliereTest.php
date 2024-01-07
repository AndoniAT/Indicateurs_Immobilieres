<?php

namespace App\Tests\Entity;

use App\Entity\Immobiliere;
use PHPUnit\Framework\TestCase;
use DateTime;

class ImmobiliereTest extends TestCase {
    private $immobiliere;

    protected function setUp(): void {
        $this->immobiliere = new Immobiliere();
    }

    public function testGetId(): void {
        $this->assertNull($this->immobiliere->getId());
    }

    public function testDateMutations(): void {
        $date = new \DateTime();
        $this->immobiliere->setDateMutations($date);
        $this->assertSame($date, $this->immobiliere->getDateMutations());
    }

    public function testPrice(): void {
        $this->immobiliere->setPrice(100000.0);
        $this->assertSame(100000.0, $this->immobiliere->getPrice());
    }

    public function testCodeDepartment(): void {
        $this->immobiliere->setCodeDepartment('75');
        $this->assertSame('75', $this->immobiliere->getCodeDepartment());
    }

    public function testRegion(): void {
        $this->immobiliere->setRegion('Île-de-France');
        $this->assertSame('Île-de-France', $this->immobiliere->getRegion());
    }

    public function testSquareMeters(): void {
        $this->immobiliere->setSquareMeters(100);
        $this->assertSame(100, $this->immobiliere->getSquareMeters());
    }

    public function testCodeTypeLocal(): void {
        $this->immobiliere->setCodeTypeLocal('Maison');
        $this->assertSame('Maison', $this->immobiliere->getCodeTypeLocal());
    }

    public function testNatureMutation(): void {
        $this->immobiliere->setNatureMutation('Vente');
        $this->assertSame('Vente', $this->immobiliere->getNatureMutation());
    }

    public function testToString(): void {
        $this->immobiliere->setPrice(100000.0);
        $this->immobiliere->setCodeDepartment('75');
        $this->immobiliere->setRegion('Île-de-France');
        $this->immobiliere->setSquareMeters(100);
        $this->immobiliere->setCodeTypeLocal('Maison');
        $this->immobiliere->setNatureMutation('Vente');

        $expectedString = 'Immobilier' . PHP_EOL .
            'Prix : ' . $this->immobiliere->getPrice() . PHP_EOL .
            'Date mutation : ' . $this->immobiliere->getDateMutations()->format('Y-m-d H:i:s') . PHP_EOL .
            'Departement : ' . $this->immobiliere->getCodeDepartment() . PHP_EOL .
            'Region : ' . $this->immobiliere->getRegion() . PHP_EOL .
            'Mettre carrés : ' . $this->immobiliere->getSquareMeters() . PHP_EOL .
            'Type local : ' . $this->immobiliere->getCodeTypeLocal() . PHP_EOL .
            'Nature Mutation : ' . $this->immobiliere->getNatureMutation() . PHP_EOL;

        $this->assertSame($expectedString, $this->immobiliere->toString());
    }


    public function testPriceNegative(): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->immobiliere->setPrice(-100000.0);
    }

    // Test du comportement avec une date de mutation invalide
    public function testDateMutationsInvalid(): void {
        $this->expectException(\Exception::class);
        $this->immobiliere->setDateMutations(new DateTime('invalid date'));
    }

    // Test de la consistance des données
    public function testDataConsistency(): void {
        $this->immobiliere->setPrice(100000.0);
        $this->immobiliere->setRegion('Test Region');
        $this->assertSame(100000.0, $this->immobiliere->getPrice());
        $this->assertSame('Test Region', $this->immobiliere->getRegion());
    }

    // Test de l'état null et par défaut
    public function testDefaultState(): void {
        $newImmo = new Immobiliere();
        $this->assertNull($newImmo->getId());
        $this->assertNotNull($newImmo->getDateMutations()); // Supposons que la date est définie par défaut à la date actuelle
        $this->assertSame(0.0, $newImmo->getPrice());
       
    }
}
