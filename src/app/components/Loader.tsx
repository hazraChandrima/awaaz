// components/Loader.tsx
const Loader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="border-t-4 border-red-500 border-solid rounded-full w-16 h-16 animate-spin mx-auto"></div>
      </div>
    );
  };
  
  export default Loader;
  