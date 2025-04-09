// app/core/services/app-config.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  appName = 'MiSuperApp';  // Valor global (puedes setearlo en runtime si necesitas)
}
