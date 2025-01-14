import { Controller } from '@nestjs/common';
import { WebzService } from '../services/webz.service';

@Controller('webz')
export class WebzController {
  constructor(private readonly webzService: WebzService) {}
}
