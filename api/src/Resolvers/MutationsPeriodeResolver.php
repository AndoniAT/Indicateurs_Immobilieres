<?php

namespace App\Resolvers;

use ApiPlatform\GraphQl\Resolver\QueryCollectionResolverInterface;

use App\Entity\Immobiliere;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\MutationsPeriode;

use Doctrine\ORM\EntityManagerInterface;

class MutationsPeriodeResolver
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
	 * @param iterable<MutationsPeriode> $collection
	 *
	 * @return iterable<MutationsPeriode>
	 */
    public function __invoke(iterable $collection, array $context): iterable
    {
        $args = $context['args'];
        $start = $args['start'];
        $end = $args['end'];
        $rep = $this->entityManager->getRepository(Immobiliere::class);
        $res = $rep->getYearMutationPeriodes($start, $end);
        
        $items = [];

        $count = 0;
        foreach ($res as $itemCollection) {
            $item = new MutationsPeriode();
            $item->setId($count);
            $item->setTotalVente($itemCollection['totalvente']);
            $item->setAnne($itemCollection['annee']);
            $item->setTypeGroup('Year');
            array_push($items, $item);
            $count++;
        }

        $res = $rep->getMonthMutationPeriodes($start, $end);

        foreach ($res as $itemCollection) {
            $item = new MutationsPeriode();
            $item->setId($count);
            $item->setTotalVente($itemCollection['totalvente']);
            $item->setAnne($itemCollection['annee']);
            $item->setMois($itemCollection['mois']);
            $item->setTypeGroup('Month');
            array_push($items, $item);
            $count++;
        }

        $res = $rep->getDayMutationPeriodes($start, $end);
        foreach ($res as $itemCollection) {
            $item = new MutationsPeriode();
            $item->setId($count);
            $item->setTotalVente($itemCollection['totalvente']);
            $item->setDate( new \DateTime( $itemCollection['date'] ) );
            $item->setTypeGroup('Day');
            array_push($items, $item);
            $count++;
        }

        return $items;
    }
}
