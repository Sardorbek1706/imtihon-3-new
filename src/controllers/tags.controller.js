import { Request, Response } from 'express';
import { TagService } from '../services/tags.service';

const tagService = new TagService();

export const createTag = async (req: Request, res: Response) => {
    try {
        const tagData = req.body;
        const tag = await tagService.createTag(tagData);
        res.status(201).json({ tagId: tag.id, message: 'Tag created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await tagService.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTagById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tag = await tagService.getTagById(id);
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tagData = req.body;
        const updatedTag = await tagService.updateTag(id, tagData);
        res.status(200).json({ tagId: updatedTag.id, message: 'Tag updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await tagService.deleteTag(id);
        res.status(200).json({ message: 'Tag deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};