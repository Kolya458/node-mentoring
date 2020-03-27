// eslint-disable-next-line no-unused-vars
import Sequelize, { Model } from 'sequelize';
import ServiceLogger from '../../logger/service.decorator';

type ModelStatic = typeof Model & { new(values?: object, options?: Sequelize.BuildOptions): Model }

@ServiceLogger
export default abstract class EntitiesService {
  private model: ModelStatic;

  protected constructor(model: ModelStatic) {
      this.model = model;
  }

  async findAll(options?: Sequelize.FindOptions) {
      const foundEntities = await this.model.findAll({ ...options });
      return foundEntities.map((entity: Sequelize.Model) =>
          entity.get({ plain: true })
      );
  }

  async create(entity: Object, options?: Sequelize.CreateOptions) {
      const createdEntity = await this.model.create(entity, { ...options });
      return createdEntity.get({ plain: true });
  }

  async findById(id: string, options?: Sequelize.FindOptions) {
      const foundEntity = await this.model.findByPk(id, { ...options });
      return foundEntity || {};
  }

  async update(entity: { id: string }, options?: Sequelize.UpdateOptions) {
      const [, updatedEntity] = await this.model.update(entity, {
          where: { id: entity.id },
          returning: true,
          ...options
      });
      if (!updatedEntity.length) {
          throw new Error(`400:::There are no ${this.model.name.toLowerCase()} with this id`);
      }
      return updatedEntity[0].get({ plain: true });
  }

  async delete(id: string, options?: Sequelize.DestroyOptions) {
      return this.model.destroy({ where: { id }, ...options })
          .then(isDeleted => {
              if (!isDeleted) {
                  throw new Error(`400:::There are no such ${this.model.name.toLowerCase()} already`);
              }
              return { status: 'success' };
          });
  }
}
