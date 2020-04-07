import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import config from '../../config';
import ServiceLogger from '../../logger/service.decorator';
import { Users } from '../../database/models/User';
import { RefreshToken } from '../../database/models/RefreshToken';


@ServiceLogger
class AuthService {
    async signIn(login: string, password: string) {
        const user = await Users.findOne({
            where: { login }
        });
        if (!user) throw new Error('401:::unauthorised');
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('400:::Authorization error');
        }
        return this.generateTokens(user.id);
    }

    async signOut(userId: string) {
        await RefreshToken.destroy({ where: { UserId: userId } });
    }

    async refresh(refreshToken: string) {
        const userToken = await RefreshToken.findOne({
            where: { id: refreshToken },
            plain: true
        });
        if (!userToken) {
            throw new Error('401:::Invalid refresh token');
        }
        await RefreshToken.destroy({ where: { id: refreshToken } });
        return this.generateTokens(userToken.UserId);
    }


    async generateTokens(userId: string) {
        const token = sign({ sub: userId }, config.jwtSecret, { expiresIn: config.jwtLifetime });
        const refreshToken = v4();
        await RefreshToken.create({
            id: refreshToken,
            UserId: userId
        });

        return {
            token,
            refreshToken
        };
    }
}

const authService = new AuthService();
export default authService;
