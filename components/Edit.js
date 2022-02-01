import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../lib/firebase";

export default function Edit({ team1, team2, stadium, date, time, id }) {
  const [change, setChange] = useState({
    team1: team1,
    team2: team2,
    stadium: stadium,
    date: date,
    time: time,
  });

  const intake = [
    {
      inputClass: "input",
      name: "team1",
      placeholder: "team 1",
      type: "name",
      value: change.team1,
    },
    {
      inputClass: "input",
      name: "team2",
      placeholder: "team 2",
      type: "name",
      value: change.team2,
    },
    {
      inputClass: "input",
      name: "stadium",
      placeholder: "stadium",
      type: "name",
      value: change.stadium,
    },
    {
      inputClass: "input",
      name: "date",
      placeholder: "date",
      type: "date",
      value: change.date,
    },
    {
      inputClass: "input",
      name: "time",
      placeholder: "time",
      type: "time",
      value: change.time,
    },
  ];

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setChange({ ...change, [name]: value });
  }

  console.log(id);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateDoc(doc(firestore, `matches`, id), {
      team1: change.team1,
      team2: change.team2,
      stadium: change.stadium,
      date: change.date,
      time: change.time,
    });
  }

  return (
    <div className="edit-container">
      <form>
        {intake.map((data) => {
          return (
            <input
              className={data.inputClass}
              onChange={handleChange}
              name={data.name}
              placeholder={data.placeholder}
              type={data.type}
              value={data.value}
            />
          );
        })}
        <button type="button" className="btn" onClick={handleSubmit}>
          Submit Changes
        </button>
      </form>
    </div>
  );
}
