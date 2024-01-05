import Link from 'next/link';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/immobilieress" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
              Accueil
            </span>
          </Link>

          <Link href="/immobilieress/immobilieressList" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            immobilieressList
            </span>
          </Link>
          <Link href="/immobilieress/VentesMoyennes" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Ventes Moyennes
            </span>
          </Link>
          <Link href="/immobilieress" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Mutations par Période

            </span>
          </Link>

          <Link href="/immobilieress" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Ventes par Région
            </span>
          </Link>

        </div>


        
      </nav>
    );
  };
  

export default Navbar;
