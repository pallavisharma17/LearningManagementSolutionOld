import express, { Router, Request } from 'express'
import { Courses } from '../../models/Course'
import { Batches } from '../../models/Batch'
import { Lectures } from '../../models/Lecture'
import { Teachers } from '../../models/Teacher'
import { Students } from '../../models/Student'

export const courses: Router = Router();

courses.get('/', (req, res) => {
    return Courses.findAll({
        attributes: ['id', 'courseName']
    })
        .then((allCourses) => {
            res.status(200).send(allCourses);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving Courses ' + err
            })
        })
});

courses.get('/:id', (req, res) => {
    return Courses.find({
        attributes: ['id', 'courseName'],
        where: { id: [req.params.id] }
    })
        .then((course) => {
            res.status(200).send(course);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving Course ' + err
            })
        })
});

courses.get('/:id/batches', (req, res) => {
    return Batches.findAll({
        attributes: ['id', 'batchName'],
        include: [{
            model: Courses,
            attributes: ['courseName'],
            required: true
        }],
        where: { cid: [req.params.id] }
    })
        .then((batches) => {
            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving batches ' + err
            })
        })
});

courses.get('/:id/batches/:bid', (req, res) => {
    return Batches.find({
        attributes: ['id', 'batchName'],
        include: [{
            model: Courses,
            attributes: ['courseName'],
            required: true
        }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
    })
        .then((batches) => {

            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving batches ' + err
            })
        })
});

courses.get('/:id/batches/:bid/lectures', (req, res) => {
    return Lectures.findAll({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
                attributes: ['courseName'],
                required: true
            }],

            where: {
                cid: [req.params.id],
                id: [req.params.bid]
            }
        }]
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving lectures ' + err
            })
        })
});

courses.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    return Lectures.findOne({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
                attributes: ['courseName'],
                required: true
            }],

            where: {
                cid: [req.params.id],
                id: [req.params.bid]
            }
        }],
        where: {
            id: [req.params.lid]
        }
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving lectures ' + err
            })
        })
});

courses.get('/:id/batches/:bid/teachers', (req, res) => {
    return Lectures.findAll({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
                attributes: ['courseName'],
                required: true
            }],

            where: {
                cid: [req.params.id],
                id: [req.params.bid]
            }
        },
        {
            model: Teachers,
            attributes: ['teacherName']
        }],
        group: ['tid']
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving lectures ' + err
            })
        })
});

courses.get('/:id/batches/:bid/students', (req, res) => {
    return Batches.findAll({
        attributes: ['batchName'],
        include: [{
            model: Courses,
            attributes: ['courseName'],
        },
        {
            model: Students,
            attributes: ['studentName']
        }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
    })
        .then((students) => {
            res.status(200).send(students);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving students ' + err
            })
        })
});

//add a course
courses.post('/', (req, res) => {
    return Courses.create({
        courseName: req.body.courseName,
    })
        .then((course) => {
            res.status(200).send(course);
        })
})

//delete a course
courses.delete('/:id', (req, res) => {
    return Courses.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting course ' + err
            })
        })
})

//update a course
courses.put('/:id', (req, res) => {
    return Courses.update(
        { courseName: req.body.courseName },
        { where: { id: [req.params.id] } }
    )

        .catch((err) => {
            res.status(500).send({
                error: 'Error updating course ' + err
            })
        })
})