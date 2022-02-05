import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";

const links = [
  {
    src: "",
    alt: "Secret Msg Me",
    name: "Secret Message Me",
    link: "https://secretmsgme.vercel.app",
  },
  {
    src: "",
    alt: "Thalk",
    name: "Just Post It",
    link: "https://fireship-one.vercel.app",
  },
  {
    src: "",
    alt: "Secret Msg the developer",
    name: "Secret Message The Developer",
    link: "https://secretmsgme.vercel.app/6mC537ithhZJrr17aAhr4xGuIOv1/public",
  },
];

const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Home() {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const date = new Date().toString().split(" ");
  let counter = 0;

  //date variables
  let myMonth = checkMyMonth(monthsNames, date);
  let myDate = checkMyDate(date);
  let myTime = checkMyTime(date);
  let matchMonth;
  let matchDate;
  let matchTime;
  let thisMonth;
  let tomorrow;
  let today;
  let live;

  useEffect(() => {
    getDocs(collection(firestore, `matches`)).then((res) => {
      setMatches(
        res.docs.map((data) => {
          return data.data();
        })
      );
    });
  }, [router.pathname]);

  //checking my month
  function checkMyMonth(monthsNames, date) {
    let count = 0;
    for (count = 0; count < 12; count++) {
      if (monthsNames[count] === date[1]) {
        return count + 1;
      }
    }
  }

  //checking my date
  function checkMyDate(date) {
    return parseInt(date[2]);
  }

  //checking my time
  function checkMyTime(time) {
    let getTime = time[4].split("");
    let hours = parseInt(getTime[0] + getTime[1]);
    let minutes = parseInt(getTime[3] + getTime[4]);
    return { hours, minutes };
  }

  //checking match month
  function checkMatchMonth(date) {
    let matchMonth = date.split("");
    let finalMatchMonth = parseInt(matchMonth[5] + matchMonth[6]);
    return finalMatchMonth;
  }

  //checking match date
  function checkMatchDate(date) {
    let matchDate = date.split("");
    let finalMatchDate = parseInt(matchDate[8] + matchDate[9]);
    return finalMatchDate;
  }

  //checking match time
  function checkMatchTime(time) {
    let getTime = time.toString().split("");
    let hours = parseInt(getTime[0] + getTime[1]);
    let minutes = parseInt(getTime[3] + getTime[4]);
    return { hours, minutes };
  }

  return (
    <div className="home-container">
      <Head>
        <title>PSL Live</title>
        <meta name="description" content="Watch PSL 7 Live for free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main-title-container">
        <h1 className="main-title">Watch PSL 7 Live for free</h1>
      </div>
      <div className="match-container">
        <h3>Scroll Down For more</h3>
        <iframe
          src="https://cdn2.crichd.pro/embed2.php?id=ptvsp&q=PTV Sports"
          name="iframe_a"
          scrolling="no"
          allowFullScreen={true}
        >
          Your Browser Do not Support Iframe
        </iframe>
        <h3>Scroll Down For more</h3>
      </div>
      <div className="schedule-container">
        <div className="schedule-title-container">
          <h1 className="schedule-title">PSL 7 Schedule</h1>
        </div>
        <div className="matches-main-container">
          <div className="matches-container">
            {matches.map((data) => {
              ++counter;
              matchMonth = checkMatchMonth(data.date);
              matchDate = checkMatchDate(data.date);
              matchTime = checkMatchTime(data.wqt);

              //checking for this month
              let calculatedMonth = myMonth - matchMonth;
              if (calculatedMonth === 0) {
                thisMonth = true;
              } else {
                thisMonth = false;
              }

              //checking for tomorrow and today
              if (thisMonth) {
                let calculatedDate = myDate - matchDate;
                if (calculatedDate === -1) {
                  tomorrow = true;
                  live = false;
                  today = false;
                } else if (calculatedDate === 0) {
                  today = true;
                  //checking for live
                  if (today) {
                    let calculatedTime = myTime.hours - matchTime.hours;
                    if (calculatedTime >= 0 && calculatedTime <= 4) {
                      live = true;
                      today = false;
                    } else {
                      live = false;
                    }
                  } else {
                    today = false;
                    live = false;
                  }
                  tomorrow = false;
                } else {
                  tomorrow = false;
                  today = false;
                }
              }

              return (
                <div className="one-match-container">
                  {tomorrow && <h6 className="tomorrow">tomorrow</h6>}
                  {today && <h6 className="tomorrow">today</h6>}
                  {live && <h6 className="live">live</h6>}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="more-container">
        <h2 className="more">More from The Developer</h2>
      </div>
      <div className="links-container">
        {links.map((data) => {
          return (
            <Linker
              src={data.src}
              alt={data.alt}
              name={data.name}
              link={data.link}
            />
          );
        })}
      </div>
      <div className="footer-container">
        <h4 className="footer-title">Developed with 💖</h4>
        <div className="footer-links-container">
          <a href="#" target="_blank" className="footer-links">
            Facebook
          </a>
          <a href="#" target="_blank" className="footer-links">
            Instagram
          </a>
          <a href="#" target="_blank" className="footer-links">
            Twtitter
          </a>
        </div>
      </div>
    </div>
  );
}

function Linker({ src, alt, name, link }) {
  return (
    <a href={link} target="_blank">
      <div className="links">
        <img src={src} alt={alt} />
        <div className="link-name">
          <p className="link-p">{name}</p>
        </div>
      </div>
    </a>
  );
}
