import { useEffect, useState } from "react"
import Countdown from "./components/countdown";
import { Box, Button, Modal } from "@mui/material";
import Win from "./components/win";

function App() {
  const [vermelho, setVermelho] = useState(0);
  const [azul, setAzul] = useState(0);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [timer, SetTimer] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalWin, setOpenModalWin] = useState(false);
  const handleOpenWin = () => setOpenModalWin(true);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [selectTime, setSelectedTime] = useState("1");
  const [vencedor, setVencedor] = useState("");

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

  useEffect(() => {
    handleOpen();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleOpenWin();
    }
  }, [timer]);

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
    if (vermelho > azul + 12) {
      setVencedor("vermelho");
     handleOpenWin();
    } else if (azul > vermelho + 12) {
      setVencedor("azul");
      handleOpenWin();
    }
  }, [vermelho, azul]); // Dependências corretas


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

  function handleTimer() {
    switch (selectTime) {
      case "1":
        SetTimer(30);
        break;
      case "2":
        SetTimer(60);
        break;
      case "3":
        SetTimer(90);
        break;
    }
    handleClose();
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        className="flex justify-center items-center bg-black bg-opacity-50"
      >
        <Box className="flex-col absolute gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md p-5 bg-white items-center flex">
          <h1 className="text-4xl pb-2">Seja bem vindo ao Placar Taekwondo!</h1>
          <span className="text-xl">Selecione abaixo o tempo do round!</span>
          <select
            name="time"
            id="timeRound"
            value={selectTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="1">30 segundos</option>
            <option value="2">1 minuto</option>
            <option value="3">1 minuto e 30 segundos</option>
          </select>
          <Button variant="contained" color="success" className="h-1/2 w-1/2"
            onClick={handleTimer}
          >Iniciar</Button>
        </Box>
      </Modal>
      <div className="w-full h-screen relative">
        <h1
          className={`text-center border text-lg ${gamepadConnected ? "bg-green-600 text-white" : "bg-white text-black"
            }`}
        >
          {gamepadConnected ? "Gamepad conectado" : "Conecte um gamepad."}
        </h1>
        {vencedor && (
          <Win
            vencedor={vencedor}
            open={openModalWin}
            close={handleClose}
          />
        )}

        <div className="flex h-full w-full">
          <div className="bg-red-600 w-1/2 h-full justify-center items-center flex flex-col">
            <span className="text-9xl">{vermelho}</span>
          </div>
          <div className="bg-blue-600 w-1/2 h-full justify-center items-center flex flex-col">
            <span className="text-9xl">{azul}</span>
          </div>
        </div>
        <Countdown seconds={timer} />
      </div>
    </>
  );
}

export default App;