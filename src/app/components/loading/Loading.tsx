import Loader from "../Loader";

const Loading = () => {
  return (
    <>
      <div className="h-dvh">
        <div className="h-3/4 mx-auto flex justify-center">
          <Loader />
        </div>
      </div>
    </>
  );
};

export default Loading;
