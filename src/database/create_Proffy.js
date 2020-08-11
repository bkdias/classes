module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    //Inserr dados da tabela teachers - Receberá o retorno do BD contendo os dados
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
//Pega o último ID cadastrado
    const proffy_id = insertedProffy.lastID

// Inserir dados da Tabela Classes
    const insertedClass = await db.run(`
            INSERT INTO classes(
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    
    `)

    const class_id = insertedClass.lastID

// Organiza o array  Pode ser vários schedules, por isso usa o promise para executar todos
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    }) 

//Aguarda Executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}