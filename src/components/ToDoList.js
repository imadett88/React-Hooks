import React, { useState } from 'react'; // Importation de React et de la fonction useState pour gérer l'état
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles Bootstrap
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'; // Importation des composants Bootstrap
import { MdAdd, MdEdit, MdDelete, MdDone, MdCheckBoxOutlineBlank } from 'react-icons/md'; // Importation des icônes Material
import { useSpring, animated } from 'react-spring'; // Importation de React Spring pour les animations
import './ToDoList.css'; // Importation des styles CSS personnalisés

function ToDoList() {
  // Hooks d'état pour gérer les tâches et la saisie de tâches
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Gestionnaire d'événements pour les changements de saisie
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Fonction pour ajouter une nouvelle tâche
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Fonction pour mettre à jour une tâche
  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = updatedTask;
    setTasks(updatedTasks);
  };

  // Fonction pour basculer l'état de complétion d'une tâche
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Propriétés d'animation pour l'effet de fondu
  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  // Rendu du composant ToDoList
  return (
    <Container className="todo-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="todo-card">
          {/* Titre animé avec effet de fondu */}
          <animated.h1 className="text-center mb-4" style={fadeProps}>Liste des tâches</animated.h1>
          {/* Formulaire pour ajouter de nouvelles tâches */}
          <Form>
            <Form.Group controlId="taskInput">
              <Form.Control
                type="text"
                placeholder="Entrer une tâche"
                value={taskInput}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Bouton pour ajouter de nouvelles tâches */}
            <Button variant="primary" onClick={addTask} block>
              <MdAdd /> {/* Ajouter une tâche */}
            </Button>
          </Form>
          {/* Liste des tâches */}
          <ListGroup className="mt-4">
            {tasks.map((task, index) => (
              <ListGroup.Item
                key={index}
                className={`todo-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* Texte de la tâche avec état de complétion et gestionnaire de clic */}
                    <span
                      className="task-text"
                      onClick={() => toggleTaskCompletion(index)}
                    >
                      {task.completed ? <MdDone /> : <MdCheckBoxOutlineBlank />}
                      {' '}
                      {task.text}
                    </span>
                  </div>
                  {/* Boutons pour mettre à jour et supprimer les tâches */}
                  <div>
                    <Button
                      variant="warning"
                      className="mr-2"
                      onClick={() => {
                        const updatedTask = prompt('Mettre à jour la tâche :', task.text);
                        if (updatedTask !== null) {
                          updateTask(index, updatedTask);
                        }
                      }}
                    >
                      <MdEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteTask(index)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ToDoList;
