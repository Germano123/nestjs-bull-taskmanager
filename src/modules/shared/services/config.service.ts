import * as dotenv from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {
    const nodeEnv = this.nodeEnv;

    console.log('Using ' + nodeEnv + ' environment');

    dotenv.config({
      path: `.${nodeEnv}.env`,
    });
  }

  get nodeEnv(): string {
    return (
      this.getString('ENVIRONMENT') || this.getString('NODE_ENV') || 'local'
    );
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string, defaultValue?: number): number {
    const value = this.configService.get(key, defaultValue);
    if (value === undefined) {
      throw new Error(key + ' env var not set'); // probably we should call process.exit() too to avoid locking the service
    }
    try {
      return Number(value);
    } catch {
      throw new Error(key + ' env var is not a number');
    }
  }

  private getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.configService.get(key, defaultValue?.toString());
    if (value === undefined) {
      throw new Error(key + ' env var not set');
    }
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
  }

  get natsEnabled(): boolean {
    return this.getBoolean('NATS_ENABLED');
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get bullConfig() {
    return {
      redis: this.getString('REDIS_URL'),
      port: this.getString('REDIS_PORT'),
    };
  }
}
