import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

const SubmitStateEnum = {
  WAITING: 'waiting',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function Home() {
  const [submitState, setSubmitState] = useState(SubmitStateEnum.WAITING);
  const [error, setError] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitState(SubmitStateEnum.LOADING);
    setError('');

    const data = new FormData(e.target);
    const body = JSON.stringify({
      email: data.get('email'),
      name: data.get('name'),
      address: data.get('address'),
    });
    try {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
        return 'Submitting';
      case SubmitStateEnum.SUCCESS:
        return 'Success!';
      case SubmitStateEnum.ERROR:
        return 'There was an error!';
      default:
        return 'Submit';
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

  return (
    <Layout>
      <div className='container'>
        <Head>
          <title>Yeasty Boys Sourdough Bread Lottery</title>
          <link
            rel='icon'
            href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍞</text></svg>'
          />
        </Head>
        <div className='background-wrap'>
          <Image
            src='/images/IMG_3547.jpg'
            alt='Bread'
            layout='fill'
            objectFit='cover'
            quality={15}
          />
        </div>

        <main>
          <h1>The Yeasty Boys Sourdough Bread Lottery</h1>

          <p>
            This is the official waiting list for Matt Gregg&lsquo;s sourdough.
            I generally make one loaf to give away for free every week to
            friends and family. If you live in the twin cities area of Minnesota
            you are eligible to enter this lottery. Please fill out your name,
            email and full address below and I will notify you if you&lsquo;ve
            won a loaf.
          </p>
          {submitState !== SubmitStateEnum.SUCCESS && (
            <form onSubmit={submitForm}>
              <label>
                Name:
                <input type='text' name='name' required />
              </label>
              <label>
                Email:
                <input type='email' name='email' required />
              </label>
              <label className='address'>
                Address (including city and zip code):
                <input type='text' name='address' required />
              </label>

              <div className='submit'>
                <button disabled={buttonDisabled()}>
                  {getSubmitButtonText()}
                </button>
                {error.length > 0 && <p>{error}</p>}
              </div>
            </form>
          )}
          {submitState === SubmitStateEnum.SUCCESS && (
            <>
              <p>Congrats!!! You&lsquo;re one step closer to bread!</p>
              <Link href='/breadmachine'>
                While you&lsquo;re waiting... check out the Bread Machine
              </Link>
            </>
          )}
        </main>

        <footer></footer>

        <style jsx>{`
          form {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          @media (min-width: 600px) {
            form {
              grid-template-columns: 1fr 1fr;
            }
          }
          label {
            margin-bottom: 0.5rem;
          }
          input {
            display: block;
            width: 100%;
            font-size: 1rem;
            border: none;
            border-radius: 0;
            border-bottom: 2px solid #333;
            margin-top: 0.5rem;
            padding: 3px 0;
          }
          input:focus {
            outline: none;
            border-bottom-color: #f54952;
          }
          .address {
            grid-column: 1 / -1;
          }
          .submit {
            grid-column: 1 / -1;
            text-align: center;
          }
          button {
            border: 2px solid #333;
            padding: 0.5rem 1rem;
            background: #fff;
            font-size: 18px;
            border-radius: 0.5rem;
          }
        `}</style>
      </div>
    </Layout>
  );
}
