import React from 'react';
import Tweet from './Tweet';
import Loading from './Loading';

class Tweets extends React.Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.loading = true;
  }

  /**
   *
   */
  componentDidMount() {

    let firestore = this.props.firebase.firestore();
    let messages  = [];

    firestore.collection('messages').orderBy('createdAt', 'desc').limit(6).get().then((querySnapshot) => {

      let i = 0;
      querySnapshot.forEach((doc) => {
        messages[i++] = {
          id: doc.id,
          uid: doc.data().uid,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
        };
      });

      this.loading = false;
      this.setState({messages});

    }).catch((error) => {
      console.log('Error getting documents: ', error);
    });
  }

  /**
   *
   * @returns {JSX.Element}
   */
  render() {

    if (!this.loading) {
      return this.view();
    }

    return <Loading/>;
  }

  /**
   * View
   */
  view() {
    return (
      <div>
        {this.state.messages && this.state.messages.map(msg => <Tweet key={msg.id} message={msg}/>)}
      </div>
    );
  }
}

export default Tweets;
