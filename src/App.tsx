import { useEffect, useState } from "react"
import Countdown from "./components/countdown";

function App() {
  const [vermelho, setVermelho] = useState(0);
  const [azul, setAzul] = useState(0);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [timer, SetTimer] = useState(0);

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

      if (gamepad.buttons[2].pressed) {
        contarVermelho3();
      }

      if (gamepad.buttons[3].pressed) {
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
    }, 160);

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

  useEffect(() => {

  });

  return (
    <div className="w-full h-screen relative">
      <h1 className={`text-center text-lg ${gamepadConnected ? "bg-green-600" : "bg-white"}`}>
        {gamepadConnected ? "Gamepad conectado" : "Conecte um gamepad."}
      </h1>
      <div className="flex h-full w-full">
        <div className="bg-red-600 w-1/2 h-full justify-center items-center flex flex-col">
          <span className="text-9xl">{vermelho}</span>
        </div>
        <div className="bg-blue-600 w-1/2 h-full justify-center items-center flex flex-col">
          <span className="text-9xl">{azul}</span>
        </div>
      </div>
      <Countdown seconds = {95}/>
    </div>
  );
  
}

export default App;