<?php
namespace App\Repository;


use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Immobiliere;


class ImmoRepository extends ServiceEntityRepository {
    private Connection $connection;

    public function __construct(ManagerRegistry $registry) {
		parent::__construct($registry, Immobiliere::class);
		$this->connection = $this->getEntityManager()->getConnection();
	}

    public function getSeriesG() {
        $query = "SELECT date_trunc('month', date_mutations) AS dateMutations, " . 
        "percentile_disc(0.5) within group (order by price / square_meters) AS price " .
        "FROM immobiliere GROUP BY date_trunc('month', date_mutations);";
		
        $result = $this->connection->prepare($query)->executeQuery();
        $result = $result->fetchAllAssociative();

		return $result;
	}


    public function getVentesRegion(){
        
        // select region, SUM(price) as totalVentes
        // from immobiliere
        // group by (region);
        //$query = "SELECT region, SUM(price) AS  totalVentes FROM immobiliere GROUP BY (region)";
        $query =  "SELECT
            region,
            EXTRACT(YEAR FROM date_mutations) as annee,
            COUNT(*) as totalVente
            FROM
                immobiliere
            WHERE
                nature_mutation = 'Vente'
            GROUP BY
                region, EXTRACT(YEAR FROM date_mutations)
            ORDER BY
                EXTRACT(YEAR FROM date_mutations) ASC";
        $result = $this->connection->prepare($query)->executeQuery();
        $result = $result->fetchAllAssociative();

        return $result;

    }
}


