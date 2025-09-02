import { createApp } from './app';
import { config } from './config';

const app = createApp();

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
  console.log(`API available at http://localhost:${config.server.port}/api/exchange-rate`);
});
