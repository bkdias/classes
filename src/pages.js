const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')


function PageLanding(req, res) {
    return res.render("index.html")
}

async function PageStudy(req, res) {
    const filters = req.query
    
    if (!filters.subject || !filters.weekday || !filters.time) {
        
        return res.render("study.html", { filters, subjects, weekdays })
    }
   
    //Converter horas em minutos
    const timetominute = convertHoursToMinutes(filters.time)
   
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timetominute}
            AND class_schedule.time_to > ${timetominute}
        )
        AND classes.subject = '${filters.subject}'
    `
    
    // Caso haja erro na consulta do banco de dados.

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })
        
    } catch (error) {
        console.log(error)
    }

}

function PageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/create_Proffy')
    const data = req.body

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
//função MAP para pegar os dados do ARRAY
    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
//Depois do cadastro ser inserido no banco, redireciona para a página de estudos com o filtro do professor
    let queryString = "?subject=" + req.body.subject
    queryString += "&weekday=" + req.body.weekday[0]
    queryString += "&time=" + req.body.time_from[0]
   return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    PageLanding,
    PageStudy,
    PageGiveClasses,
    saveClasses
}