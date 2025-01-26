import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./loader.css"

const Main = () => {

  const [link, setLink] = useState("");
  const [shortUrll, setShortUrll] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked) {
      if (link) {
        getShortUrl(link);
        setButtonClicked(false);
      }
    }
  }, [link, buttonClicked])

  async function getShortUrl() {
    const response = await axios.post('https://url-shortner-1-qb35.onrender.com/sort_url', {
      url: link
    })
    if (response.data.success) {
      setShortUrll(response.data.shortUrl);
      console.log(shortUrll);
    } else {
      alert(response.data.message);
    }
  }

  return <div className=' w-full h-full flex flex-col items-center ' >

    <div className=' mt-[100px] text-[36px] font-semibold font-serif text-teal-700 select-none mb-[40px]  ' >
      BeShorter
    </div>

    <div className=' w-[60%] mx-auto bg-white h-[300px] flex flex-col items-center gap-[10px] shadow-2xl ' >

      <div className=' text-[36px] mt-[20px] font-bold text-[#555] font-[Consolas] mb-[10px] ' >
        Want to make your URL Shortened
      </div>

      <div className=' w-[80%] flex gap-[10px] items-center justify-center ' >
        <input type="text" placeholder='Enter Your Link Here...' required className=' w-[70%] h-[50px] border-[2px] rounded-full pl-[20px] text-[20px] placeholder:text-[20px]' onChange={(e) => {
          setLink(e.target.value);
        }} value={link} />
        <button onClick={() => {
          setButtonClicked(true);
        }} className='h-[50px] border-[2px] rounded-full w-[150px] text-center text-[20px] cursor-pointer ' >Shorten URL</button>
      </div>


      {
        shortUrll ? <div className='text-[20px] font-bold w-[68%] mt-[10px] ' >
          Short URL:- <a className=' text-blue-600 font-medium ' href={shortUrll}>{shortUrll}</a>
        </div> : <div></div>
      }


      <div className='w-[68%] mt-[5px] pl-[15px] ' >
        <ul className='list-disc' >
          <li>Copy and Paste the shortened URL in your browser to see the magic.</li>
          <li>You can only use this URL upto 10 Minutes, after 10 Minutes it will expire.</li>
          <li>This shortened URL have only 15 clicked Limit.</li>
        </ul>
      </div>

    </div>

  </div>
}

export default Main