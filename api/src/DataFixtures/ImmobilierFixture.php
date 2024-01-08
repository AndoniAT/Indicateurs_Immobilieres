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

    use App\Entity\Immobiliere;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;

    class ImmobilierFixture extends Fixture
    {
        public function load(ObjectManager $manager): void
        {
            ini_set('memory_limit', '8192M');
            $filenames = [ '2018-s2', '2019', '2020', '2021', '2022','2023' ];

            for ( $i=0; $i < 6; $i++ ) { 
                $fileContent = file_get_contents(__DIR__ . '/../../DONNES_DATABASE/valeursfoncieres-' . $filenames[$i] . '.txt' );
                $lines = explode(PHP_EOL, $fileContent);
                
                //$max = count($lines);
                $max = 15000;
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
                    $save &= is_float($price) && $price > 0;
                    
                    $meters = (int)$data[42];
                    $save &= is_int($meters) && $meters > 0;
                    
                    $type_local = $data[36];
                    $save &= ( mb_strlen($type_local) > 0 );
    
                    $code_dep = $data[18];
                    $save &= ( mb_strlen($code_dep) > 0 );
    

                    $region = $this->findRegion($data[18]);
                    $save &= ( mb_strlen($region) > 0 );
                    //nature_mutation
                    $nature_mutation = $data[9];
                    $save &= ( mb_strlen($nature_mutation) > 0 );

                    if( $save ) {
                        $immobilier = new Immobiliere();                
                        $immobilier
                        ->setPrice($price)
                        ->setDateMutations($dateTimeObject)
                        ->setSquareMeters($meters)
                        ->setCodeDepartment($code_dep)
                        ->setRegion($region)
                        ->setCodeTypeLocal($type_local)
                        ->setNatureMutation($nature_mutation);

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
                $manager->flush();
                $manager->clear();
                echo('Finished  => ' . $countProgress . ' / ' . $max);
            }

        }

    public function findRegion($departmentCode) {
            $regionMapping = array(
                '01' => 'Auvergne-Rhône-Alpes',
                '03' => 'Auvergne-Rhône-Alpes',
                '07' => 'Auvergne-Rhône-Alpes',
                '15' => 'Auvergne-Rhône-Alpes',
                '26' => 'Auvergne-Rhône-Alpes',
                '38' => 'Auvergne-Rhône-Alpes',
                '42' => 'Auvergne-Rhône-Alpes',
                '43' => 'Auvergne-Rhône-Alpes',
                '63' => 'Auvergne-Rhône-Alpes',
                '69' => 'Auvergne-Rhône-Alpes',
                '73' => 'Auvergne-Rhône-Alpes',
                '74' => 'Auvergne-Rhône-Alpes',
                '21' => 'Bourgogne-Franche-Comté',
                '25' => 'Bourgogne-Franche-Comté',
                '39' => 'Bourgogne-Franche-Comté',
                '58' => 'Bourgogne-Franche-Comté',
                '70' => 'Bourgogne-Franche-Comté',
                '71' => 'Bourgogne-Franche-Comté',
                '89' => 'Bourgogne-Franche-Comté',
                '90' => 'Bourgogne-Franche-Comté',
                '22' => 'Bretagne',
                '29' => 'Bretagne',
                '35' => 'Bretagne',
                '56' => 'Bretagne',
                '18' => 'Centre-Val de Loire',
                '28' => 'Centre-Val de Loire',
                '36' => 'Centre-Val de Loire',
                '37' => 'Centre-Val de Loire',
                '41' => 'Centre-Val de Loire',
                '45' => 'Centre-Val de Loire',
                '2A' => 'Corse',
                '2B' => 'Corse',
                '08' => 'Grand Est',
                '10' => 'Grand Est',
                '51' => 'Grand Est',
                '52' => 'Grand Est',
                '54' => 'Grand Est',
                '55' => 'Grand Est',
                '57' => 'Grand Est',
                '67' => 'Grand Est',
                '68' => 'Grand Est',
                '88' => 'Grand Est',
                '02' => 'Hauts-de-France',
                '59' => 'Hauts-de-France',
                '60' => 'Hauts-de-France',
                '62' => 'Hauts-de-France',
                '80' => 'Hauts-de-France',
                '75' => 'Île-de-France',
                '77' => 'Île-de-France',
                '78' => 'Île-de-France',
                '91' => 'Île-de-France',
                '92' => 'Île-de-France',
                '93' => 'Île-de-France',
                '94' => 'Île-de-France',
                '95' => 'Île-de-France',
                '14' => 'Normandie',
                '27' => 'Normandie',
                '50' => 'Normandie',
                '61' => 'Normandie',
                '76' => 'Normandie',
                '16' => 'Nouvelle-Aquitaine',
                '17' => 'Nouvelle-Aquitaine',
                '19' => 'Nouvelle-Aquitaine',
                '23' => 'Nouvelle-Aquitaine',
                '24' => 'Nouvelle-Aquitaine',
                '33' => 'Nouvelle-Aquitaine',
                '40' => 'Nouvelle-Aquitaine',
                '47' => 'Nouvelle-Aquitaine',
                '64' => 'Nouvelle-Aquitaine',
                '79' => 'Nouvelle-Aquitaine',
                '86' => 'Nouvelle-Aquitaine',
                '87' => 'Nouvelle-Aquitaine',
                '09' => 'Occitanie',
                '11' => 'Occitanie',
                '12' => 'Occitanie',
                '30' => 'Occitanie',
                '31' => 'Occitanie',
                '32' => 'Occitanie',
                '34' => 'Occitanie',
                '46' => 'Occitanie',
                '48' => 'Occitanie',
                '65' => 'Occitanie',
                '66' => 'Occitanie',
                '81' => 'Occitanie',
                '82' => 'Occitanie',
                '44' => 'Pays de la Loire',
                '49' => 'Pays de la Loire',
                '53' => 'Pays de la Loire',
                '72' => 'Pays de la Loire',
                '85' => 'Pays de la Loire',
                '04' => 'Provence-Alpes-Côte d\'Azur',
                '05' => 'Provence-Alpes-Côte d\'Azur',
                '06' => 'Provence-Alpes-Côte d\'Azur',
                '13' => 'Provence-Alpes-Côte d\'Azur',
                '83' => 'Provence-Alpes-Côte d\'Azur',
                '84' => 'Provence-Alpes-Côte d\'Azur',
                '971' => 'Guadeloupe',
                '972' => 'Martinique',
                '973' => 'Guyane',
                '974' => 'La Réunion',
                '976' => 'Mayotte'
            );
    
            if (array_key_exists($departmentCode, $regionMapping)) {
                return $regionMapping[$departmentCode];
            } else {
                return '';
            }
        }
    }


    
