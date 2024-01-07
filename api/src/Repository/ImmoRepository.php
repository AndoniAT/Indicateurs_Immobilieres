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

    public function getAllMutationPeriodes( $start, $end ){
        $resultYears = getYearMutationPeriodes( $start, $end );
        $resultMonts = getMonthMutationPeriodes( $start, $end );
        $resultDay = getDayMutationPeriodes( $start, $end );

        return [ $resultYears, $resultMonts, $resultDay ];

    }

    public function getYearMutationPeriodes( $start, $end ){
        $dateStart = new \DateTime($start);
        $anneeStart = $dateStart->format('Y');
        $dateEnd= new \DateTime($end);
        $anneeEnd = $dateEnd->format('Y');
        $query =  "SELECT
        EXTRACT(YEAR FROM date_mutations) as annee,
        COUNT(*) as totalVente
            FROM immobiliere
            WHERE
                nature_mutation = 'Vente' AND
                EXTRACT(YEAR FROM date_mutations) >= '" . $anneeStart . "' AND
                EXTRACT(YEAR FROM date_mutations) <= '" . $anneeEnd . "'
            GROUP BY
                    EXTRACT(YEAR FROM date_mutations)
                ORDER BY
                    EXTRACT(YEAR FROM date_mutations) ASC
        ";

        $result = $this->connection->prepare($query)->executeQuery();
        $result = $result->fetchAllAssociative();
        return $result;

    }

    public function getMonthMutationPeriodes( $start, $end ){
        $query =  
        "SELECT
            EXTRACT(MONTH FROM date_mutations) AS mois,
            EXTRACT(YEAR FROM date_mutations) AS annee,
            COUNT(*) AS totalVente
        FROM
            immobiliere
        WHERE
            nature_mutation = 'Vente' AND
            date_mutations >= '" . $start . "' AND
            date_mutations < '" . $end . "'
        GROUP BY
            EXTRACT(YEAR FROM date_mutations),
            EXTRACT(MONTH FROM date_mutations)
        ORDER BY
            EXTRACT(YEAR FROM date_mutations) ASC, EXTRACT(MONTH FROM date_mutations) ASC";
        $result = $this->connection->prepare($query)->executeQuery();
        $result = $result->fetchAllAssociative();

        return $result;

    }

    public function getDayMutationPeriodes( $start, $end ){
        $query =  "SELECT
            DATE_TRUNC('day', date_mutations) AS date,
            COUNT(*) AS totalvente
        FROM
            immobiliere
        WHERE
            nature_mutation = 'Vente' AND
            DATE_TRUNC('day', date_mutations) >= '" . $start . "' AND
            DATE_TRUNC('day', date_mutations) <= '" . $end . "'
        GROUP BY
            DATE_TRUNC('day', date_mutations)
        ORDER BY
            DATE_TRUNC('day', date_mutations) ASC;";
        $result = $this->connection->prepare($query)->executeQuery();
        $result = $result->fetchAllAssociative();

        return $result;

    }
}


