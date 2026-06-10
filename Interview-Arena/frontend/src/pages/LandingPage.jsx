import "./LandingPage.css";
import heroImage from "../assets/hero.svg";
import secimg from "../assets/secimg.svg";
function LandingPage(){
    return (
   <div className="landing-page">

      <nav className="navbar">

        <h2>Interview Arena</h2>

        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Login</a>
        </div>

      </nav>

      <section className="hero">
        

        <div className="hero-left">

         <h2>
  Collaborative Coding
  <br />
  Interviews
</h2>

          <p>
  Video calls, collaborative coding,
  real-time code execution and AI-powered
  interview assistance in one place.
</p>

          <div className="hero-buttons">

            <button>
              Start Interview
            </button>

            <button>
              Join Room
            </button>

          </div>

        </div>

  <div className="hero-right">

   <img
      src={heroImage}
      alt="Interview Illustration"
      className="hero-image1"
   />
    <img
      src={secimg}
      alt="Interview Illustration"
      className="hero-image2"
   />

</div>

      </section>
      <section className="features">

  <h2>Why Interview Arena?</h2>

  <div className="feature-cards">

    <div className="feature-card">
      <div className="feature-icon">🎥</div>
      <h3>Video Interviews</h3>
      <p>
        Conduct face-to-face technical interviews
        with integrated video calling.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">💻</div>
      <h3>Collaborative Coding</h3>
      <p>
        Write code together in real time with
        synchronized editors.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon"></div>
      <h3>Run Code Instantly</h3>
      <p>
        Execute code directly during interviews
        and review results instantly.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

export default LandingPage;