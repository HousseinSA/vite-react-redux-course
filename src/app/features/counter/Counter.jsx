import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, clear, incrementByAmount } from "./CounterSlice"
import { useState } from "react"
const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState(0)
  const NumberAmount = Number(incrementAmount) || 0
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
  const resetAll = () => {
    dispatch(clear())
    setIncrementAmount(0)
  }
  return (
    <>
      <div>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(NumberAmount))}>
          add Amount
        </button>
        <button onClick={resetAll}>ResetAll</button>
      </div>
    </>
  )
}

export default Counter
