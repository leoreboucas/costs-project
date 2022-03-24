import { parse, v4 as uuidv4 } from 'uuid';

import styles from './EditProject.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import ProjectForm from '../project/ProjectForm'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ServiceForm from '../services/ServiceForm'

function EditProject(){
    const {id} = useParams()

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch((err) => console.log(err))

    }, [id])

    function editPost(project){
        setMessage('')

        // budget validation
        if(project.budget < project.costs) {
            setMessage('O orçamento não pode ser maior que o custo do projeto')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado!')
            setType('success')
        })
        .catch((err) => console.log(err))
    };

    function createService(project){
        // last service 
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.costs

        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        // maximus value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

    };

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    };
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    };

    return (
        <>
            {project.name ? (
                <div className={styles.projectsDetails}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.detailsContainer}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projectInfo}>
                                    <ProjectForm 
                                    handleSubmit={editPost} btnText='Concluir edição' projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )

                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                                <p>Itens de serviços</p>
                                <div>
                                    <p>{project.services.name}</p>
                                </div>
                        </Container>
                    </Container>
                </div>
            ) 
            : <Loading />}
        </>
    );
}

export default EditProject;