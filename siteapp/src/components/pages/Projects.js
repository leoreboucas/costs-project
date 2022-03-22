import Message from '../layout/Message';

import styles from './Projects.module.css'

import { useLocation } from 'react-router-dom'

function Projects(){
    const location = useLocation();
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return (
        <div>
            <h1>Meus Projetos</h1>
            {message && <Message type='success' msg={message} />}
        </div>
    );
}

export default Projects;