import { useEffect, useState } from "react"

function App() {
  const [vermelho, setVermelho] = useState(0);
  const [azul, setAzul] = useState(0);

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'q':
        contarVermelho2();
        break;
      case 'u':
        contarAzul2();
        break;
      case 'w':
        contarVermelho3();
        break;
      case 'i':
        contarAzul3();
        break;
      case 'n':
        zerarPontos();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function contarVermelho2() {
    setVermelho((prevVermelho) => prevVermelho + 2);
  }

  function contarAzul2() {
    setAzul((prevAzul) => prevAzul + 2); 
  }

  function contarVermelho3() {
    setVermelho((prevVermelho) => prevVermelho + 3);
  }

  function contarAzul3() {
    setVermelho((prevAzul) => prevAzul + 3);
  }

  function zerarPontos() {
    setVermelho(0);
    setAzul(0);
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full grid grid-cols-2">
        <div className="bg-red-600 w-full grid col-span-1">
          <div className="justify-center items-center flex-col flex">
          <span>{vermelho}</span>
          </div>
        </div>
        <div className="bg-blue-600 w-full col-span-1  grid">
          <div className="justify-center items-center flex-col flex">
          <span>{azul}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;
