/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



export const ModalComponent = ({ open, setOpen, children, widthModal = 700, manualClosing = false }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: widthModal,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
    };

    // const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={manualClosing
                    //  ? null : handleClose
                    }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}