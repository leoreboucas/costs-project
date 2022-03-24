import styles from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({id, name, costs, description, handleRemove}) {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, costs)
    }

    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${costs}
            </p>
            <p>{description}</p>
            <div className={styles.projectCard_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;