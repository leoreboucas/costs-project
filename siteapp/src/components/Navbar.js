import { BrowserRouter as Link } from 'react-router-dom'

function Navbar(){
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/Company">Empresa</Link>
            <Link to="/Contact">Contato</Link>
            <Link to="/NewProject">Novo Projeto</Link>
        </div>
    );
}

export default Navbar;