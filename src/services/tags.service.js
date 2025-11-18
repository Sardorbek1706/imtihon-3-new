import { Tag } from '../models/tag.model';
import { TagRepository } from '../repositories/tag.repository';

class TagService {
    private tagRepository: TagRepository;

    constructor() {
        this.tagRepository = new TagRepository();
    }

    async createTag(name: string): Promise<Tag> {
        const newTag = new Tag();
        newTag.name = name;
        return await this.tagRepository.create(newTag);
    }

    async getAllTags(): Promise<Tag[]> {
        return await this.tagRepository.findAll();
    }

    async getTagById(id: string): Promise<Tag | null> {
        return await this.tagRepository.findById(id);
    }

    async updateTag(id: string, name: string): Promise<Tag | null> {
        const tagToUpdate = await this.tagRepository.findById(id);
        if (tagToUpdate) {
            tagToUpdate.name = name;
            return await this.tagRepository.update(tagToUpdate);
        }
        return null;
    }

    async deleteTag(id: string): Promise<void> {
        await this.tagRepository.delete(id);
    }
}

export default new TagService();