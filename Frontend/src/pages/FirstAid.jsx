import * as React from 'react';
import { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, CardActionArea, CardActions, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import firstAidData from './FirstAidData.json'; 
const conditionImages = {
  "Heart Attack": require('../assets/heart-attack.png'),
  "Stroke": require('../assets/Stroke.png'),
  "Bleeding(Severe)": require('../assets/Bleeding.png'),
  "Burns (Thermal)": require('../assets/burn.png'),
  "Choking": require('../assets/choking.png'),
  "Drowning": require('../assets/drown.png'),
  "Fractures": require('../assets/Fracture.png'),
  "Heatstroke": require('../assets/HeatStroke.png'),
  "Poisoning": require('../assets/poison.png'),
  "Seizures": require('../assets/Seizures.png'),
};

export default function MultiActionAreaCard() {
  const [open, setOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const handleOpen = (condition) => {
    setSelectedCondition(condition);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCondition(null);
  };
  return (
    <>
      <Typography variant="h3" gutterBottom sx={{ marginLeft: 13.5, marginBottom: 7, marginTop: 3 }}>
        Get Emergency First Aid Help in a Moment!!!
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {firstAidData.first_aid_guide.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={conditionImages[item.condition]}
                  alt={item.condition}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    {item.condition}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" fullWidth onClick={() => handleOpen(item)}>
                  Get the Info...
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedCondition?.condition}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            {selectedCondition?.first_aid}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
