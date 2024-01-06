<?php

namespace App\Resolvers;

//use ApiPlatform\Core\GraphQl\Resolver\QueryCollectionResolverInterface;
use ApiPlatform\GraphQl\Resolver\QueryCollectionResolverInterface;

use App\Entity\Immobiliere;
use Doctrine\Persistence\ManagerRegistry;
// src/Resolvers/ImmoCollectionResolver.php


use Doctrine\ORM\EntityManagerInterface;

class ImmoCollectionResolver
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(): iterable // ou Traversable si vous préférez
    {
        $repository = $this->entityManager->getRepository(Immobiliere::class);
        $entities = $repository->findAll();
        $entities = $repository->findBy([], null, 100);  // Limite à 100 a cause de surcharge de memoire
        return $entities;
    }
}
