import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const Loader = () => {
    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50'}>
            <Box sx={{ width: '50%' }}>
                <LinearProgress />
            </Box>
        </div>
    )
}
