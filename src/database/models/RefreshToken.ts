import Sequelize, { Model } from 'sequelize';

export class RefreshToken extends Model {
    public id!: string;
    public UserId!: string
}

export default (sequelize: Sequelize.Sequelize) => {
    const refreshToken = RefreshToken.init(
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            UserId: Sequelize.UUID
        },
        { sequelize, modelName: 'RefreshToken', timestamps: false }
    );
    return refreshToken;
};
