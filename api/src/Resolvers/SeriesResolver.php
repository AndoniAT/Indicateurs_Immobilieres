<?php

namespace App\Resolvers;

use ApiPlatform\GraphQl\Resolver\QueryCollectionResolverInterface;

use App\Entity\Immobiliere;
use App\Entity\SeriesGraph;
use Doctrine\Persistence\ManagerRegistry;

use Doctrine\ORM\EntityManagerInterface;

class SeriesResolver
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(): array
    {
        $repository = $this->entityManager->getRepository(Immobiliere::class);
        $entities = $repository->findAll();
        $entities = $repository->findBy([], null, 100);
        $series = array();
        foreach ($entities as $immo) {
            $s = new SeriesGraph($immo->getId(), $immo->getDateMutations(), $immo->getPrice(), $immo->getSquareMeters());
            array_push($series, $s);
        }

        return $series;
    }
}
