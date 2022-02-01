import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import AuthCheck from "../../components/Authcheck";
import { firestore, storage } from "../../lib/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

export default function CreateNewPost() {
  const [file, setFile] = useState();
  const [uploadingTeam, setUploadingTeam] = useState();
  const [team, setTeam] = useState({ team1: "", team2: "" });
  const [picLink, setPicLink] = useState({ team1: "", team2: "" });
  const [change, setChange] = useState({
    team1: "",
    team2: "",
    stadium: "",
    date: "",
    time: "",
    team1logo: "",
    team2logo: "",
  });
  const input = [
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
  const [link1] = useDownloadURL(ref(storage, `/logos/${team.team1}`));
  const [link2] = useDownloadURL(ref(storage, `/logos/${team.team2}`));
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setChange({ ...change, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const id = new Date().getTime().toString();
    await setDoc(doc(firestore, `matches`, id), {
      team1: change.team1,
      team2: change.team2,
      stadium: change.stadium,
      date: change.date,
      wqt: change.time,
      matchId: id,
      team1logo: link1,
      team2logo: link2,
    });

    setChange({
      team1: "",
      team2: "",
      stadium: "",
      date: "",
      time: "",
    });
  }

  async function uploadFile(e) {
    setFile(Array.from(e.target.files)[0]);
  }

  async function uploaded() {
    await uploadBytes(ref(storage, `logos/${uploadingTeam}`), file)
      .then((snapshot) => {
        console.log(snapshot.ref.storage);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(link1, "LINK@------>", link2);
  }

  return (
    <div className="create-new-post-container">
      <AuthCheck>
        <form>
          {input.map((data) => {
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
          <input
            className="upload"
            accept="image/*"
            type="file"
            onChange={(e) => {
              setTeam({ ...team, team1: change.team1 });
              setUploadingTeam(change.team1);
              uploadFile(e);
            }}
          />
          <button
            className="btn"
            type="button"
            onClick={() => {
              uploaded();
            }}
          >
            Upload Team 1 File
          </button>
          <input
            className="upload"
            accept="image/*"
            type="file"
            onChange={(e) => {
              setTeam({ ...team, team2: change.team2 });
              setUploadingTeam(change.team2);
              uploadFile(e);
            }}
          />
          <button
            className="btn"
            type="button"
            onClick={() => {
              uploaded();
            }}
          >
            Upload Team 2 File
          </button>
          <button type="button" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </AuthCheck>
    </div>
  );
}
