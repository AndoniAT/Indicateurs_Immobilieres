<?php

namespace App\Resolvers;

use ApiPlatform\GraphQl\Resolver\QueryCollectionResolverInterface;

use App\Entity\Immobiliere;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\SeriesGraph;

use Doctrine\ORM\EntityManagerInterface;

class SeriesResolver
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
	 * @param iterable<SeriesGraph> $collection
	 *
	 * @return iterable<SeriesGraph>
	 */
    public function __invoke(iterable $collection, array $context): iterable
    {
        $res = $this->entityManager->getRepository(Immobiliere::class)->getSeriesG();

        $items = [];
        $count = 0;
        foreach ($res as $itemCollection) {
            $item = new SeriesGraph();
            $item->setId($count);
            $date = new \DateTime( $itemCollection['datemutations'] );
            $item->setDateMutations($date);

            $item->setPrice($itemCollection['price']);
            array_push($items, $item);
            $count++;
        }
        return $items;
    }
}
