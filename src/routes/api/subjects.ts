import express, { Router, Request } from 'express'
import { Subjects } from '../../models/Subject'
import { Teachers } from '../../models/Teacher'

export const subjects: Router = Router();

subjects.get('/', (req, res) => {
    return Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
            res.status(200).send(allSubjects);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving subjects ' + err
            })
        })
});

subjects.get('/:id', (req, res) => {
    return Subjects.find({
        attributes: ['id', 'subjectName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
            res.status(200).send(subject);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving subject ' + err
            })
        })
});

subjects.get('/:id/teachers', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'teacherName'],
        where: { sid: [req.params.id] }
    })
        .then((teachers) => {
            res.status(200).send(teachers);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving teachers ' + err
            })
        })
});
