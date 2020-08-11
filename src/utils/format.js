const subjects = [
        "Artes",
        "Biologia",
        "Ciências",
        "Educação Física",
        "Física",
        "Geografia",
        "História",
        "Matemática",
        "Português",
        "Química"  
]
const weekdays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
]

//Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time) {
    //Converte a hora em array extraindo as strings pelo :
    const [hour, minutes] = time.split(":")
    //Retorna a hora convertida em minutos
    return Number((hour * 60) + minutes)
    
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}