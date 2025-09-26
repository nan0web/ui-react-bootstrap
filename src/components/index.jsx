import Button from './atoms/Button.jsx'
import Input from './atoms/Input.jsx'
import Typography from './atoms/Typography.jsx'
import Card from './molecules/Card.jsx'
import Modal from './organisms/Modal.jsx'

const components = new Map([
	['Button', Button],
	['Input', Input],
	['Typography', Typography],
	['Card', Card],
	['Modal', Modal],
])

export { Button, Input, Typography, Card, Modal }
export default components
