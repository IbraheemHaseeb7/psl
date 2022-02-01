import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useState } from "react";
import Edit from "../../components/Edit";
import AuthCheck from "../../components/Authcheck";

export async function getServerSideProps() {
  let matches = null;
  await getDocs(collection(firestore, `matches`)).then((res) => {
    matches = res.docs.map((data) => {
      return data.data();
    });
  });
  return {
    props: {
      matches,
    },
  };
}

export default function ManagePosts({ matches }) {
  const [id, setId] = useState("");
  const [matchData, setMatchData] = useState({
    team1: "",
    team2: "",
    stadium: "",
    date: "",
    time: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  async function deleteMe() {
    await deleteDoc(doc(firestore, `matches`, id))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="manage-post-container">
      <AuthCheck>
        {matches.map((data) => {
          return (
            <div className="one-match-container" key={data.wqt}>
              <h1>
                {data.team1} vs {data.team2}
              </h1>
              <h2>
                Time: {data.wqt} Stadium: {data.stadium} Date: {data.date}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setId(data.matchId);
                  setIsEdit(!isEdit);
                  setMatchData({
                    team1: data.team1,
                    team2: data.team2,
                    stadium: data.stadium,
                    date: data.date,
                    time: data.wqt,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setId(data.matchId);
                  deleteMe();
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </AuthCheck>
      {isEdit && (
        <Edit
          team1={matchData.team1}
          team2={matchData.team2}
          stadium={matchData.stadium}
          date={matchData.date}
          time={matchData.time}
          id={id}
        />
      )}
    </div>
  );
}
