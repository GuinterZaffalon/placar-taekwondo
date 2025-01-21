import { Box, Button, Modal } from "@mui/material";

interface WinProps {
    vencedor: string
    open: boolean
    close: () => void
}

export default function Win({ vencedor, open, close }: WinProps) {
    return (
        <Modal 
        open={open} 
        onClose={close}
        className="flex justify-center items-center bg-black bg-opacity-50">
            <Box className={`flex-col absolute gap-4 top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2 shadow-md rounded-md p-5 ${vencedor === "Vermelho" ? "bg-red-500 text-white" : "bg-blue-500 text-white"} items-center flex`}>
                <h2 className="text-4xl pb-2">{vencedor} venceu!</h2>
                <Button variant="contained" color="success" className="h-1/2 w-1/2 "
            onClick={close}
          >Próximo round!</Button>
            </Box>
        </Modal>
    );
}