import express, { Router, Request } from 'express'
import { Batches } from '../../models/Batch'
import { Courses } from '../../models/Course'

export const batches: Router = Router();

batches.get('/', (req, res) => {
    return Batches.findAll({
        attributes: ['id', 'batchName', 'cid'],
        include: [{
            model: Courses
        }]
    })
        .then((batches) => {
            res.status(200).json(batches);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving batches ' + err
            })
        })
});

batches.delete('/:id', (req, res) => {
    return Batches.destroy({
        where: { id: [req.params.id] }
    })
    .catch((err) => {
        res.status(500).send({
            error: 'Error deleting batch ' + err
        })
    })
})