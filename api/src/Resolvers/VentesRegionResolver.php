<?php

namespace App\Resolvers;

use ApiPlatform\GraphQl\Resolver\QueryCollectionResolverInterface;

use App\Entity\Immobiliere;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\VentesRegion;

use Doctrine\ORM\EntityManagerInterface;

class VentesRegionResolver
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
	 * @param iterable<VentesRegion> $collection
	 *
	 * @return iterable<VentesRegion>
	 */
    public function __invoke(iterable $collection, array $context): iterable
    {
        $res = $this->entityManager->getRepository(Immobiliere::class)->getVentesRegion();

        $items = [];
        $count = 0;
        foreach ($res as $itemCollection) {
            $item = new VentesRegion();
            $item->setId($count);
            $item->setRegion($itemCollection['region']);
            $item->setTotalVente($itemCollection['totalvente']);
            $item->setAnne($itemCollection['annee']);
            array_push($items, $item);
            $count++;
        }
        return $items;
    }
}
