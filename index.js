const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Login API',
        version: '1.0.0',
        description: 'API for user authentication',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
