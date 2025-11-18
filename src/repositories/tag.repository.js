import { knex } from '../db/knex';
import { Tag } from '../models/tag.model';

export class TagRepository {
    async create(tag: Tag): Promise<Tag> {
        const [newTag] = await knex('tags').insert(tag).returning('*');
        return newTag;
    }

    async findAll(): Promise<Tag[]> {
        return await knex('tags').select('*');
    }

    async findById(id: string): Promise<Tag | null> {
        const tag = await knex('tags').where({ id }).first();
        return tag || null;
    }

    async update(id: string, tag: Partial<Tag>): Promise<Tag | null> {
        const [updatedTag] = await knex('tags').where({ id }).update(tag).returning('*');
        return updatedTag || null;
    }

    async delete(id: string): Promise<void> {
        await knex('tags').where({ id }).del();
    }
}