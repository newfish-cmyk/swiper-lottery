import SwiperLottery from "./SwiperLottery"

function App() {

  const ImageList = [
    '/images/0.png',
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png',
    '/images/6.png',
    '/images/7.png',
    '/images/8.png',
    '/images/9.png',
  ];  

  return (
    <>
      <SwiperLottery
        imgList={ImageList}
        slideTime={9000}
        awardIndex={1}
        initSpeed={280}
        fastSpeed={100}
      />
    </>
  )
}

export default App
