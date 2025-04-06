import React from "react";
import { Box, Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle, Bolt, Security,Psychology } from "@mui/icons-material";

const features = [
  { title: "Personalized Nutrition Planner", icon: <Lightbulb fontSize="large" />, description: "Get customized meal plans based on your health needs and goals." },
  { title: "Yoga Posture Detector", icon: <CheckCircle fontSize="large" />, description: "AI-powered posture analysis to help you perfect your yoga poses." },
  { title: "Locate Nearest Psychologists", icon: <Bolt fontSize="large" />, description: "Quickly find and navigate to the nearest mental health specialists." },
  { title: "Community Platform for Health Related Updates", icon: <Security fontSize="large" />, description: "Stay informed with the latest health trends and expert advice." }
  ,{ title: "AI Based Mental Health Assistant", icon: <Psychology fontSize="large" />, description: "Get AI-driven mental health support and personalized guidance."}
];

const Home = () => {
  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          fontWeight: "bold", 
          background: "linear-gradient(90deg, #a8a8a8, #ffffff)", 
          WebkitBackgroundClip: "text", 
          WebkitTextFillColor: "transparent", 
          mt: 4 
        }}
      >
        AI Based Medical Health Website
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{ textAlign: "center", p: 2, boxShadow: 3, borderRadius: 2 }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1, color: "#1976d2" }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>   
  );
};

export default Home;