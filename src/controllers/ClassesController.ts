import { Request, Response } from 'express';

import db from '../database/connection';
import converHoursToMinutes from '../utils/convertHoursToMinutes';

// This class holds the potential operations on our teacher list

// You can list the teachers that match your search query
// search params: ?week_day=[e.g. 0-6 (sunday is 0, saturday is 6)]\
// &subject=[e.g. English]&time=[e.g. 18:00]
// All params must be provided

// The user database has 3 different layers.
// user information (name, bio, profile photo link and phone number)
// class informaton (subject and cost)
// schedule (weekday, from [e.g. 14:00] and to [e.g. 18:00])
// The schedule times are converted to minutes when created

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters for class search.'
            });
        }
        const timeInMinutes = converHoursToMinutes(time);

        // Access request parameters and compare them with database instances
        // then perform an inner join using the data

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']); 

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertUserIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertUserIds[0];
        
            const insertedClassIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
            const class_id = insertedClassIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: converHoursToMinutes(scheduleItem.from),
                    to: converHoursToMinutes(scheduleItem.to),
        
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
    
            return response.status(201).send();
    
        } catch (err) {
            await trx.rollback();
            console.log('error ', err);
    
            return response.status(400).json({
                error: 'Unexpected error while creating the class.'
            });
        }
    }
} 