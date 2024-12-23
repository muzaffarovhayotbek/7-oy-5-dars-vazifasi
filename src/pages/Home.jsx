import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/CounterSlice';

function Home() {
  const counter = useSelector((state) => state.counter);
  console.log(counter);

  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment(10));
  }
  function handleDecrement() {
    dispatch(decrement(10));
  }

  return (
    <div>
      Home
      <h3>{counter}</h3>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  );
}

export default Home;
