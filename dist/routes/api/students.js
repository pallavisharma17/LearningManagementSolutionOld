"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Student_1 = require("../../models/Student");
const Batch_1 = require("../../models/Batch");
exports.students = express_1.Router();
exports.students.get('/', (req, res) => {
    return Student_1.Students.findAll({
        attributes: ['id', 'studentRoll', 'studentName']
    })
        .then((allStudents) => {
        res.status(200).send(allStudents);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving students ' + err
        });
    });
});
exports.students.get('/:id', (req, res) => {
    return Student_1.Students.find({
        attributes: ['id', 'studentRoll', 'studentName'],
        where: { id: [req.params.id] }
    })
        .then((student) => {
        res.status(200).send(student);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving student ' + err
        });
    });
});
exports.students.get('/:id/batches', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['batchName'],
        include: [{
                model: Student_1.Students,
                attributes: ['studentName'],
                where: { id: [req.params.id] }
            }],
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving batches ' + err
        });
    });
});
