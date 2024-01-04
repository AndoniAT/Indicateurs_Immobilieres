<?php
    namespace App\DataFixtures;

    /***
     * Fixture crée à l'aide des commandes :
     *  > composer require --dev orm-fixtures
     *  > php bin/console make:fixtures
     * 
     * Pour charger la fixture dans la base de données
     *  > php bin/console doctrine:fixtures:load
     */

    use App\Entity\Immobilieres;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;

    class ImmobilierFixture extends Fixture
    {
        public function load(ObjectManager $manager): void
        {
            $filenames = [ '2018-s2', '2019', '2020', '2021', '2022','2023' ];

            for ( $i=0; $i < 6; $i++ ) { 
                $fileContent = file_get_contents(__DIR__ . '/../../DONNES_DATABASE/valeursfoncieres-' . $filenames[$i] . '.txt' );
                $lines = explode(PHP_EOL, $fileContent);
                
                //$max = count($lines);
                $max = 5000;
                $min = 0;
                $currentIndex = count($lines) - 2;
                $countProgress = 0;
                $countTot = 0;
                
                echo(PHP_EOL . '=> File ' . $filenames[$i] . PHP_EOL );
                
                while( $countProgress < $max ) {
                    $line = $lines[$currentIndex];
                    $data = explode('|', $line);
    
                    $save = false;
                    $dateString = $data[8];
                    $dateTimeObject = \DateTime::createFromFormat("d/m/Y", $dateString);
                    
                    $save = ( $dateTimeObject instanceof \DateTime );
                    
                    $price = (float)$data[10];
                    $save &= is_float($price);
                    
                    $meters = (int)$data[42];
                    $save &= is_int($meters) && $meters > 0;
                    
                    $type_local = $data[36];
                    $save &= ( mb_strlen($type_local) > 0 );
    
                    $code_dep = $data[18];
                    $save &= ( mb_strlen($code_dep) > 0 );
    
                    $region = $data[19];
                    $save &= ( mb_strlen($region) > 0 );
    
                    if( $save ) {
                        $immobilier = new Immobilieres();                
                        $immobilier
                        ->setPrice($price)
                        ->setDateMutations($dateTimeObject)
                        ->setSquareMeters($meters)
                        ->setCodeDepartment($code_dep)
                        ->setRegion($region)
                        ->setCodeTypeLocal($type_local);
                        $manager->persist($immobilier);
                        $countProgress++;

                        if( $countProgress % 1000 == 0 ) {
                            echo('saved : ' . $countProgress . ' / ' . $max . PHP_EOL);
                            $manager->flush();
                            $manager->clear();
                        }
                    }                    
                    $currentIndex--;
                }
                echo('Finished  => ' . $countProgress . ' / ' . $max);
            }

        }
    }
