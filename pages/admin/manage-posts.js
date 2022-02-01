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
  let counter = 0;
  const [matchData, setMatchData] = useState({
    team1: "",
    team2: "",
    stadium: "",
    date: "",
    time: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  async function deleteMe() {
    await deleteDoc(doc(firestore, `matches`, id));
  }

  let oneMatchContainer = {
    gridTemplateRows: "60% 10% 10% 10% 10% 15% 15%",
  };

  let matchesMainContainer = {
    height: "30rem",
  };
  return (
    <AuthCheck>
      <div className="manage-posts-container">
        <div className="schedule-container" style={{ width: "80%" }}>
          <div className="schedule-title-container">
            <h1 className="schedule-title">PSL 7 Schedule</h1>
          </div>
          <div className="matches-main-container">
            <div className="matches-container" style={matchesMainContainer}>
              {matches.map((data) => {
                ++counter;
                return (
                  <div
                    className="one-match-container"
                    style={oneMatchContainer}
                  >
                    <div className="logos-container">
                      <img
                        src={data.team1logo}
                        alt={data.team1}
                        className="team1logo team-logo"
                      />
                      <img
                        src={data.team2logo}
                        alt={data.team2}
                        className="team2logo team-logo"
                      />
                    </div>
                    <h4 className="teams">
                      {data.team1} vs {data.team2}
                    </h4>
                    <h6 className="stadiums">{data.stadium}</h6>
                    <h6 className="date">{data.date}</h6>
                    <h6 className="time">{data.wqt}</h6>
                    <h6 className="match-no">Match {counter}</h6>
                    <button
                      type="button"
                      className="btn"
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
                    <button type="button" className="btn" onClick={deleteMe}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
    </AuthCheck>
  );
}
