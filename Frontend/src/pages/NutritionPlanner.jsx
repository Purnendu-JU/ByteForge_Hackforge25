import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  TextField,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: open ? 0 : -drawerWidth,
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
}));

const NutritionPlanner = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // 🧠 Chatbot API call
  const getChatbotResponse = async (userMessage) => {
    try {
      const response = await fetch("https://chatbott-theta.vercel.app/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      console.log("Chatbot Reply:", data.reply);
      return data.reply;
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return "Sorry, there was an error contacting the chatbot.";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
      setInput("");

      const botReply = await getChatbotResponse(userMessage);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
    }
  };
  

  return (
    <>
      <Box sx={{ position: "fixed", top: 70, right: 20 }}>
        <ViewSidebarRoundedIcon color='secondary' onClick={handleDrawerToggle} fontSize='large' />
      </Box>

      <Box sx={{ overflow: "hidden" }}>
        <Container maxWidth="md" style={{ height: "calc(100vh - 112px)", display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "auto" }}>
          <Box style={{ flexGrow: 1, padding: "10px", overflowY: "visible", marginBottom: "10px" }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  width: "100%",
                  marginBottom: "12px" // ← Added spacing between bubbles
                }}
              >
                <Box
                  sx={{
                    maxWidth: "60%",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                    color: msg.sender === "user" ? "white" : "black",
                    fontSize: "16px",
                    lineHeight: "1.4",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
          </Box>

          <Main sx={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  backgroundColor: '#f7f7f8',
                  borderLeft: '1px solid #e0e0e0',
                },
              }}
              variant="persistent"
              anchor="right"
              open={open}
              PaperProps={{
                sx: {
                  height: 'calc(100vh - 65px)',
                  top: 'auto',
                  bottom: 0,
                },
              }}
            >
              <DrawerHeader>
                <Typography variant="h6" sx={{ fontWeight: "bolder" }}>History</Typography>
                <Box>
                  <ViewSidebarRoundedIcon color='secondary' onClick={handleDrawerToggle} fontSize='medium' />
                </Box>
              </DrawerHeader>
              <Divider />
              <List>
                {["Conversation 1", "Conversation 2", "Conversation 3", "Conversation 4"].map((text, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Main>
        </Container>

        <Box sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: isSmallScreen ? "70%" : "60%",
          display: "flex",
          alignItems: "center",
          border: "1px solid black",
          borderRadius: "20px",
          backgroundColor: "white",
          padding: "8px"
        }}>
          <TextField
            id="standard-multiline-static"
            multiline
            maxRows={4}
            autoFocus
            placeholder="Enter message..."
            sx={{ width: "100%", outline: "none" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default NutritionPlanner;
