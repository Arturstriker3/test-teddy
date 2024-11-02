import { User } from '../entities/User';
import { Url } from '../entities/Url';

declare global {
    namespace Express {
        interface Request {
            user?: Partial < User >;
            url?: Partial < Url >;
        }
    }
}
