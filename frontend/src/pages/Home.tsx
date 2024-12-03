
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
      {/* Container */}
      <div className="w-full max-w-md p-6 bg-white/10 rounded-lg shadow-lg">
        {/* Branding */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white">Articly</h1>
          <p className="mt-2 text-gray-300">Empowering Your Words, Amplifying Your Voice.</p>
        </header>

        {/* Options */}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium text-gray-200">Are you new to Articly?</h2>
          <div className="mt-6 flex gap-4 justify-center">
            <button
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md transition"
              onClick={() => navigateTo("/signup")}
            >
              Sign Up
            </button>
            <button
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium shadow-md transition"
              onClick={() => navigateTo("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-400">© 2024 Articly. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const navigateTo = (path: string) => {
  window.location.href = path;
};

export default Home
