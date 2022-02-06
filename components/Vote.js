import { useReducer, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

//reduce function for useReducer
function reduce(state, action) {
  //switch case for reduce
  switch (action.type) {
    case "vote":
      //writing in firestore
      setDoc(doc(firestore, "votes", new Date().getTime().toString()), {
        vote: action.payload.eValue,
      });

      //returning function
      return {
        ...state,
        value: action.payload.eValue,
        voted: action.payload.voted,
      };
    case "vote-array":
      return { ...state, votesArray: action.payload };

    case "calculations":
      return { ...state, calcObj: action.payload };
  }
}

const initialValues = {
  value: "",
  voted: false,
  votesArray: [],
  calcObj: [],
};

const radioList = ["LQ", "PZ", "IU", "KK", "MS", "QG"];

export default function Vote() {
  //reducer definition
  const [state, dispatch] = useReducer(reduce, initialValues);

  //getting the voted values
  useEffect(() => {
    let unsubscribe = onSnapshot(collection(firestore, "votes"), (res) => {
      let array = res.docs.map((data) => {
        return data.data();
      });

      //passing in the state variables
      dispatch({ type: "vote-array", payload: array });
    });

    //seperation of votes array
    const LQ = state.votesArray.filter((res) => {
      return res.vote === "LQ";
    });
    const PZ = state.votesArray.filter((res) => {
      return res.vote === "PZ";
    });
    const IU = state.votesArray.filter((res) => {
      return res.vote === "IU";
    });
    const KK = state.votesArray.filter((res) => {
      return res.vote === "KK";
    });
    const MS = state.votesArray.filter((res) => {
      return res.vote === "MS";
    });
    const QG = state.votesArray.filter((res) => {
      return res.vote === "QG";
    });

    dispatch({
      type: "calculations",
      payload: [
        LQ.length,
        PZ.length,
        IU.length,
        KK.length,
        MS.length,
        QG.length,
      ],
    });

    return () => {
      unsubscribe();
    };
  }, [state.voted]);

  let counter = -1;
  //returning JSX
  return (
    <div className="vote-container">
      <form className="vote-form">
        <h2 className="vote-title">Vote who's going to win PSL 7</h2>
        {radioList.map((value) => {
          ++counter;
          return (
            <RadioButton
              dispatch={dispatch}
              value={value}
              state={state}
              calcObj={state.calcObj}
              counter={counter}
            />
          );
        })}
        <h6>Vote to view results</h6>
      </form>
    </div>
  );
}

function RadioButton({ dispatch, value, state, calcObj, counter }) {
  //refering to input
  const inputRef = useRef();
  state.voted && inputRef.current.classList.add("label-checked");

  //returning JSX
  return (
    <>
      <input
        type="radio"
        className="radio"
        name="team"
        value={value}
        id={value}
        disabled={state.voted}
        onClick={(e) => {
          dispatch({
            type: "vote",
            payload: { eValue: e.target.value, voted: true },
          });
        }}
      />
      <label ref={inputRef} className="vote-labels" htmlFor={value}>
        {value}
        {state.voted && (
          <span
            style={{
              width: `${(calcObj[counter] / state.votesArray.length) * 100}%`,
            }}
          ></span>
        )}
      </label>
    </>
  );
}
