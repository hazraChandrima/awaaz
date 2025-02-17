import Loader from "../Loader";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";


const Loading = () => {
  return (
    <>
      <div className="h-dvh">
        <Navbar />
        <div className="h-3/4 mx-auto flex justify-center">
          <Loader />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Loading;
