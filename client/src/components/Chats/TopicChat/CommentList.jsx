import React, { Component } from 'react';
import style from './TopicChat.module.css';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    this.scrollMessages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages !== prevProps.messages) {
      this.scrollMessages();
    }
  }

  scrollMessages = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { messages } = this.props;

    return (
      <div className={style.messages}>
        {messages.map((message) => (
          <div className={style.message} key={message.id}>
            <img src={message.profilePic} className={style.profilePic} alt="Profile" />
            <span className={style.user}>{`${message.user}: `}</span>
            <div className={style.textDiv} ref={this.messagesEndRef}>
              {message.text}
            </div>
          </div>
        ))}
        <div />
      </div>
    );
  }
}

export default CommentList;