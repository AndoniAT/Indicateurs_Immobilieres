<?php

namespace App\Resolvers;

use ApiPlatform\Core\GraphQl\Resolver\QueryCollectionResolverInterface;
use App\Entity\Immobiliere;
use Doctrine\Persistence\ManagerRegistry;

final class ImmoCollectionResolver implements QueryCollectionResolverInterface
{
    public function __construct(private ManagerRegistry $registry) {}

    /**
     * @param iterable<Immobiliere> $collection
     *
     * @return iterable<Immobiliere>
     */
    public function __invoke(iterable $collection, array $context): iterable
    {
        // Query arguments are in $context['args'].

        /*foreach ($collection as $immo) {
            // Do something with the book.
        }

        return $collection;*/
        return $this->registry->getRepository(Immobiliere::class);
    }
}