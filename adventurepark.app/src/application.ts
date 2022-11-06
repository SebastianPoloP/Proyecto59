import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { EstrategiaAdministrador } from './estrategias/admin.strategy';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { EstrategiaVisitante } from './estrategias/visitante.strategy';
import { EstrategiaSercretario } from './estrategias/sercretario.strategy';

export {ApplicationConfig};

export class App extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

  // Registro de las estrategias generadas
    registerAuthenticationStrategy(this, EstrategiaAdministrador);
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, EstrategiaVisitante);
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, EstrategiaSercretario);
    this.component(AuthenticationComponent);
  }
}
