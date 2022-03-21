import styles from './ProjectForm.module.css'

import { useState, useEffect } from 'react'

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ btnText }){
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])


    return(
        <form className={styles.form} >
            <Input 
            type='text' placeholder='Insira o nome do projeto' name='name' 
            text='Nome do Projeto'/>
            
            <Input 
            type='number' placeholder='Insira o orçamento total' 
            text='Orçamento do Projeto'
            name='budget'
            />
            
            <Select name='category_id' text='Selecione a categoria' option={categories} />
            
            <SubmitButton 
            text={btnText} />
        </form>
    );
}

export default ProjectForm;