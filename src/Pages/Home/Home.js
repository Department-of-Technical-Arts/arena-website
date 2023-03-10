import React from "react";
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  batch,
  Fade,
  FadeIn,
  MoveOut,
  Sticky,
  StickyIn,
} from "react-scroll-motion";
import "./Home.css";
import video from "./BG.mp4";
import bg1 from "./bg-1.jpg";
import bg2 from "./bg-2.jpg";
import bits from "./bits-img.png";
import bg3 from "./bg-3.jpg";
import bg4 from "./bg-4.jpg";
import logo from "../../Assets/phoenixplain.png";
const Home = () => {
  return (
    <>
      <section className="top" id="top">
        <ScrollContainer>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky())}>
              <div className="first-page">
                <video
                  className="video-bg"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                </video>
                <div className="title">
                  <b>ARENA 2023</b>
                </div>
                <div className="sub-heading">Where Legends Are Born</div>
                <button className="home-btn accom">
                  FOR ACCOMMODATION Click Here
                </button>
                <button className="home-btn transport">
                  FOR TRANSPORTATION (Rs.100-150)
                  <br />
                  Click Here
                </button>
                <div className="scroll-div">Scroll Down</div>
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky())}>
              <img alt="arena" className="bg-image-1" src={bg1} />
            </Animator>
            <Animator animation={batch(Fade(), Sticky(), MoveOut())}>
              <div className="second-page">
                <div className="title sec">
                  <b>ARENA 2023</b>
                </div>
                <div className="sub-heading sec">Where Legends Are Born</div>
                <a href="https://forms.gle/HXdL7oMva7LUGxw77">
                  <button className="home-btn accom">
                    FOR ACCOMMODATION Click Here
                  </button>
                </a>
                <a href="https://forms.gle/HXdL7oMva7LUGxw77">
                  <button className="home-btn transport">
                    FOR TRANSPORTATION (Rs.100-150)
                    <br />
                    Click Here
                  </button>
                </a>
              </div>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(FadeIn(), StickyIn(), MoveOut())}>
              <img alt="arena" className="bg-image-1 blur" src={bg2} />
              <img alt="arena" className="bits" src={bits} />
            </Animator>
            <Animator animation={batch(Fade(), StickyIn(), MoveOut())}>
              <div className="about-head">About Us</div>
              <div className="about-desc">
                Sports have always been one of the primary channels used by man
                to quench his thirst for competition, as well as promote
                camaraderie and unity among participants and fans alike. It is
                the spirit of the game that urges man to dream, push his limits,
                and achieve glory. Once a year, here at BITS Pilani Hyderabad
                Campus, we allow this spirit to entirely consume us as we host
                our annual sports fest, Arena. Arena is one of the biggest
                sporting festivals conducted in India. The preparation ahead of
                the fest is grueling, the buildup intense, and participation
                nothing short of mind blowing as we welcome competitors not only
                from Telangana and Andhra Pradesh but on a national level as
                well. This year we plan on hosting the 8th edition of Arena,
                Arena '23. Keeping up with the ambitions and expectations from a
                campus such as ours, we are envisioning an Arena bigger, grander
                and more thrilling than ever before. Join us as we compete to
                the edge of our capabilities, vie for glory on the field and
                most importantly, enjoy the game.
              </div>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </section>
      <div className="after-movies" style={{ backgroundImage: `url(${bg3})` }}>
        <h1>AFTERMOVIES</h1>
        <div className="movies">
          <div className="movie">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/oYqPkEPJww4`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="2020"
            />
            <h3>2020</h3>
          </div>
          <div className="movie">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/TO_9QZrutwM`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="2017"
            />
            <h3>2017</h3>
          </div>
          <div className="movie">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/P8ODue9XxWQ`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="2016"
            />
            <h3>2016</h3>
          </div>
        </div>
      </div>
      <div
        className="after-movies"
        style={{
          backgroundImage: `url(${bg4})`,
          backgroundSize: "scale-down",
          backgroundPosition: "center",
        }}
      >
        <div className="acc">ACCOMMODATION</div>
        <div className="movies">
          <div className="acc-desc">
            Accommodations are available for ???900 (where ???800 is accommodation
            charge and ???100 is security deposit which will be refunded later if
            no damage is caused by the team in our campus)
          </div>
        </div>
      </div>
      <div className="landing-footer">
        <img alt="arena" className="footer-bits" src={bits}></img>
        <img alt="arena" className="footer-bits" src={logo}></img>
        <div className="links">
          <h3>Follow Us</h3>
          <p></p>
          <p></p>
          <p>
            <a href="https://www.instagram.com/arena.bitsh/">Instagram</a>
          </p>
          <p>
            <a href="https://www.instagram.com/arena.bitsh/">Facebook</a>
          </p>
          <p>
            <a href="https://www.instagram.com/arena.bitsh/">Youtube</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
