import { Alert } from 'react-bootstrap'

const FormError = ({ message }) => {
  if (!message) return null
  
  return (
    <Alert variant="danger" className="mb-3">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

export default FormError
