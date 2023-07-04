import { IController } from '@/interface/controller.interface';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const swaggerDocument = YAML.load(`${__dirname.split(path.sep).pop()}/swagger/swagger.yaml`);

const debugLog: debug.IDebugger = debug('app');

export default class App {
  public express: Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router);
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => console.log(`Server is running on port : ${this.port}`));
  }
}
