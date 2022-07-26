import './style.css'

import { FiLogIn } from 'react-icons/fi'
import Logo from '../../assets/logo.svg'

import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={Logo} alt="Reciclagem" />
                </header>

                <main>
                    <h1>Coleta Seletiva e reciclagem em geral.</h1>
                    <p>Reciclagem de materiais diversos, tais como, papel, plástico, metal, pilhas e baterias, etc.</p>

                    <Link to="/create-location">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastrar novo local de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}