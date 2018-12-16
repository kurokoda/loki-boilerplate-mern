import React from 'react';

export default props => {
  console.log(props);
  return (
    <div>
      <h2>Hello</h2>
      <button onClick={props.onRequestClose}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </div>
  );
};
