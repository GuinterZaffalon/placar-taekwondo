import { useEffect, useState } from "react"

function App() {
  const [vermelho, setVermelho] = useState(0);
  const [azul, setAzul] = useState(0);
  const [gamepadConnected, setGamepadConnected] = useState(false);

  const handleGamepadInput = () => {
    const gamepads = navigator.getGamepads();

    if (gamepads[0]) {
      const gamepad = gamepads[0];

      if (gamepad.buttons[0].pressed) {
        contarVermelho2();
      }

      if (gamepad.buttons[1].pressed) {
        contarAzul2();
      }

      if(gamepad.buttons[2].pressed) {
        contarVermelho3();
      }

      if(gamepad.buttons[3].pressed) {
        contarAzul3();
      }

      if (gamepad.buttons[12].pressed) {
        zerarPontos();
      }
    }
  };

  const gamepadListener = (e: GamepadEvent) => {
    if (e.type === "gamepadconnected") {
      setGamepadConnected(true);
      console.log("Gamepad conectado:", e.gamepad.id);
    } else if (e.type === "gamepaddisconnected") {
      setGamepadConnected(false);
      console.log("Gamepad desconectado:", e.gamepad.id);
    }
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadListener);
    window.addEventListener("gamepaddisconnected", gamepadListener);

    const interval = setInterval(() => {
      if (gamepadConnected) {
        handleGamepadInput();
      }
    }, 120);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadListener);
      window.removeEventListener("gamepaddisconnected", gamepadListener);
      clearInterval(interval);
    };
  }, [gamepadConnected]);

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
    setAzul((prevAzul) => prevAzul + 3);
  }

  function zerarPontos() {
    setVermelho(0);
    setAzul(0);
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-lg">
        {gamepadConnected ? "Gamepad conectado!" : "Conecte um gamepad."}
      </h1>
      <div className="w-full h-full grid grid-cols-2">
        <div className="bg-red-600 w-full grid col-span-1">
          <div className="justify-center items-center flex-col flex">
          <span className="text-9xl">{vermelho}</span>
          </div>
        </div>
        <div className="bg-blue-600 w-full col-span-1  grid">
          <div className="justify-center items-center flex-col flex">
          <span className="text-9xl">{azul}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;