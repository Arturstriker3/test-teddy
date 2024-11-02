declare module 'express-prometheus-middleware' {
    import { RequestHandler } from 'express';
  
    interface PrometheusMiddlewareOptions {
      metricsPath?: string;
      collectDefaultMetrics?: boolean;
      requestDurationBuckets?: number[];
      requestLengthBuckets?: number[];
      responseLengthBuckets?: number[];
      customLabels?: Record<string, string>;
      excludeRoutes?: string[];
      normalizePath?: (path: string) => string;
      transformLabels?: (labels: Record<string, string>, req: Request, res: Response) => Record<string, string>;
      metricsAppName?: string;
    }
  
    function prometheusMiddleware(options?: PrometheusMiddlewareOptions): RequestHandler;
  
    export = prometheusMiddleware;
  }
  