import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import BreadImg from "../images/IMG_4261-2.jpg";
import { connectToDatabase } from "../util/mongodb";

const SubmitStateEnum = {
  WAITING: "waiting",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function Home({ lotteryBreads, totalBreads }) {
  const [submitState, setSubmitState] = useState(SubmitStateEnum.WAITING);
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitState(SubmitStateEnum.LOADING);
    setError("");

    const data = new FormData(e.target);
    const body = JSON.stringify({
      email: data.get("email"),
      name: data.get("name"),
      address: data.get("address"),
    });
    try {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      };
      const fetchResponse = await fetch(`/api/addRequest`, settings);
      if (fetchResponse.ok) {
        setSubmitState(SubmitStateEnum.SUCCESS);
      } else {
        const text = await fetchResponse.text();
        throw new Error(text);
      }
    } catch (e) {
      setError(e.message);
      setSubmitState(SubmitStateEnum.ERROR);
    }
  };

  const getSubmitButtonText = () => {
    switch (submitState) {
      case SubmitStateEnum.LOADING:
        return "Submitting";
      case SubmitStateEnum.SUCCESS:
        return "Success!";
      case SubmitStateEnum.ERROR:
        return "There was an error!";
      default:
        return "Submit";
    }
  };

  const buttonDisabled = () => {
    if (
      submitState === SubmitStateEnum.LOADING ||
      submitState === SubmitStateEnum.SUCCESS
    ) {
      return true;
    }
    return false;
  };

  const renderRandomGif = () => {
    const gifs = [
      "https://i.giphy.com/media/3o7ZeFpK0qqSpsWNsA/giphy.webp",
      "https://i.giphy.com/media/Y7O3LHmhllEk/giphy.webp",
      "https://i.giphy.com/media/YOI55oGPCfife/giphy.webp",
    ];
    return <img src={gifs[Math.floor(Math.random() * gifs.length)]} />;
  };

  return (
    <Layout>
      <div>
        <main>
          <div className="absolute h-screen w-full z-0 flex">
            <Image
              src={BreadImg}
              alt="Bread"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              className="z-0"
            />
          </div>
          <div
            className="h-screen flex items-center justify-start relative
            bg-gradient-to-t from-gray-800 to-transparent"
          >
            <h1
              className="mx-6 md:mx-16 relative text-3xl md:text-5xl
              leading-tight md:leading-tight font-bold text-white text-shadow"
            >
              The Yeasty Boys
              <br /> Sourdough Bread Lottery
            </h1>
          </div>

          <div
            className="items-center container 
            mx-auto py-20 px-6 max-w-3xl"
          >
            <h2 className="text-2xl mb-6">What the fuck is this?</h2>
            <p>
              This is the official waiting list for Matt Gregg&lsquo;s
              sourdough. I generally make one loaf to give away for free every
              week to friends and family. If you live in the Twin Cities area of
              Minnesota, and I know you, you are eligible to enter this lottery.
              Please fill out your name, email and full address below and I will
              notify you if you&lsquo;ve won a loaf and have become a
              Breadwinner.
            </p>
          </div>

          <div
            className="container 
            mx-auto pb-10 px-6 max-w-3xl grid sm:grid-cols-3 gap-10"
          >
            <div className="text-center">
              <p>Lottery winners</p>
              <p className="text-red text-4xl mt-6">{lotteryBreads}</p>
            </div>
            <div className="text-center">
              <p>Total loaves made</p>
              <p className="text-red text-4xl mt-6">{totalBreads}</p>
            </div>
            <div className="text-center">
              <p>Flour used</p>
              <p className="text-red text-4xl mt-6">{totalBreads * 440}g</p>
              <p>({Math.floor((totalBreads * 440) / 453.59)}lbs)</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 mb-10">
            <div className="p-6 shadow bg-white  rounded-md">
              {submitState !== SubmitStateEnum.SUCCESS && (
                <form
                  onSubmit={submitForm}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Name:
                    <input
                      name="name"
                      type="text"
                      required
                      className="mt-1 focus:ring-red focus:border-red 
                      block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 focus:ring-red focus:border-red 
                      block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700 col-span-2">
                    Address (including city and zip code):
                    <input
                      type="text"
                      name="address"
                      required
                      className="mt-1 focus:ring-red focus:border-red 
                        block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </label>

                  <div className="pt-3 text-center col-span-2">
                    <button
                      disabled={buttonDisabled()}
                      className="inline-flex justify-center py-2 px-4 border 
                        border-transparent shadow-sm text-sm font-medium rounded-md 
                        text-white bg-red hover:bg-red focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-red disabled:opacity-50"
                    >
                      {getSubmitButtonText()}
                    </button>
                    {error.length > 0 && <p>{error}</p>}
                  </div>
                  <p className="text-center col-span-2">
                    <small>
                      This probably goes without saying, but I will never sell
                      or distribute any of your information to anyone.
                    </small>
                  </p>
                </form>
              )}
              {submitState === SubmitStateEnum.SUCCESS && (
                <div>
                  <p className="text-xl mb-4">
                    Congrats!!! You&lsquo;re one step closer to bread!
                  </p>
                  <p>
                    You should receive a welcome email in your inbox shortly. If
                    you don&lsquo;t, check your spam folder and mark it as not
                    spam.
                  </p>
                  <div className="my-4 flex justify-center">
                    {renderRandomGif()}
                  </div>
                  <div className="text-center">
                    <Link href="/breadmachine" className="font-bold">
                      While you&lsquo;re waiting... check out the Bread Machine
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            {submitState !== SubmitStateEnum.SUCCESS && (
              <p>
                <small>
                  I&lsquo;m not interested in becoming a Breadwinner, I&lsquo;m
                  just here for the{" "}
                  <Link href="/breadmachine">bread machine</Link>.
                </small>
              </p>
            )}
            <small>
              Made by <a href="https://codegregg.com">CodeGregg</a>
            </small>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  let lotteryBreads = 0;
  const numberSold = 4;
  const numberDonated = 7;

  try {
    const response = await db
      .collection("sourdough")
      .aggregate([{ $group: { _id: 1, count: { $sum: "$numberOfBreads" } } }]);
    [lotteryBreads] = await response.toArray();
    lotteryBreads = lotteryBreads.count + numberDonated;
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      lotteryBreads,
      totalBreads: lotteryBreads * 2 + numberSold,
    },
  };
}
