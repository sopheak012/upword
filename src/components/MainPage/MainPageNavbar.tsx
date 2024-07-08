const MainPageNavbar: React.FC = () => {
  return (
    <>
      <div className="flex justify-between p-3 font-sans">
        <div className="text-2xl font-bold">upword</div>
        <div className="flex flex-row gap-8">
          <div className="font-medium">Today's Word</div>
          <div className="font-medium">All Words</div>
          <div className="font-medium">SignIn</div>
        </div>
      </div>
    </>
  );
};

export default MainPageNavbar;
