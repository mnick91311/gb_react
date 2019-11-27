import React from 'react'
import ReactDOM from 'react-dom'

let messages = ['Привет', 'Как дела?']

const render = () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root'),
	)
}

const addMessage = (text = "Нормально") => {
	messages.push(text)
	render()
}

const MessageComponent = (props) => <div>{ props.text }</div>

const MessageField = (props) =>
	props.messages.map(message => <MessageComponent text={ message } />)

const App = () => (
	<div>
		<MessageField messages={ messages } />
		<button onClick={ () => addMessage() }>Отправить сообщение</button>
	</div>
)

render()