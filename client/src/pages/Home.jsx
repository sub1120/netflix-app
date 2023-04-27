import { Link } from "react-router-dom";
import show1 from ".././assets/images/show1.png";
import show2 from ".././assets/images/show2.png";
import show3 from ".././assets/images/show3.png";
import show4 from ".././assets/images/show4.png";
import Accordian from ".././components/accordian/Accordian";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-12">
      <div className="text-white">
        <section className="relative h-fit">
          <div className="w-full h-full bg-netflix-home bg-no-repeat bg-cover rounded-md p-24 space-y-4 opacity-50"></div>
          <div>
            <h1 className="font-bold">
              Unlimited movies,
              <br /> TV shows and more
            </h1>
            <p className="font-bold text-2xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-2xl text-bold">
              Ready to watch? Enter your email to create or restart your <br />{" "}
              membership.
            </p>

            <form className="flex gap-4">
              <div className="relative z-0 w-72 mb-6 group bg-[#1C0F17] border-2 rounded text-sm text-slate-500">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block p-2 w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Email address
                </label>
              </div>

              <button
                type="submit"
                className="align-middle text-2xl px-6 font-bold bg-red-600 rounded text-white "
              >
                <Link to="/signup">Get Started</Link>
                <StartIcon />
              </button>
            </form>
          </div>
        </section>

        <section>
          <article className="flow-root">
            <div className="float-right">
              <img src={show1} alt="banner" />
            </div>
            <div>
              <h2>Enjoy on your TV.</h2>
              <p>
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
          </article>

          <article className="flow-root">
            <div className="float-left">
              <img src={show2} alt="banner" />
            </div>
            <div>
              <h2>Enjoy on your TV.</h2>
              <p>
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
          </article>

          <article className="flow-root">
            <div className="float-right">
              <img src={show3} alt="banner" />
            </div>
            <div>
              <h2>Enjoy on your TV.</h2>
              <p>
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
          </article>

          <article className="flow-root">
            <div className="float-left">
              <img src={show4} alt="banner" />
            </div>
            <div>
              <h2>Enjoy on your TV.</h2>
              <p>
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
          </article>
        </section>

        <section>
          <Accordian></Accordian>
          <p className="text-xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form>
            <input type="email" className="p-4 border-2 rounded" />
            <button type="submit" className="p-4 bg-red-600 rounded text-white">
              Get Started
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Home;

const StartIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="inline w-6 h-6 font-extrabold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};
