import {v4 as uuid} from 'uuid';

// Blocks are passed into this function. This function makes sure that the blocks being passed into the block renderer each follow the correct format

export const cleanAndTransformBlocks = (blocksJSON) => {
    const blocks = JSON.parse(JSON.stringify(blocksJSON));
    const assignIds = (b) => {
        b.forEach(block => {
            block.id = uuid();
            if(block.innerBlocks?.length) { 
                assignIds(block.innerBlocks)
            }
        })
    }

    assignIds(blocks);

    return blocks;
}