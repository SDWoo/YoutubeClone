import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem('userId'),
    };
    Axios.post('/api/subscribe/subscribeNumber', variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert('구독자 수 정보 받기 실패!');
      }
    });

    Axios.post('/api/subscribe/subscribed', subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('정보 받기 실패!');
        }
      }
    );
  });
  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 구독중이라면 ?
    if (Subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 취소 실패!');
          }
        }
      );
    }
    // 구독이 처음이라면?
    else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 하기 실패!');
          }
        }
      );
    }
  };
  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
