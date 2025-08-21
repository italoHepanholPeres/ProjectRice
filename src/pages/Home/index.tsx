import NavBar from "../../components/navBar/NavBar";

function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-purple-400 bg-gradient-to-b from-purple-700 to-purple-500">
      <NavBar />
      <div>
        Lidos recentemente:
        <hr />
      </div>
    </div>
  );
}

export default Home;
