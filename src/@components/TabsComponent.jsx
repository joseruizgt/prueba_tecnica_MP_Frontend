/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Badge, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { changePosition } from '../store/slice';
import { useDispatch, useSelector } from 'react-redux';

export const TabsComponent = ({ titlesTabs, componentsTabs }) => {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#1e3a8a',
                main: '#1e3a8a',
                dark: '#1e3a8a',
            },
        },
    });

    //SELECTORES
    const { position } = useSelector((state) => state.tab);

    const dispatch = useDispatch();

    const handleChange = (newValue) => {
        dispatch(changePosition(newValue));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={position}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList aria-label="lab API tabs example">
                            {
                                titlesTabs.map((item, index) => (
                                    <div key={index} className='flex'>
                                        <div>
                                            <Tab sx={{ fontWeight: 600, fontSize: 11 }} label={item.title} onClick={() => handleChange(index)} />
                                        </div>
                                        <div className='mt-2 mr-5'>
                                            <Badge badgeContent={item.badge} color="primary" />
                                        </div>
                                    </div>
                                ))
                            }
                        </TabList>
                    </Box>
                    {
                        componentsTabs.map((item, index) => (
                            <TabPanel sx={{ width: '100%', paddingX: 0 }} key={index} value={index}>
                                {item.component}
                            </TabPanel>
                        ))
                    }
                </TabContext>
            </Box>
        </ThemeProvider>
    );
}