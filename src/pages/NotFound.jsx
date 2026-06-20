import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Container>
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1>Página No Encontrada</h1>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <Link to="/login">
            <Button variant="primary" size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
