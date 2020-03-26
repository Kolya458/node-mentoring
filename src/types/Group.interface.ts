// eslint-disable-next-line no-unused-vars
import { Permission } from './Permission.type';

export interface IGroup {
    id: string;
    name: string;
    permissions: Permission[];
}
