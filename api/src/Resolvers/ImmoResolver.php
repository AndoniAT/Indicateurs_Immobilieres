<?php

namespace App\Resolver;

use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use App\Model\Immobiliere;

final class ImmoResolver implements QueryItemResolverInterface
{
    /**
     * @param Immobiliere|null $item
     *
     * @return Immobiliere
     */
    public function __invoke($item, array $context)
    {
        // Query arguments are in $context['args'].

        // Do something with the book.
        // Or fetch the book if it has not been retrieved.

        return $item;
    }
}